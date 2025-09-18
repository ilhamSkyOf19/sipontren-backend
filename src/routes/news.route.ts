import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';
import { zodValidation } from '../middlewares/zod-middleware';
import { NewsValidation } from '../validations/news-validation';
import { CreateNewsType } from '../models/news-model';

// initalization express 
const newsRouter: Router = Router();


// create 
newsRouter.post('/create', zodValidation<CreateNewsType>(NewsValidation.CREATE), NewsController.create);


// export 
export default newsRouter