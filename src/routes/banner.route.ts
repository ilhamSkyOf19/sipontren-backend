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

// create
bannerRoute.post(
  "/create",
  tokenMiddleware,
  upload.single("banner"),
  BannerController.create
);

// read all
bannerRoute.get("/read", BannerController.read);

// read detail
bannerRoute.get("/detail/:id", tokenMiddleware, BannerController.readDetail);

// update
bannerRoute.patch(
  "/update/:id",
  tokenMiddleware,
  upload.single("banner"),
  BannerController.update
);

// delete
bannerRoute.delete("/delete/:id", tokenMiddleware, BannerController.delete);

// export
export default bannerRoute;
