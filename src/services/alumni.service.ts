import {
  IAlumni,
  CreateAlumniType,
  UpdateAlumniType,
  ResponseAlumniType,
  toResponseAlumniType,
} from "../models/alumni-model";
import AlumniModel from "../schemas/alumni.schema";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class AlumniService {
  // CREATE
  static async create(
    req: CreateAlumniType,
    img_alumni: string
  ): Promise<ResponseAlumniType> {
    const response: IAlumni = await AlumniModel.create({
      name: req.name,
      angkatan: req.angkatan,
      description: req.description,
      img_alumni,
    });

    return toResponseAlumniType(response);
  }

  // READ ALL
  static async read(): Promise<ResponseAlumniType[]> {
    const response: IAlumni[] = await AlumniModel.find().sort({
      createdAt: -1,
    });

    return response.map((item) => toResponseAlumniType(item));
  }

  // DETAIL
  static async detail(_id: string): Promise<ResponseData<ResponseAlumniType>> {
    const response = await AlumniModel.findById(_id);

    if (!response) {
      return {
        success: false,
        message: "Alumni not found",
      };
    }

    return {
      success: true,
      message: "Success read detail alumni",
      data: toResponseAlumniType(response),
    };
  }

  // UPDATE
  static async update(
    _id: string,
    img_alumni: string,
    req: UpdateAlumniType
  ): Promise<ResponseData<ResponseAlumniType>> {
    const alumni = await this.detail(_id);
    if (!alumni.success) return alumni;

    const oldImage = alumni.data.img_alumni;

    // Jika ada gambar baru → hapus file lama
    if (img_alumni) {
      await FileService.deleteFormPath(oldImage, "img_alumni");
    }

    const response = await AlumniModel.findByIdAndUpdate(
      _id,
      {
        ...req,
        img_alumni: img_alumni || oldImage,
      },
      { new: true }
    );

    return {
      success: true,
      message: "Success update alumni",
      data: toResponseAlumniType(response!),
    };
  }

  // DELETE
  static async delete(_id: string): Promise<ResponseMessage> {
    const alumni = await this.detail(_id);
    if (!alumni.success) return alumni;

    // Hapus file gambar
    await FileService.deleteFormPath(alumni.data.img_alumni, "img_alumni");

    await AlumniModel.findByIdAndDelete(_id);

    return {
      success: true,
      message: "Success delete alumni",
    };
  }
}
