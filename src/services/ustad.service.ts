import {
  IUstad,
  CreateUstadType,
  UpdateUstadType,
  ResponseUstadType,
  toResponseUstadType,
} from "../models/ustad-model";
import UstadModel from "../schemas/ustad.schema";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class UstadService {
  // create
  static async create(
    req: CreateUstadType,
    ustad_img: string
  ): Promise<ResponseUstadType> {
    const ustad = new UstadModel({
      ...req,
      ustad_img,
      url_ustad_img: `${process.env.BASE_URL}/ustad_img/${ustad_img}`,
    });

    await ustad.save();

    return toResponseUstadType(ustad.toObject() as IUstad);
  }

  // read all
  static async read(): Promise<ResponseUstadType[]> {
    const ustads = await UstadModel.find().exec();

    return ustads.map((ustad) => {
      ustad.url_ustad_img = `${process.env.BASE_URL}/ustad_img/${ustad.ustad_img}`;
      return toResponseUstadType(ustad.toObject() as IUstad);
    });
  }

  // detail
  static async detail(_id: string): Promise<ResponseData<ResponseUstadType>> {
    const ustad = await UstadModel.findById(_id).exec();

    // cek
    console.log(ustad);

    if (!ustad) {
      return { success: false, message: "Ustad not found" };
    }

    ustad.url_ustad_img = `${process.env.BASE_URL}/ustad_img/${ustad.ustad_img}`;

    return {
      success: true,
      message: "success read detail ustad",
      data: toResponseUstadType(ustad.toObject() as IUstad),
    };
  }

  // update
  static async update(
    ustad_img: string | undefined,
    req: UpdateUstadType
  ): Promise<ResponseData<ResponseUstadType>> {
    const ustad = await this.detail(req._id);
    if (!ustad.success) return ustad;

    if (ustad_img) {
      await FileService.deleteFormPath(ustad.data.ustad_img, "ustad_img");
      req.ustad_img = ustad_img;
    }

    const updated = await UstadModel.findByIdAndUpdate(
      req._id,
      {
        ...req,
        url_ustad_img: req.ustad_img
          ? `${process.env.BASE_URL}/ustad_img/${req.ustad_img}`
          : ustad.data.url_ustad_img,
      },
      { new: true }
    ).exec();

    return {
      success: true,
      message: "success update ustad",
      data: toResponseUstadType(updated!.toObject() as IUstad),
    };
  }

  // delete
  static async delete(_id: string): Promise<ResponseMessage> {
    const ustad = await this.detail(_id);
    if (!ustad.success) return ustad;

    await FileService.deleteFormPath(ustad.data.ustad_img, "ustad_img");
    await UstadModel.findByIdAndDelete(_id).exec();

    return {
      success: true,
      message: "success delete ustad",
    };
  }
}
