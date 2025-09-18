import z, { ZodType } from "zod";
import { CreateNewsType } from "../models/news-model";

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
            error: (val) => val.input === undefined ? 'categrory harus diisi' : 'categrory harus berupa string'
        }),

    }).strict() as ZodType<CreateNewsType>;
}