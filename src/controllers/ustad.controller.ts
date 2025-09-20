import { NextFunction, Response } from "express";
import { TokenRequest, ResponseData } from "../types/types";
import { CreateUstadType } from "../models/ustad-model";
import { UstadValidation } from "../validations/ustad-validation";
import { UstadService } from "../services/ustad.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";

export class UstadController {

    // create
    static async create(
        req: TokenRequest<{}, {}, CreateUstadType>,
        res: Response<ResponseData<CreateUstadType>>,
        next: NextFunction
    ) {
        try {
            // get body
            const rawBody = req.body;


            // cek file 
            if (req.file === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "File is required"
                });
            }

            // cek body & validation
            const body = validation<CreateUstadType>(UstadValidation.CREATE, rawBody);

            // cek validation
            if (!body.success) {
                // cek file and delete 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }
                return res.status(400).json({
                    success: false,
                    message: body.message
                });
            }

            // get service
            const response = await UstadService.create(body.data, req.file?.filename);

            // return response
            return res.status(200).json({
                success: true,
                message: "success created",
                data: response
            });

        } catch (error) {
            // error handler
            console.log(error);
            next(error);
        }
    }
}
