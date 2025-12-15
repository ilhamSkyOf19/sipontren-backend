import { BannerModel } from "../schemas/banner.schema";
import { FileService } from "./file.service";

export class BannerService {
  // create
  static async create(banner: string): Promise<{ _id: string; img: string }> {
    const response = await BannerModel.create({ banner });
    return { _id: response._id.toString(), img: response.banner };
  }

  // read all
  static async read(): Promise<{ _id: string; img: string }[]> {
    const response = await BannerModel.find().sort({ createdAt: -1 });
    return response.map((item) => ({
      _id: item._id.toString(),
      img: item.banner,
    }));
  }

  // read detail
  static async detail(id: string): Promise<{ _id: string; img: string }> {
    const response = await BannerModel.findById(id);
    if (!response) throw new Error("Banner not found");
    return { _id: response._id.toString(), img: response.banner };
  }

  // update
  static async update(
    id: string,
    banner: string
  ): Promise<{ _id: string; img: string }> {
    const oldBanner = await this.detail(id);

    const response = await BannerModel.findByIdAndUpdate(
      id,
      { banner },
      { new: true }
    );

    if (!response) throw new Error("Banner not found");

    // delete old file
    await FileService.deleteFormPath(oldBanner.img, "banner");

    return { _id: response._id.toString(), img: response.banner };
  }

  // delete
  static async delete(id: string): Promise<{ _id: string; img: string }> {
    const banner = await this.detail(id);

    await BannerModel.findByIdAndDelete(id);

    // delete file
    await FileService.deleteFormPath(banner.img, "banner");

    return { _id: id, img: banner.img };
  }
}
