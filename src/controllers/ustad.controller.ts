import { NextFunction, Response, Request } from "express";
import { ResponseData, ResponseMessage } from "../types/types";
import {
  CreateUstadType,
  ResponseUstadType,
  UpdateUstadType,
} from "../models/ustad-model";
import { UstadValidation } from "../validations/ustad-validation";
import { UstadService } from "../services/ustad.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";

export class UstadController {
  // create
  static async create(
    req: Request<{}, {}, CreateUstadType>,
    res: Response<ResponseData<ResponseUstadType>>,
    next: NextFunction
  ) {
    try {
      const rawBody = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      }

      const body = validation<Omit<CreateUstadType, "ustad_img">>(
        UstadValidation.CREATE,
        rawBody
      );

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await UstadService.create(
        {
          ...body.data,
          ustad_img: req.file.filename,
        },
        req.file.filename
      );

      return res.status(200).json({
        success: true,
        message: "success created",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read
  static async read(
    _req: Request,
    res: Response<ResponseData<ResponseUstadType[]>>,
    next: NextFunction
  ) {
    try {
      const response = await UstadService.read();

      return res.status(200).json({
        success: true,
        message: "success read ustad",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read detail
  static async detail(
    req: Request<{ _id: string }>,
    res: Response<ResponseData<ResponseUstadType>>,
    next: NextFunction
  ) {
    try {
      const _id = req.params._id;

      const response = await UstadService.detail(_id);

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, UpdateUstadType>,
    res: Response<ResponseData<ResponseUstadType>>,
    next: NextFunction
  ) {
    try {
      const _id = req.params.id;

      const ustad = await UstadService.detail(_id);

      if (!ustad.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json(ustad);
      }

      const body = validation<Omit<UpdateUstadType, "ustad_img" | "_id">>(
        UstadValidation.UPDATE,
        req.body
      );

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await UstadService.update(req.file?.filename ?? "", {
        ...body.data,
        _id: ustad.data._id,
        ustad_img: req.file?.filename ?? ustad.data.ustad_img,
      });

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) {
    try {
      const _id = req.params.id;

      const response = await UstadService.delete(_id);

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
