import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { FasilitasController } from "../controllers/fasilitas.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

const fasilitasRoute: Router = Router();

// file upload
const upload = createMulterUploader({
  uploadPaths: { images: "public/uploads/fasilitas" },
});

// read
fasilitasRoute.get("/read", FasilitasController.read);

// auth middleware
fasilitasRoute.use(tokenMiddleware);

// create
fasilitasRoute.post(
  "/create",
  upload.single("images"),
  FasilitasController.create,
);

// detail
fasilitasRoute.get("/detail/:id", FasilitasController.detail);

// update
fasilitasRoute.patch(
  "/update/:id",
  upload.single("images"),
  FasilitasController.update,
);

// delete
fasilitasRoute.delete("/delete/:id", FasilitasController.delete);

export default fasilitasRoute;
