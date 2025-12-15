import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { FasilitasController } from "../controllers/fasilitas.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

const fasilitasRoute: Router = Router();

// file upload
const upload = createMulterUploader({
  uploadPaths: { images: "public/uploads/fasilitas" },
});

// create
fasilitasRoute.post(
  "/create",
  tokenMiddleware,
  upload.single("images"),
  FasilitasController.create
);

// read
fasilitasRoute.get("/read", FasilitasController.read);

// detail
fasilitasRoute.get("/detail/:id", tokenMiddleware, FasilitasController.detail);

// update
fasilitasRoute.patch(
  "/update/:id",
  tokenMiddleware,
  upload.single("images"),
  FasilitasController.update
);

// delete
fasilitasRoute.delete(
  "/delete/:id",
  tokenMiddleware,
  FasilitasController.delete
);

export default fasilitasRoute;
