// src/models/news-model.ts

export type INews = {
  _id: string; // MongoDB ObjectId (string)
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  url_thumbnail?: string;
  createdAt: Date; // otomatis dari Mongoose timestamps
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
  _id: string;
  thumbnail: string;
  url_thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toResponseNews = (news: INews): ResponseNewsType => {
  return {
    _id: news._id,
    category: news.category,
    title: news.title,
    content: news.content,
    thumbnail: news.thumbnail,
    url_thumbnail: news.url_thumbnail,
    createdAt: news.createdAt,
    updatedAt: news.updatedAt,
  };
};
