import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { DashboardResponse } from "../models/dashboard-model";
import { StudentService } from "../services/student.service";
import { UstadService } from "../services/ustad.service";
import { NewsService } from "../services/news.service";
import { FasilitasService } from "../services/fasilitas.service";
import { JumlahAlumniService } from "../services/jumlahAlumni.service";

export class DashboardController {
  static async getCount(
    _req: Request,
    res: Response<ResponseData<DashboardResponse | null>>,
    next: NextFunction,
  ) {
    try {
      // get data ustad
      const ustad = await UstadService.getCountByJenisKelamin();

      // get data berita
      const berita = await NewsService.getCountByCategory();

      // get data fasilitas
      const fasilitas = await FasilitasService.getCount();

      // get alumni count
      const alumni = await JumlahAlumniService.read();

      return res.status(200).json({
        success: true,
        message: "Success read dashboard",
        data: {
          ustad,
          berita,
          fasilitas,
          jumlahAlumni: alumni,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
