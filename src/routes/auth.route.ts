import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller';
import { zodValidation } from '../middlewares/zod-middleware';
import { AuthValidation } from '../validations/auth-validation';
import { LoginType } from '../models/auth-model';



// initialization express
const authRouter: Router = Router();


// login 
authRouter.post('/login', zodValidation<LoginType>(AuthValidation.LOGIN), AuthController.login);


// export 
export default authRouter;


