import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import { MatchesInterface } from '../Interfaces/matches/Matchesinterface';

export default class MatchesServices {
  constructor(private model = new MatchesModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<MatchesInterface[]>> {
    const matches = await this.model.findAll();
    return { status: 'ok', data: matches };
  }

  static verificationValueInProgres(value: string): boolean {
    return value === 'true';
  }
}
