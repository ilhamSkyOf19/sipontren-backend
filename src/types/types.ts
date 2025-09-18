import { Request } from "express"

// response data 
export type ResponseData<T> =
    {
        success: boolean
        message: string
        data: T
    } |
    {
        success: boolean
        message: string
    }


// response message 
export type ResponseMessage = {
    success: boolean
    message: string
}

// response token 
export interface ResponseToken<params = {}, _ = {}, body = {}, query = {}> extends Request<params, _, body, query> {
    data?: {
        token: string
    }
}