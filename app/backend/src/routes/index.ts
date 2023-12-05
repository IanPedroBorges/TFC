import { Router } from 'express';

import TeamsRoute from './TeamsRoute';
import UserRoute from './UsersRoute';

const router = Router();

router.use('/teams', TeamsRoute);
router.use('/login', UserRoute);

export default router;
