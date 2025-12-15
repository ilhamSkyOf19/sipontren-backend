import { FasilitasModel } from "../schemas/fasilitas.schema";
import { FileService } from "./file.service";
import {
  CreateFasilitasType,
  UpdateFasilitasType,
  ResponseFasilitasType,
  toResponseFasilitasType,
} from "../models/fasilitas-model";

export class FasilitasService {
  // create
  static async create(
    data: CreateFasilitasType & { images: string }
  ): Promise<ResponseFasilitasType> {
    const response = await FasilitasModel.create({
      fasilitas: data.fasilitas,
      keterangan: data.keterangan,
      images: data.images,
    });

    return toResponseFasilitasType(response);
  }

  // read all
  static async read(): Promise<ResponseFasilitasType[]> {
    const response = await FasilitasModel.find().sort({ createdAt: -1 });

    return response.map(toResponseFasilitasType);
  }

  // read detail
  static async detail(id: string): Promise<ResponseFasilitasType> {
    const response = await FasilitasModel.findById(id);
    if (!response) throw new Error("Fasilitas not found");

    return toResponseFasilitasType(response);
  }

  // update
  static async update(
    id: string,
    data: UpdateFasilitasType & { images?: string }
  ): Promise<ResponseFasilitasType> {
    const oldData = await FasilitasModel.findById(id);
    if (!oldData) throw new Error("Fasilitas not found");

    const response = await FasilitasModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    if (!response) throw new Error("Fasilitas not found");

    // hapus file lama jika images diganti
    if (data.images && data.images !== oldData.images) {
      await FileService.deleteFormPath(oldData.images, "fasilitas");
    }

    return toResponseFasilitasType(response);
  }

  // delete
  static async delete(id: string): Promise<ResponseFasilitasType> {
    const response = await FasilitasModel.findByIdAndDelete(id);
    if (!response) throw new Error("Fasilitas not found");

    // delete image file
    await FileService.deleteFormPath(response.images, "fasilitas");

    return toResponseFasilitasType(response);
  }
}
