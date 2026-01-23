import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { AlumniController } from "../controllers/alumni.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

const alumniRoute: Router = Router();

// file upload
const upload = createMulterUploader({
  uploadPaths: { img_alumni: "public/uploads/img_alumni" },
});

// read
alumniRoute.get("/read", AlumniController.read);

// auth middleware
alumniRoute.use(tokenMiddleware);

// create
alumniRoute.post(
  "/create",
  upload.single("img_alumni"),
  AlumniController.create,
);

// detail
alumniRoute.get("/detail/:id", AlumniController.detail);

// update
alumniRoute.patch(
  "/update/:id",
  upload.single("img_alumni"),
  AlumniController.update,
);

// delete
alumniRoute.delete("/delete/:id", AlumniController.delete);

export default alumniRoute;
