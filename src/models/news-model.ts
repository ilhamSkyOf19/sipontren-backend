import { News } from "../generated/prisma";

// create 
export type CreateNewsType = {
    category: 'berita' | 'artikel',
    title: string,
    content: string,
}


// update 
export type UpdateNewsType = Partial<CreateNewsType>;


// response 
export type ResponseNewsType = CreateNewsType & {
    id: number,
    thumbnail: string,
    url_thumbnail?: string
    createdAt: Date,
    updatedAt: Date
}



// response to response 
export const toResponseNews = (news: News & { url_thumbnail?: string }): ResponseNewsType => {
    return {
        id: news.id,
        category: news.category,
        title: news.title,
        content: news.content,
        url_thumbnail: news.url_thumbnail,
        thumbnail: news.thumbnail,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt
    }
}