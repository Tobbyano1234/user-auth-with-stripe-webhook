import { Request, Response, Router } from "express";
import { config } from '../../config';

import authRoute from "../../../vzy-auth/api/routes/index";

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
    res.send({ check: 'VZY server is live!. 📦 🧧 💪🏾' }),
);

// api docs route
router.route('/docs').get((_req: Request, res: Response) => res.redirect(config.apiDocs));

// mount routes
router.use("/auth", authRoute)


export default router;
