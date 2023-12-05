import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import { TeamsInterface } from '../Interfaces/teams/TeamsInterface';

export default class TeamsServices {
  constructor(private teamsModel = new TeamsModel()) {
  }

  public async findAll(): Promise<ServiceResponse<TeamsInterface[]>> {
    const allTeams = await this.teamsModel.findAll();
    if (!allTeams) return { status: 'internalServerError', data: { message: 'Unknown error' } };
    return { status: 'ok', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<TeamsInterface>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'notFound', data: { message: 'Team not found' } };
    return { status: 'ok', data: team };
  }
}
