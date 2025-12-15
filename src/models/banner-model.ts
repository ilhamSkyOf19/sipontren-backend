// MongoDB / Mongoose style
export type IBanner = {
  _id: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
};

// Create – tanpa _id, dibuat otomatis
export type CreateBaType = {
  banner: string;
};

// Update – _id wajib, pamflet optional
export type UpdateBannerType = {
  _id: string;
  banner?: string;
};

// Response – dikirim ke FE
export type ResponseBannerType = {
  _id: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
};

// Mapper dari Mongoose Document ke Response
export const toResponseBannerType = (banner: IBanner): ResponseBannerType => ({
  _id: banner._id,
  banner: banner.banner,
  createdAt: banner.createdAt,
  updatedAt: banner.updatedAt,
});
