import { Request, Response } from 'express';
import UsersServices from '../services/UsersServices';
import httpStatus from '../utils/httpStatus';

export default class UsersControll {
  constructor(private service = new UsersServices()) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.service.login(req.body);
    return res.status(httpStatus(status)).json(data);
  }

  public async getRoleUser(req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.service.getRoleUser(req.body.user.id);
    return res.status(httpStatus(status)).json(data);
  }
}
