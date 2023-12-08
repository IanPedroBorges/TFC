import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';
import httpStatus from '../utils/httpStatus';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardServices()) {
  }

  async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboardHome();
    return res.status(httpStatus(status)).json(data);
  }
}
