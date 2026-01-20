import { Router } from "express";
import { NewsController } from "../controllers/news.controller";
import { createMulterUploader } from "../services/multer.service";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initalization express
const newsRouter: Router = Router();

// multer
const upload = createMulterUploader({
  uploadPaths: { news: "public/uploads/news" },
});
// read by filter
newsRouter.get("/readByFilter/:filter", NewsController.readByFilter);

// detail
newsRouter.get("/detail/:id", NewsController.detail);

// auth middleware
newsRouter.use(tokenMiddleware);

// read public
newsRouter.get("/read", NewsController.read);

// create
newsRouter.post("/create", upload.single("news"), NewsController.create);

// update
newsRouter.patch("/update/:id", upload.single("news"), NewsController.update);

// delete
newsRouter.delete("/delete/:id", NewsController.delete);

// export
export default newsRouter;
