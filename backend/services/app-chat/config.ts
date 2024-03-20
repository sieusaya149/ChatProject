import path from 'path';

export const environment = process.env.NODE_ENV;

export const port = process.env.CHAT_PORT;

export const corsUrl = process.env.CORS_URL || '*';

export const logDirectory = process.env.LOG_DIR;

export const constant = {
    KEEP_HIDE_MESSAGE_TIME: 60 * 60 * 24 * 7, // 7 days
}