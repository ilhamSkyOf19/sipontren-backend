export type IJumlahAlumni = {
  id: number;
  laki_laki: number;
  perempuan: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJumlahAlumniType = {
  laki_laki: number;
  perempuan: number;
};

export type UpdateJumlahAlumniType = {
  id: number;
  laki_laki?: number;
  perempuan?: number;
};

// Response – dikirim ke FE
export type ResponseJumlahAlumniType = {
  id: number;
  laki_laki: number;
  perempuan: number;
  createdAt: Date;
  updatedAt: Date;
};

// Mapper dari Mongoose Document ke Response
export const toResponseJumlahAlumniType = (
  response: IJumlahAlumni,
): ResponseJumlahAlumniType => ({
  id: response.id,
  laki_laki: response.laki_laki,
  perempuan: response.perempuan,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
});
