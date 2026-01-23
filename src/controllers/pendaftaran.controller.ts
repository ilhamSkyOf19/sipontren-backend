import { NextFunction, Request, Response } from "express";
import {
  CreatePendaftaranType,
  ResponsePendaftaranType,
} from "../models/pendaftaran-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { PendaftaranService } from "../services/pendaftaran.service";

export class PendaftaranController {
  // create
  static async create(
    req: Request<{}, {}, CreatePendaftaranType>,
    res: Response<ResponseData<ResponsePendaftaranType>>,
    next: NextFunction,
  ) {
    try {
      // get body
      const body = req.body;

      // call service
      const response = await PendaftaranService.create(body);

      // return
      return res.status(201).json({
        success: true,
        message: "Pendaftaran created successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read
  static async readAll(
    _req: Request,
    res: Response<ResponseData<ResponsePendaftaranType[]>>,
    next: NextFunction,
  ) {
    try {
      // call service
      const response = await PendaftaranService.readAll();

      // return
      return res.status(200).json({
        success: true,
        message: "Pendaftaran created successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // update aktif
  static async updateAktif(
    req: Request<{ id: string }, {}, { aktif: boolean }>,
    res: Response<ResponseData<ResponsePendaftaranType>>,
    next: NextFunction,
  ) {
    try {
      // get id
      const id = +req.params.id;

      // get body
      const body = req.body;

      //   cek data aktif
      const cek = await PendaftaranService.findAktif();

      if (cek && body.aktif) {
        return res.status(400).json({
          success: false,
          message: "Pendaftaran already active",
        });
      }

      // call service
      const response = await PendaftaranService.updateAktifById(id, body.aktif);

      // return
      return res.status(200).json({
        success: true,
        message: "Pendaftaran updated successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // get find aktif
  static async getAktif(
    _req: Request,
    res: Response<ResponseData<ResponsePendaftaranType>>,
    next: NextFunction,
  ) {
    try {
      // call service
      const response = await PendaftaranService.findAktif();

      // cek
      if (!response) {
        return res.status(200).json({
          success: false,
          message: "Pendaftaran not found",
        });
      }

      // return
      return res.status(200).json({
        success: true,
        message: "Pendaftaran created successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // delete
  static async deleteById(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction,
  ) {
    try {
      // get id
      const id = +req.params.id;

      // call service
      const response = await PendaftaranService.deleteById(id);

      // return
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
