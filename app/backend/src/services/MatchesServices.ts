import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import { MatchesInterface, MatchesUpdateBody } from '../Interfaces/matches/Matchesinterface';
import TeamsModel from '../models/TeamsModel';

export default class MatchesServices {
  constructor(private model = new MatchesModel(), private modelTeam = new TeamsModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<MatchesInterface[]>> {
    const matches = await this.model.findAll();
    return { status: 'ok', data: matches };
  }

  static verificationValueInProgres(value: string): boolean {
    return value === 'true';
  }

  public async updatedInprogress(id: number): Promise<ServiceResponse<{ message: string }>> {
    const updated = await this.model.updateInProgress(id);
    if (updated) {
      return { status: 'ok', data: { message: 'Finished' } };
    }
    return { status: 'internalServerError', data: { message: 'Nao foi possivel modificar' } };
  }

  public async updatedMatches(id: number, teams: MatchesUpdateBody)
    : Promise<ServiceResponse<{ message: string }>> {
    const updated = await this.model.updateMatchTeams(id, teams);
    if (updated) {
      return { status: 'ok', data: { message: 'Updated' } };
    }
    return { status: 'internalServerError', data: { message: 'Nao foi possivel modificar' } };
  }

  public async createMatch(data: MatchesInterface)
    : Promise<ServiceResponse<MatchesInterface | null>> {
    const newMatch = await this.model.create(data);
    return { status: 'created', data: newMatch };
  }
}
