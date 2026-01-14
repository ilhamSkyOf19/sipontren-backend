// MongoDB / Mongoose style
export type IFasilitas = {
  id: number;
  fasilitas: string;
  keterangan: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
};

// Create – tanpa id, dibuat otomatis
export type CreateFasilitasType = Pick<IFasilitas, "fasilitas" | "keterangan">;

// Update – id wajib,
export type UpdateFasilitasType = Partial<CreateFasilitasType>;

// Response –
export type ResponseFasilitasType = {
  id: number;
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
  id: fasilitas.id,
  fasilitas: fasilitas.fasilitas,
  keterangan: fasilitas.keterangan,
  images: fasilitas.images,
  createdAt: fasilitas.createdAt,
  updatedAt: fasilitas.updatedAt,
});
