// MongoDB / Mongoose style
export type IPamflet = {
  _id: string; // MongoDB ObjectId sebagai string
  pamflet: string; // nama file atau path
  createdAt: string; // timestamps opsional jika pakai mongoose timestamps
  updatedAt: string;
};

// Create – tanpa _id, dibuat otomatis
export type CreatePamfletType = {
  pamflet: string;
};

// Update – _id wajib, pamflet optional
export type UpdatePamfletType = {
  _id: string;
  pamflet?: string;
};

// Response – dikirim ke FE
export type ResponsePamfletType = {
  _id: string;
  pamflet: string;
  createdAt: string;
  updatedAt: string;
};

// Mapper dari Mongoose Document ke Response
export const toResponsePamfletType = (
  pamflet: IPamflet
): ResponsePamfletType => ({
  _id: pamflet._id,
  pamflet: pamflet.pamflet,
  createdAt: pamflet.createdAt,
  updatedAt: pamflet.updatedAt,
});
