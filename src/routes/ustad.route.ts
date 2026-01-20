import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { UstadController } from "../controllers/ustad.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initialization
const ustadRoute: Router = Router();

// file upload
const upload = createMulterUploader({
  uploadPaths: { ustad_img: "public/uploads/ustad_img" },
});

// read
ustadRoute.get("/read", UstadController.read);

// auth middleware
ustadRoute.use(tokenMiddleware);

// create
ustadRoute.post("/create", upload.single("ustad_img"), UstadController.create);

// read detail
ustadRoute.get("/detail/:id", UstadController.detail);

// update
ustadRoute.patch(
  "/update/:id",
  upload.single("ustad_img"),
  UstadController.update,
);

// delete
ustadRoute.delete("/delete/:id", UstadController.delete);

// return
export default ustadRoute;
