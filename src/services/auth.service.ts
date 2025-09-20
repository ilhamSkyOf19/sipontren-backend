import prisma from "../lib/prismaClient";
import { LoginType, payloadType } from "../models/auth-model";
import { ResponseData, ResponseMessage } from "../types/types";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export class AuthService {

    // login 
    static async login(req: LoginType): Promise<ResponseData<string>> {


        // get admin by email 
        const admin = await prisma.admin.findFirst({
            where:
            {
                email: req.email
            }
        });


        //  cek admin 
        if (!admin) {
            return {
                success: false,
                message: "email or password not match"
            }
        }

        // compare password 
        const isMatch = await bcrypt.compare(req.password, admin.password);


        // cek isMatch 
        if (!isMatch) {
            return {
                success: false,
                message: "email or password not match"
            }
        }

        // generate payload
        const payload: payloadType = {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: 'admin'
        }

        // generate jwt 
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '1d' }
        )



        // return success
        return {
            success: true,
            message: "success",
            data: token
        }

    }




}