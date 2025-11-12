import { AppError } from "@utils";

export const success = (res: any, data: any, status = 200) => {
  return res.status(status).json(data);
};

export const fail = (message: string, status = 500) => {
  throw new AppError(message, status);
};
