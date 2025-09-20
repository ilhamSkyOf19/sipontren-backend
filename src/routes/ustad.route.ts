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


// read 
ustadRoute.get('/read', UstadController.read);


// read detail
ustadRoute.get('/detail/:id', tokenMiddleware, UstadController.detail);


// update 
ustadRoute.patch('/update/:id', tokenMiddleware, upload.single('ustad_img'), UstadController.update);


// return 
export default ustadRoute;