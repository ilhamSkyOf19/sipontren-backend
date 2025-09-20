import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller';
import { zodValidation } from '../middlewares/zod-middleware';
import { AuthValidation } from '../validations/auth-validation';
import { LoginType } from '../models/auth-model';
import { tokenMiddleware } from '../middlewares/token-middleware';



// initialization express
const authRouter: Router = Router();


// login 
authRouter.post('/login', zodValidation<LoginType>(AuthValidation.LOGIN), AuthController.login);


// logout 
authRouter.post('/logout', tokenMiddleware, AuthController.logout);


// export 
export default authRouter;


