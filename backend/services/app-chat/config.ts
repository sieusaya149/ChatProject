import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file
// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;
// Allow crossing sharing for domain
export const corsUrl = process.env.CORS_URL || '*';

export const tokenInfo = {
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidity: parseInt(
        process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'
    ),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || ''
};

export const logDirectory = process.env.LOG_DIR;

export const constant = {
    KEEP_HIDE_MESSAGE_TIME: 60 * 60 * 24 * 7, // 7 days
}