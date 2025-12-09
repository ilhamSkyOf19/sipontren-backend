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
pamfletRoute.post(
  "/create",
  tokenMiddleware,
  upload.single("pamflet"),
  PamfletController.create
);

// read
pamfletRoute.get("/read", PamfletController.read);

// read detail
pamfletRoute.get("/detail/:id", tokenMiddleware, PamfletController.readDetail);

// update
pamfletRoute.patch(
  "/update/:id",
  tokenMiddleware,
  upload.single("pamflet"),
  PamfletController.update
);

// delete
pamfletRoute.delete("/delete/:id", tokenMiddleware, PamfletController.delete);

// export
export default pamfletRoute;
