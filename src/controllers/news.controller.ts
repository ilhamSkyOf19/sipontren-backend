import { NextFunction, Request, Response } from "express";
import {
  CreateNewsType,
  FilterData,
  LinkBeritaUpdate,
  NewsFilterType,
  ResponseNewsType,
  ResponseNewsWithMetaType,
  UpdateNewsType,
} from "../models/news-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { NewsService } from "../services/news.service";
import { NewsValidation } from "../validations/news-validation";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";
import { LinkBeritaService } from "../services/linkBerita.service";

export class NewsController {
  // CREATE ===================================================
  static async create(
    req: Request<{}, {}, CreateNewsType>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction,
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const rawBody: CreateNewsType = { ...req.body };

      // ⬇️ handle multipart: link_berita bisa string JSON
      if (rawBody.link_berita && typeof rawBody.link_berita === "string") {
        try {
          rawBody.link_berita = JSON.parse(rawBody.link_berita);
        } catch {
          await FileService.deleteFile(req.file.path);
          return res.status(400).json({
            success: false,
            message: "link_berita harus berupa JSON array",
          });
        }
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
      if (req.file) await FileService.deleteFile(req.file.path);
      next(error);
    }
  }

  // READ ALL =================================================
  static async read(
    req: Request<{}, {}, {}, FilterData>,
    res: Response<ResponseData<ResponseNewsWithMetaType>>,
    next: NextFunction,
  ) {
    try {
      const { from, page, search, to } = req.query;

      const response = await NewsService.read({
        from,
        page,
        search,
        to,
      });

      return res.status(200).json({
        success: true,
        message: "Success read news",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // READ BY FILTER ==========================================
  static async readByFilter(
    req: Request<{ filter: NewsFilterType }>,
    res: Response<ResponseData<ResponseNewsType[]>>,
    next: NextFunction,
  ) {
    try {
      const filter = req.params.filter;

      const response = await NewsService.readByFilter(filter);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // READ DETAIL ==============================================
  static async detail(
    req: Request<{ id: string }>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const response = await NewsService.detail(+id);

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

  // UPDATE ===================================================
  static async update(
    req: Request<{ id: string }, {}, UpdateNewsType>,
    res: Response<ResponseData<ResponseNewsType>>,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const existing = await NewsService.detail(+id);
      if (!existing?.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(404).json({
          success: false,
          message: "news not found",
        });
      }

      const rawBody: UpdateNewsType = { ...req.body };

      if (rawBody.link_berita && typeof rawBody.link_berita === "string") {
        try {
          rawBody.link_berita = JSON.parse(rawBody.link_berita);
        } catch {
          if (req.file) {
            await FileService.deleteFile(req.file.path);
          }
          return res.status(400).json({
            success: false,
            message: "link_berita harus berupa JSON array",
          });
        }
      }

      // field update link
      if (
        rawBody.update_link_berita &&
        typeof rawBody.update_link_berita === "string"
      ) {
        try {
          rawBody.update_link_berita = JSON.parse(rawBody.update_link_berita);
        } catch {
          if (req.file) {
            await FileService.deleteFile(req.file.path);
          }
          return res.status(400).json({
            success: false,
            message: "link_berita harus berupa JSON array",
          });
        }
      }

      const body = validation<UpdateNewsType>(NewsValidation.UPDATE, rawBody);

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json({
          success: false,
          message: body.message,
        });
      }

      // cek link berita
      if (body.data.update_link_berita) {
        // cek link berita
        for (const item of body.data.update_link_berita) {
          if (item.action === "delete") {
            await LinkBeritaService.delete(item.id);
          } else if (item.action === "update") {
            await LinkBeritaService.update({
              id: item.id,
              label: item.label,
              link: item.link,
            });
          }
        }
      }

      const response = await NewsService.update(
        +id,
        {
          category: body.data.category,
          title: body.data.title,
          content: body.data.content,
        },
        req.file?.filename,
        req.body.link_berita ? body.data.link_berita : undefined,
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
      if (req.file) await FileService.deleteFile(req.file.path);
      next(error);
    }
  }

  // DELETE ===================================================
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const response = await NewsService.delete(+id);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
