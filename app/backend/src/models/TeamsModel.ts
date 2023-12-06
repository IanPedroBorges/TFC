import { TeamsInterface } from '../Interfaces/teams/TeamsInterface';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ICrudModelReader } from '../Interfaces/ICrudModel';

export default class TeamsModel implements ICrudModelReader<TeamsInterface> {
  private model = SequelizeTeams;

  async findAll(): Promise<TeamsInterface[]> {
    const allTeams = await this.model.findAll();
    const tratedReturnAllTeams = allTeams.map((team) => ({
      id: team.dataValues.id,
      teamName: team.dataValues.teamName,
    }));
    return tratedReturnAllTeams;
  }

  async findById(id: number): Promise<TeamsInterface | undefined> {
    const team = await this.model.findByPk(id);
    return team?.dataValues;
  }
}
