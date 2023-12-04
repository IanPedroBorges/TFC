import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import TeamsServices from '../services/TeamsServices';

export default class TeamsControll {
  constructor(private teamsService = new TeamsServices()) {
    console.log(new TeamsServices())

  }
  public async getTeams(_req: Request, res: Response): Promise<Response> {
    console.log('chegou na controll')
    console.log(this.teamsService)
    const ok = await this.teamsService.findAll();
    console.log('data controll', ok)
    return res.status(httpStatus(ok.status)).json(ok.data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { data, status } = await this.teamsService.findById(Number(id));
    return res.status(httpStatus(status)).json(data);
  }
}
