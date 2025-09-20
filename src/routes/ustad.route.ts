import express, { Router } from 'express';
import { createMulterUploader } from '../services/multer.service';
import { UstadController } from '../controllers/ustad.controller';
import { tokenMiddleware } from '../middlewares/token-middleware';

// initialization 
const ustadRoute: Router = Router();


// file upload
const upload = createMulterUploader({
    uploadPaths: { ustad_img: 'public/uploads/ustad_img' }
})

// create 
ustadRoute.post('/create', tokenMiddleware, upload.single('ustad_img'), UstadController.create);


// return 
export default ustadRoute;