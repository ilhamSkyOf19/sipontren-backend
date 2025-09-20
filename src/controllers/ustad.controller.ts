import { NextFunction, Response, Request } from "express";
import { TokenRequest, ResponseData } from "../types/types";
import { CreateUstadType, ResponseUstadType, UpdateUstadType } from "../models/ustad-model";
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


    // read 
    static async read(_req: Request, res: Response<ResponseData<ResponseUstadType[]>>, next: NextFunction) {
        try {
            // get service 
            const response = await UstadService.read();

            // return response
            return res.status(200).json({
                success: true,
                message: "success read ustad",
                data: response
            });
        } catch (error) {
            // error handler
            console.log(error);
            next(error);
        }
    }


    // read detail 
    static async detail(req: TokenRequest<{ id: string }>, res: Response<ResponseData<CreateUstadType>>, next: NextFunction) {
        try {
            // get params id 
            const id = req.params.id;

            // get service 
            const response = await UstadService.detail(Number(id));

            // cek response 
            if (!response.success) {
                return res.status(400).json(response);
            }



            // return response 
            return res.status(200).json(response)

        } catch (error) {
            // cek error
            console.log(error);
            next(error);
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, UpdateUstadType>, res: Response<ResponseData<ResponseUstadType>>, next: NextFunction) {


        try {
            // get id params
            const id = req.params.id;


            // get body 
            const body = validation<UpdateUstadType>(UstadValidation.UPDATE, req.body);


            // cek validation 
            if (!body.success) {
                // cek file 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }

                // return
                return res.status(400).json({
                    success: false,
                    message: body.message
                });
            }


            // get service 
            const response = await UstadService.update(Number(id), req.file?.filename ?? '', body.data);

            // cek response 
            if (!response.success) {
                return res.status(400).json(response);
            }

            // return response 
            return res.status(200).json(response)



        } catch (error) {
            // cek error 
            console.log(error);
            next(error);
        }
    }
}
