import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initialization router
const dashboardRoute: Router = Router();

// auth middleware
dashboardRoute.use(tokenMiddleware);
// create
dashboardRoute.get("/read", DashboardController.getCount);

// export
export default dashboardRoute;
