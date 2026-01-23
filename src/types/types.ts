import { Request } from "express";

// response data
export type ResponseData<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

// response message
export type ResponseMessage = {
  success: boolean;
  message: string;
};

// response token
export interface TokenRequest<
  params = {},
  _ = {},
  body = {},
  query = {},
> extends Request<params, _, body, query> {
  data?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export type FilterData = {
  from?: string;
  to?: string;
  search?: string;
  page?: string;
  jenis_kelamin?: "laki_laki" | "perempuan";
  jenis_sekolah?: "SD" | "SMP" | "SMA";
};
