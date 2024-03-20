import path from 'path';

export const environment = process.env.NODE_ENV;
export const port = process.env.USER_PORT;

export const corsUrl = process.env.CORS_URL || '*';

export const logDirectory = process.env.LOG_DIR;

