import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { AlumniController } from "../controllers/alumni.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

const alumniRoute: Router = Router();

// file upload
const upload = createMulterUploader({
    uploadPaths: { img_alumni: "public/uploads/img_alumni" }
});

// create
alumniRoute.post("/create", tokenMiddleware, upload.single("img_alumni"), AlumniController.create);

// read
alumniRoute.get("/read", AlumniController.read);

// detail
alumniRoute.get("/detail/:id", tokenMiddleware, AlumniController.detail);

// update
alumniRoute.patch("/update/:id", tokenMiddleware, upload.single("img_alumni"), AlumniController.update);

// delete
alumniRoute.delete("/delete/:id", tokenMiddleware, AlumniController.delete);

export default alumniRoute;
