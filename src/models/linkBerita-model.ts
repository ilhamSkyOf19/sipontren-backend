// src/models/link-berita-model.ts

// Entity (represent Prisma result)
export type ILinkBerita = {
  id: number;
  label: string;
  link: string;
  newsId: number;
  createdAt: Date;
  updatedAt: Date;
};

// =======================
// CREATE
// =======================
export type CreateLinkBeritaType = {
  label: string;
  link: string;
  newsId: number;
};

// =======================
// UPDATE
// =======================
export type UpdateLinkBeritaType = Partial<
  Omit<CreateLinkBeritaType, "newsId">
> & {
  id: number;
};

// =======================
// RESPONSE
// =======================
export type ResponseLinkBeritaType = {
  id: number;
  label: string;
  link: string;
  newsId: number;
  createdAt: Date;
  updatedAt: Date;
};

// =======================
// MAPPER
// =======================
export const toResponseLinkBerita = (
  link: ILinkBerita,
): ResponseLinkBeritaType => {
  return {
    id: link.id,
    label: link.label,
    link: link.link,
    newsId: link.newsId,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  };
};
