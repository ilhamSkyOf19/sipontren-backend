import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { PamfletController } from "../controllers/pamflet.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initialization router
const pamfletRoute: Router = Router();

// pamflet 1
const upload = createMulterUploader({
  uploadPaths: { pamflet: "public/uploads/pamflet" },
});

// read
pamfletRoute.get("/read", PamfletController.read);

// auth middleware
pamfletRoute.use(tokenMiddleware);

// read
pamfletRoute.post(
  "/create",
  upload.single("pamflet"),
  PamfletController.create,
);

// read detail
pamfletRoute.get("/detail/:id", PamfletController.readDetail);

// update
pamfletRoute.patch(
  "/update/:id",
  upload.single("pamflet"),
  PamfletController.update,
);

// delete
pamfletRoute.delete("/delete/:id", PamfletController.delete);

// export
export default pamfletRoute;
