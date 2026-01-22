import { Router } from "express";
import { StudentController } from "../controllers/student.controller";
import { createMulterUploader } from "../services/multer.service";
import { tokenMiddleware } from "../middlewares/token-middleware";

// initialization express
const studentRouter: Router = Router();

// multer
const upload = createMulterUploader({
  uploadPaths: {
    foto_formal: "public/uploads/student",
    fc_akta_kelahiran: "public/uploads/student",
    foto_kk: "public/uploads/student",
    fc_ktp: "public/uploads/student",
    fc_kis_kip: "public/uploads/student",
  },
});

// upload
const studentUpload = upload.fields([
  { name: "foto_formal", limit: 1 },
  { name: "fc_akta_kelahiran", limit: 1 },
  { name: "foto_kk", limit: 1 },
  { name: "fc_ktp", limit: 1 },
  { name: "fc_kis_kip", limit: 1 },
]);

// auth middleware
studentRouter.use(tokenMiddleware);
// download
studentRouter.post("/download-files", StudentController.downloadFiles);

// download file excel
studentRouter.get("/download-excel", StudentController.exportExcel);

// create
studentRouter.get("/count", studentUpload, StudentController.getCount);

// create
studentRouter.post("/create", studentUpload, StudentController.create);

studentRouter.post("/download", StudentController.downloadMultiple);

// read all (public)
studentRouter.get("/read", StudentController.read);

// detail
studentRouter.get("/detail/:id", StudentController.detail);

// update
studentRouter.patch("/update/:id", studentUpload, StudentController.update);

// delete
studentRouter.delete("/delete/:id", StudentController.delete);

// search
studentRouter.get("/search", StudentController.search);

// export
export default studentRouter;
