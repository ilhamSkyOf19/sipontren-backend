import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';
import { createMulterUploader } from '../services/multer.service';
import { NewsService } from '../services/news.service';

// initalization express 
const newsRouter: Router = Router();


// multer 
const upload = createMulterUploader({
    uploadPaths: { news: 'public/uploads/news' }
})


// create 
newsRouter.post('/create', upload.single('news'), NewsController.create);


// read 
newsRouter.get('/read', NewsController.read);

// detail
newsRouter.get('/detail/:id', NewsController.detail);



// update 
newsRouter.patch('/update/:id', upload.single('news'), NewsController.update);


// delete 
newsRouter.delete('/delete/:id', NewsController.delete);


// export 
export default newsRouter