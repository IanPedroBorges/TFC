import { Router } from 'express';

import TeamsRoute from './TeamsRoute';
import UserRoute from './UsersRoute';
import MatchesRoute from './MatchesRoute';

const router = Router();

router.use('/teams', TeamsRoute);
router.use('/login', UserRoute);
router.use('/matches', MatchesRoute);

export default router;
