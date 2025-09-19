import { Request } from "express";
import { ZodType } from "zod";
import { ResponseData, ResponseMessage } from "../types/types";

// cek validasi 
export const validation = <T>(
    schema: ZodType<T>,
    req: T): ResponseData<T> => {
    // cek result 
    const result = schema.safeParse(req);

    // cek error 
    if (!result.success) {
        const errorMessages = result.error.issues.map((err) => err.message)[0];
        return {
            success: false,
            message: errorMessages,
        };
    }


    return {
        success: true,
        message: "success",
        data: result.data,
    };


}
