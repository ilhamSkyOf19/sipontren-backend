import { Router } from "express";
import { zodValidation } from "../middlewares/zod-middleware";
import { UpdateJumlahAlumniType } from "../models/jumlahAlumni";
import { JumlahAlumniController } from "../controllers/jumlahAlumni.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { JumlahAlumniValidation } from "../validations/jumlahAlumni-validation";

// initialization express
const jumlahAlumniRoute: Router = Router();

// auth middleware
jumlahAlumniRoute.use(tokenMiddleware);

// create
jumlahAlumniRoute.patch(
  "/create",
  zodValidation<Omit<UpdateJumlahAlumniType, "id">>(
    JumlahAlumniValidation.UPDATE,
  ),
  JumlahAlumniController.create,
);

// export
export default jumlahAlumniRoute;
