import prisma from "../lib/prismaClient";
import { CreateAdminType, ResponseAdminType, toResponseAdminType } from "../models/admin-model";
import bcrypt from 'bcrypt'

export class AdminService {
    // create 
    static async create(req: CreateAdminType): Promise<ResponseAdminType> {

        // hash password
        const passwordHash = bcrypt.hashSync(req.password, 10)


        // get response 
        const response = await prisma.admin.create({
            data: {
                name: req.name,
                email: req.email,
                password: passwordHash
            }
        })

        // return
        return toResponseAdminType(response)
    }

    // auth 
}