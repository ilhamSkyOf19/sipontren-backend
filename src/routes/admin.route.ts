import express, { Router } from 'express'
import { AdminController } from '../controllers/admin.controller';
import { zodValidation } from '../middlewares/zod-middleware';
import { CreateAdminType } from '../models/admin-model';
import { AdminValidation } from '../validations/admin-validation';


// initialization router
const adminRoute: Router = Router();

// create 
adminRoute.post('/create', zodValidation<CreateAdminType>(AdminValidation.CREATE), AdminController.create);


// export 
export default adminRoute;