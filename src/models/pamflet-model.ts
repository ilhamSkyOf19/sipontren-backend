// MongoDB / Mongoose style
export type IPamflet = {
  id: number; // MongoDB ObjectId sebagai string
  pamflet: string; // nama file atau path
  createdAt: string; // timestamps opsional jika pakai mongoose timestamps
  updatedAt: string;
};

// Create – tanpa id, dibuat otomatis
export type CreatePamfletType = {
  pamflet: string;
};

// Update – id wajib, pamflet optional
export type UpdatePamfletType = {
  id: number;
  pamflet?: string;
};

// Response – dikirim ke FE
export type ResponsePamfletType = {
  id: number;
  pamflet: string;
  createdAt: string;
  updatedAt: string;
};

// Mapper dari Mongoose Document ke Response
export const toResponsePamfletType = (
  pamflet: IPamflet
): ResponsePamfletType => ({
  id: pamflet.id,
  pamflet: pamflet.pamflet,
  createdAt: pamflet.createdAt,
  updatedAt: pamflet.updatedAt,
});
