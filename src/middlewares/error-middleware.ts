import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { ResponseMessage } from "../types/types";

export const errorMiddlewate = (err: PrismaClientKnownRequestError, _req: Request, res: Response<ResponseMessage>) => {


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
                break;
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "value already exists"
                })
                break;
            case "P2003":
                return res.status(404).json({
                    success: false,
                    message: "referenced record not found"
                })
                break;
            default:
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
        }
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })

}