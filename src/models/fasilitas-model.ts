// MongoDB / Mongoose style
export type IFasilitas = {
  _id: string;
  fasilitas: string;
  keterangan: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
};

// Create – tanpa _id, dibuat otomatis
export type CreateFasilitasType = Pick<IFasilitas, "fasilitas" | "keterangan">;

// Update – _id wajib,
export type UpdateFasilitasType = Partial<CreateFasilitasType>;

// Response –
export type ResponseFasilitasType = {
  _id: string;
  fasilitas: string;
  keterangan: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
};

// Mapper dari Mongoose Document ke Response
export const toResponseFasilitasType = (
  fasilitas: IFasilitas
): ResponseFasilitasType => ({
  _id: fasilitas._id,
  fasilitas: fasilitas.fasilitas,
  keterangan: fasilitas.keterangan,
  images: fasilitas.images,
  createdAt: fasilitas.createdAt,
  updatedAt: fasilitas.updatedAt,
});
