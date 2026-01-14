// src/models/news-model.ts
export type NewsFilterType = "today" | "week" | "month";

export type INews = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

// create
export type CreateNewsType = {
  category: "berita" | "artikel";
  title: string;
  content: string;
};

// update
export type UpdateNewsType = Partial<CreateNewsType>;

// response
export type ResponseNewsType = CreateNewsType & {
  id: number;
  thumbnail: string;
  url_thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toResponseNews = (news: INews): ResponseNewsType => {
  return {
    id: news.id,
    category: news.category,
    title: news.title,
    content: news.content,
    thumbnail: news.thumbnail,
    createdAt: news.createdAt,
    updatedAt: news.updatedAt,
  };
};
