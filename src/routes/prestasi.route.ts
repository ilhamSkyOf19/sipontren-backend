import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { PrestasiController } from "../controllers/prestasi.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

const prestasiRoute: Router = Router();

// file upload
const upload = createMulterUploader({
  uploadPaths: { photo: "public/uploads/prestasi" },
});

// read (public)
prestasiRoute.get("/read", PrestasiController.read);

// read count
prestasiRoute.get("/count", PrestasiController.getCount);

// auth middleware
prestasiRoute.use(tokenMiddleware);

// create
prestasiRoute.post(
  "/create",
  upload.single("photo"),
  PrestasiController.create,
);

// detail
prestasiRoute.get("/detail/:id", PrestasiController.detail);

// update
prestasiRoute.patch(
  "/update/:id",
  upload.single("photo"),
  PrestasiController.update,
);

// delete
prestasiRoute.delete("/delete/:id", PrestasiController.delete);

export default prestasiRoute;
