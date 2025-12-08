import { PamfletModel } from "../schemas/pamflet.schema";
import { FileService } from "./file.service";

export class PamfletService {
  // create
  static async create(pamflet: string): Promise<{ _id: string; img: string }> {
    const response = await PamfletModel.create({ pamflet });
    return { _id: response._id.toString(), img: response.pamflet };
  }

  // read all
  static async read(): Promise<{ _id: string; img: string }[]> {
    const response = await PamfletModel.find().sort({ createdAt: -1 });
    return response.map((item) => ({
      _id: item._id.toString(),
      img: item.pamflet,
    }));
  }

  // read detail
  static async detail(id: string): Promise<{ _id: string; img: string }> {
    const response = await PamfletModel.findById(id);
    if (!response) throw new Error("Pamflet not found");
    return { _id: response._id.toString(), img: response.pamflet };
  }

  // update
  static async update(
    id: string,
    pamflet: string
  ): Promise<{ _id: string; img: string }> {
    const oldPamflet = await this.detail(id);

    const response = await PamfletModel.findByIdAndUpdate(
      id,
      { pamflet },
      { new: true }
    );

    if (!response) throw new Error("Pamflet not found");

    // delete old file
    await FileService.deleteFormPath(oldPamflet.img, "pamflet");

    return { _id: response._id.toString(), img: response.pamflet };
  }

  // delete
  static async delete(id: string): Promise<{ _id: string; img: string }> {
    const pamflet = await this.detail(id);

    await PamfletModel.findByIdAndDelete(id);

    // delete file
    await FileService.deleteFormPath(pamflet.img, "pamflet");

    return { _id: id, img: pamflet.img };
  }
}
