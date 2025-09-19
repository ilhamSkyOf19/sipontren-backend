import { NextFunction, Request, Response } from "express";
import { ResponseMessage } from "../types/types";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

export const errorMiddlewate = (err: unknown, _req: Request, res: Response<ResponseMessage>, _next: NextFunction) => {


    // cek global err
    console.error(err);


    // cek error prisma 
    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "record not found"
                });
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "value already exists"
                })
            case "P2003":
                return res.status(404).json({
                    success: false,
                    message: "referenced record not found"
                })
            default:
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
        }
    }



    // cek error zod 
    if (err instanceof ZodError) {
        // mapping error 
        const error = err.issues.map((error) => error.message)[0];

        return res.status(400).json({
            success: false,
            message: error
        })
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })

}