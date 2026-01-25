import { ResponseLinkBeritaType } from "./linkBerita-model";

// =======================
// FILTER
// =======================
export type NewsFilterType = "today" | "week" | "month";

// =======================
// ENTITY (Prisma Result)
// =======================
export type INews = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;

  // relasi
  link_berita?: {
    id: number;
    label: string;
    link: string;
    newsId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

// =======================
// LINK INPUT (CREATE)
// =======================
export type CreateLinkBeritaInputType = {
  label: string;
  link: string;
};

// =======================
// CREATE
// =======================
export type CreateNewsType = {
  category: "berita" | "artikel";
  title: string;
  content: string;

  // menerima array link berita
  link_berita?: CreateLinkBeritaInputType[];
};

// =======================
// UPDATE
// =======================
// link berita update
export type LinkBeritaUpdate = {
  id: number;
  label?: string;
  link?: string;
  action: "update" | "delete";
};

export type UpdateNewsType = Partial<CreateNewsType> & {
  update_link_berita?: LinkBeritaUpdate[];
};

// =======================
// RESPONSE
// =======================
export type ResponseNewsType = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;

  // relasi
  link_berita?: ResponseLinkBeritaType[];
};

// =======================
// RESPONSE WITH META
// =======================
export type ResponseNewsWithMetaType = {
  data: ResponseNewsType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

// =======================
// MAPPER
// =======================
export const toResponseNews = (news: INews): ResponseNewsType => {
  return {
    id: news.id,
    category: news.category,
    title: news.title,
    content: news.content,
    thumbnail: news.thumbnail,
    createdAt: news.createdAt,
    updatedAt: news.updatedAt,
    link_berita: news.link_berita,
  };
};

// =======================
// FILTER DATA
// =======================
export type FilterData = {
  from?: string;
  to?: string;
  search?: string;
  page?: string;
};
