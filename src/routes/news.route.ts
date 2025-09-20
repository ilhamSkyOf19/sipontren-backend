import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';
import { createMulterUploader } from '../services/multer.service';
import { tokenMiddleware } from '../middlewares/token-middleware';

// initalization express 
const newsRouter: Router = Router();


// multer 
const upload = createMulterUploader({
    uploadPaths: { news: 'public/uploads/news' }
})


// create 
newsRouter.post('/create', tokenMiddleware, upload.single('news'), NewsController.create);


// read public
newsRouter.get('/read', NewsController.read);

// detail
newsRouter.get('/detail/:id', tokenMiddleware, NewsController.detail);



// update 
newsRouter.patch('/update/:id', tokenMiddleware, upload.single('news'), NewsController.update);


// delete 
newsRouter.delete('/delete/:id', tokenMiddleware, NewsController.delete);


// export 
export default newsRouter