import { NewEntity } from '../Interfaces';
import { ICrudMatches } from '../Interfaces/ICrudModel';
import { MatchesInterface } from '../Interfaces/matches/Matchesinterface';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements ICrudMatches<MatchesInterface> {
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

  async updateInProgress(id: number): Promise<true | false> {
    const [affectedCount] = await this.model.update({ inProgress: false }, { where: { id } });
    return affectedCount > 0;
  }

  async updateMatchTeams(id: number, data: Partial<MatchesInterface>): Promise<true | false> {
    const [affectedCount] = await this.model.update(data, { where: { id } });
    return affectedCount > 0;
  }

  async create(data: NewEntity<MatchesInterface>): Promise<MatchesInterface | null> {
    const newMatch = await this.model.create(data);
    return newMatch.dataValues;
  }

  async getAllMatchesHomeTeams(id: number): Promise<MatchesInterface[]> {
    const allMatches = await this.model.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const allMatchesData = allMatches.map((match) => match.dataValues);
    return allMatchesData;
  }
}
