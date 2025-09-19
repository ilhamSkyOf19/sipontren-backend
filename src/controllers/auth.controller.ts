import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { LoginType } from "../models/auth-model";
import { AuthService } from "../services/auth.service";

export class AuthController {

    // login 
    static async login(req: Request<{}, {}, LoginType>, res: Response<ResponseData<string>>, next: NextFunction) {
        try {


            // get body 
            const body = req.body;


            // get service 
            const response = await AuthService.login(body);


            // cek response 
            if (!response.success) {
                return res.status(400).json(response)
            }

            // set cookie 
            res.cookie('token', response.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000
            })



            // return response 
            return res.status(200).json({
                success: true,
                message: "success login",
                data: ''
            })

        } catch (error) {
            // error handler
            console.log(error)
            next(error)
        }
    }

}