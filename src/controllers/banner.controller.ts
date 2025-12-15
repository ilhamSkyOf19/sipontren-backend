import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { BannerService } from "../services/banner.service";

export class BannerController {
  // create
  static async create(
    req: Request,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const response = await BannerService.create(req.file.filename);

      return res.status(201).json({
        success: true,
        message: "Banner created successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read all
  static async read(
    _req: Request,
    res: Response<ResponseData<{ _id: string; img: string }[]>>,
    next: NextFunction
  ) {
    try {
      const response = await BannerService.read();

      return res.status(200).json({
        success: true,
        message: "List of banners",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read detail
  static async readDetail(
    req: Request<{ id: string }>,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const response = await BannerService.detail(id);

      return res.status(200).json({
        success: true,
        message: "Banner detail",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }>,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const response = await BannerService.update(id, req.file.filename);

      return res.status(200).json({
        success: true,
        message: "Banner updated successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const response = await BannerService.delete(id);

      return res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
