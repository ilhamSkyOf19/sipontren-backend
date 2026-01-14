// MongoDB / Mongoose style
export type IBanner = {
  id: number;
  banner: string;
  createdAt: string;
  updatedAt: string;
};

// Create – tanpa id, dibuat otomatis
export type CreateBaType = {
  banner: string;
};

// Update – id wajib, pamflet optional
export type UpdateBannerType = {
  id: number;
  banner?: string;
};

// Response – dikirim ke FE
export type ResponseBannerType = {
  id: number;
  banner: string;
  createdAt: string;
  updatedAt: string;
};

// Mapper dari Mongoose Document ke Response
export const toResponseBannerType = (banner: IBanner): ResponseBannerType => ({
  id: banner.id,
  banner: banner.banner,
  createdAt: banner.createdAt,
  updatedAt: banner.updatedAt,
});
