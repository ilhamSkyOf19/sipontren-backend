import z, { ZodType } from "zod";
import { CreateNewsType, UpdateNewsType } from "../models/news-model";

export class NewsValidation {

    // create 
    static readonly CREATE = z.object({
        title: z.string({
            error: (val) => val.input === undefined ? 'title harus diisi' : 'title harus berupa string'
        }),
        content: z.string({
            error: (val) => val.input === undefined ? 'content harus diisi' : 'content harus berupa string'
        }),
        category: z.enum(['berita', 'artikel'], {
            error: (val) => val.input === undefined ? 'categrory harus diisi' : 'categrory tidak sesuai'
        }),

    }).strict() as ZodType<CreateNewsType>;


    // update 
    static readonly UPDATE = z.object({
        title: z.string({
            error: (val) => val.input === undefined ? 'title harus diisi' : 'title harus berupa string'
        })
            .min(1, { message: 'title harus diisi' })
            .optional(),
        content: z.string({
            error: (val) => val.input === undefined ? 'content harus diisi' : 'content harus berupa string'
        })
            .min(1, { message: 'content harus diisi' })
            .optional(),
        category: z.enum(['berita', 'artikel'], {
            error: (val) => val.input === undefined ? 'categrory harus diisi' : 'categrory tidak sesuai'
        }).optional(),

    }).strict() as ZodType<UpdateNewsType>;
}