import { request, response } from 'express';

const { NODE_ENV } = process.env;

export const customLogger = (req = request, res = response, next) => {
  // Winston Logger (note that Winston is not actually used in this snippet; console.log is used instead)

  if (NODE_ENV !== 'production') {
    const { method, path } = req;
    const requestLog = `[${method}] --> ${path}`;
    console.log(requestLog);
  }

  next();
};
