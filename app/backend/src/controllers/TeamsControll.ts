import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import TeamsServices from '../services/TeamsServices';

export default class TeamsControll {
  constructor(private teamsService = new TeamsServices()) {}

  public async getTeams(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.teamsService.findAll();
    return res.status(httpStatus(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { data, status } = await this.teamsService.findById(Number(id));
    return res.status(httpStatus(status)).json(data);
  }
}
