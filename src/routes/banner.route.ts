import { Router } from "express";
import { createMulterUploader } from "../services/multer.service";
import { BannerController } from "../controllers/banner.controller";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initialization router
const bannerRoute: Router = Router();

// banner uploader
const upload = createMulterUploader({
  uploadPaths: { banner: "public/uploads/banner" },
});

// read all
bannerRoute.get("/read", BannerController.read);

// auth middleware
bannerRoute.use(tokenMiddleware);

// create
bannerRoute.post("/create", upload.single("banner"), BannerController.create);

// read detail
bannerRoute.get("/detail/:id", BannerController.readDetail);

// update
bannerRoute.patch(
  "/update/:id",
  upload.single("banner"),
  BannerController.update,
);

// delete
bannerRoute.delete("/delete/:id", BannerController.delete);

// export
export default bannerRoute;
