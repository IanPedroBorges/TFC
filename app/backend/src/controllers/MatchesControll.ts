import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import httpStatus from '../utils/httpStatus';
import { MatchesInterface } from '../Interfaces/matches/Matchesinterface';

export default class MatchesController {
  constructor(private matchesService = new MatchesServices()) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { inProgress } = _req.query;
    const { data, status } = await this.matchesService.getAllMatches();
    const dataTrated = JSON.stringify(data);
    if (inProgress) {
      const filteredData = JSON.parse(dataTrated).filter((match: MatchesInterface) =>
        match.inProgress === MatchesServices.verificationValueInProgres(String(inProgress)));
      return res.status(httpStatus(status)).json(filteredData);
    }
    return res.status(httpStatus(status)).json(data);
  }
}
