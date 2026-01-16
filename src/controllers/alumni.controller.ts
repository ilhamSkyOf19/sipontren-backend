import { NextFunction, Request, Response } from "express";
import { ResponseData, ResponseMessage } from "../types/types";
import {
  CreateAlumniType,
  FilterData,
  ResponseAlumniType,
  ResponseAlumniWithMetaType,
  UpdateAlumniType,
} from "../models/alumni-model";
import { AlumniService } from "../services/alumni.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";
import { AlumniValidation } from "../validations/alumni-validation";

export class AlumniController {
  // CREATE
  static async create(
    req: Request<{}, {}, CreateAlumniType>,
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const body = validation<Omit<CreateAlumniType, "img_alumni">>(
        AlumniValidation.CREATE,
        req.body
      );

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await AlumniService.create(body.data, req.file.filename);

      return res.status(200).json({
        success: true,
        message: "Success created alumni",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // READ
  static async read(
    req: Request<{}, {}, {}, FilterData>,
    res: Response<ResponseData<ResponseAlumniWithMetaType>>,
    next: NextFunction
  ) {
    try {
      // destructure
      const { page, search } = req.query;

      const response = await AlumniService.read({
        page,
        search,
      });

      return res.status(200).json({
        success: true,
        message: "Success read alumni",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DETAIL
  static async detail(
    req: Request<{ id: string }>,
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await AlumniService.detail(+id);
      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE
  static async update(
    req: Request<{ id: string }, {}, UpdateAlumniType>,
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const alumni = await AlumniService.detail(+id);

      if (!alumni.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json(alumni);
      }

      const body = validation<Omit<UpdateAlumniType, "img_alumni" | "id">>(
        AlumniValidation.UPDATE,
        req.body
      );

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await AlumniService.update(
        +id,
        req.file?.filename ?? "",
        body.data
      );

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DELETE
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await AlumniService.delete(+id);

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
