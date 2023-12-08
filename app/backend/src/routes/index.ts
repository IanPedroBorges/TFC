import { Router } from 'express';

import TeamsRoute from './TeamsRoute';
import UserRoute from './UsersRoute';
import MatchesRoute from './MatchesRoute';
import LeaderboardRoute from './LeaderboardRoute';

const router = Router();

router.use('/teams', TeamsRoute);
router.use('/login', UserRoute);
router.use('/matches', MatchesRoute);
router.use('/leaderboard', LeaderboardRoute);

export default router;
