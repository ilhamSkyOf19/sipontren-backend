import { NextFunction, Request, Response } from "express";
import { ResponseData, ResponseMessage } from "../types/types";
import {
  CreatePrestasiType,
  UpdatePrestasiType,
  FilterPrestasiData,
  ResponsePrestasiType,
  ResponsePrestasiWithMetaType,
} from "../models/prestasi-model";
import { PrestasiService } from "../services/prestasi.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";
import { PrestasiValidation } from "../validations/prestasi-validation";

export class PrestasiController {
  // CREATE
  static async create(
    req: Request<{}, {}, CreatePrestasiType>,
    res: Response<ResponseData<ResponsePrestasiType>>,
    next: NextFunction,
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const body = validation<Omit<CreatePrestasiType, "photo">>(
        PrestasiValidation.CREATE,
        {
          ...req.body,
          tahun_prestasi: +req.body.tahun_prestasi,
        },
      );

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json(body);
      }

      const response = await PrestasiService.create(
        body.data,
        req.file.filename,
      );

      return res.status(200).json({
        success: true,
        message: "Success created prestasi",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // READ
  static async read(
    req: Request<{}, {}, {}, FilterPrestasiData>,
    res: Response<ResponseData<ResponsePrestasiWithMetaType>>,
    next: NextFunction,
  ) {
    try {
      const response = await PrestasiService.read(req.query);

      return res.status(200).json({
        success: true,
        message: "Success read prestasi",
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
    res: Response<ResponseData<ResponsePrestasiType>>,
    next: NextFunction,
  ) {
    try {
      const response = await PrestasiService.detail(+req.params.id);
      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // COUNT
  static async getCount(
    _req: Request,
    res: Response<
      ResponseData<{
        internasional: number;
        nasional: number;
        provinsi: number;
        kabupaten: number;
        kecamatan: number;
      }>
    >,
    next: NextFunction,
  ) {
    try {
      // call service
      const response = await PrestasiService.getCount();

      // cek
      if (!response) {
        return res.status(400).json({
          success: false,
          message: "Prestasi not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Success read prestasi",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE
  static async update(
    req: Request<{ id: string }, {}, UpdatePrestasiType>,
    res: Response<ResponseData<ResponsePrestasiType>>,
    next: NextFunction,
  ) {
    try {
      const id = +req.params.id;

      const detail = await PrestasiService.detail(id);
      if (!detail.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json(detail);
      }

      const body = validation<Omit<UpdatePrestasiType, "photo" | "id">>(
        PrestasiValidation.UPDATE,
        req.body,
      );

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json(body);
      }

      const response = await PrestasiService.update(
        id,
        req.file?.filename ?? "",
        body.data,
      );

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
    next: NextFunction,
  ) {
    try {
      const response = await PrestasiService.delete(+req.params.id);
      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
