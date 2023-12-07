import { MatchesInterface } from '../Interfaces/matches/Matchesinterface';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ICrudModelReader } from '../Interfaces/ICrudModel';

export default class MatchesModel implements ICrudModelReader<MatchesInterface> {
  private model = SequelizeMatches;

  async findAll(): Promise<MatchesInterface[]> {
    const allMatches = await this.model
      .findAll({ include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ] });
    const allMatchesData = allMatches.map((match) => match.dataValues);
    return allMatchesData;
  }
}
