import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';
import httpStatus from '../utils/httpStatus';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardServices()) {
  }

  async getLeaderboardHome(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboard('home');
    return res.status(httpStatus(status)).json(data);
  }

  async getLeaderboardAway(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboard('away');
    return res.status(httpStatus(status)).json(data);
  }

  async getLeaderboardAll(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getAllLeaderboard();
    return res.status(httpStatus(status)).json(data);
  }
}
