import { Router } from 'express';

import TeamsRoute from './TeamsRoute';

const router = Router();

router.use('/teams', TeamsRoute);

export default router;
