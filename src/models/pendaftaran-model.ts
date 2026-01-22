export type IPendaftaran = {
  id: number;
  dari: Date;
  sampai: Date;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePendaftaranType = {
  dari: string;
  sampai: string;
};

export type UpdatePendaftaranType = Partial<CreatePendaftaranType>;

// Response – dikirim ke FE
export type ResponsePendaftaranType = IPendaftaran;

// Mapper dari Mongoose Document ke Response
export const toResponsePendaftaranType = (
  response: IPendaftaran,
): ResponsePendaftaranType => ({
  id: response.id,
  dari: response.dari,
  sampai: response.sampai,
  aktif: response.aktif,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
});
