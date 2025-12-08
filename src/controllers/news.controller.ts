import { NextFunction, Request, Response } from "express";
import {
  CreateNewsType,
  ResponseNewsType,
  UpdateNewsType,
} from "../models/news-model";
import { ResponseData, ResponseMessage, TokenRequest } from "../types/types";
import { NewsService } from "../services/news.service";
import { NewsValidation } from "../validations/news-validation";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";

export class NewsController {
  // CREATE ===================================================
  static async create(
    req: TokenRequest<{}, {}, CreateNewsType>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction
  ) {
    try {
      const rawBody = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const body = validation<CreateNewsType>(NewsValidation.CREATE, rawBody);

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json({
          success: false,
          message: body.message,
        });
      }

      const response = await NewsService.create(body.data, req.file.filename);

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  // READ ALL =================================================
  static async read(
    _req: Request,
    res: Response<ResponseData<ResponseNewsType[]>>,
    next: NextFunction
  ) {
    try {
      const response = await NewsService.read();

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // READ DETAIL ==============================================
  static async detail(
    req: TokenRequest<{ id: string }>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id; // tetap string untuk Mongoose

      const response = await NewsService.detail(id);

      if (!response.success) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "success read detail news",
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE ====================================================
  static async update(
    req: TokenRequest<{ id: string }>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      // cek apakah news ada
      const existing = await NewsService.detail(id);
      if (!existing) {
        if (req.file) await FileService.deleteFile(req.file.path);

        return res.status(404).json({
          success: false,
          message: "news not found",
        });
      }

      const body = validation<UpdateNewsType>(NewsValidation.UPDATE, req.body);

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);

        return res.status(400).json({
          success: false,
          message: body.message,
        });
      }

      const response = await NewsService.update(
        id,
        body.data,
        req.file?.filename
      );

      if (!response.success) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "success updated",
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE ====================================================
  static async delete(
    req: TokenRequest<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await NewsService.delete(id);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
