import { allowedOrigins } from './allowed-origin';

export const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
