import { NextFunction, Request, Response } from "express";
import { ResponseMessage, TokenRequest } from "../types/types";
import jwt from "jsonwebtoken";
import { PayloadType } from "../models/auth-model";
export const tokenMiddleware = (req: TokenRequest, res: Response<ResponseMessage>, next: NextFunction) => {
    try {
        // get token from cookie 
        const token: string = req.cookies?.token;

        console.log(token)


        // cek token 
        if (!token) return res.status(401).json({
            success: false,
            message: "Unauthorized Ini"
        });

        // get payload
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as PayloadType;

        // cek role 
        if (payload.role !== 'admin') return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })


        // set request user 
        req.data = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role
        }


        // next 
        next();

    } catch (error) {
        // error handler
        console.log(error)
        next(error)
    }
}