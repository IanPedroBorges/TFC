import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardControll';

const router = Router();
const leaderboardControll = new LeaderboardController();

router.get(
  '/home',
  (
    req: Request,
    res: Response,
  ) => leaderboardControll.getLeaderboardHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardControll.getLeaderboardAway(req, res),
);

export default router;
