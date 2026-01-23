import { Router } from "express";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { zodValidation } from "../middlewares/zod-middleware";
import { PendaftaranValidation } from "../validations/pendaftaran-validation";
import { CreatePendaftaranType } from "../models/pendaftaran-model";
import { PendaftaranController } from "../controllers/pendaftaran.controller";

// initialization express
const pendaftaranRoute: Router = Router();

// cek aktif
pendaftaranRoute.get("/cek-aktif", PendaftaranController.getAktif);

// auth middleware
pendaftaranRoute.use(tokenMiddleware);

// read all
pendaftaranRoute.get("/read", PendaftaranController.readAll);

// create
pendaftaranRoute.post(
  "/create",
  zodValidation<CreatePendaftaranType>(PendaftaranValidation.CREATE),
  PendaftaranController.create,
);

// update
pendaftaranRoute.patch(
  "/update-aktif/:id",
  zodValidation<{ aktif: boolean }>(PendaftaranValidation.UPDATE_AKTIF),
  PendaftaranController.updateAktif,
);

// delete
pendaftaranRoute.delete("/delete/:id", PendaftaranController.deleteById);

// export
export default pendaftaranRoute;
