import express, {Request, Response, NextFunction} from 'express';
import routers from './routers';
import cors from 'cors';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType
} from '@viethung/api-response';
import {corsUrl} from './config';

process.on('uncaughtException', (e: Error) => {
    console.log(e);
});

const app = express();

// midderware added
app.use(
    express.json({
        limit: '10mb'
    })
);
app.use(
    express.urlencoded({
        limit: '10mb',
        extended: true,
        parameterLimit: 50000
    })
);
app.use(
    cors({
        origin: corsUrl,
        optionsSuccessStatus: 200
    })
);

// add router
app.use('/', routers);

// Not found request handling
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

// Error hanlder
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL)
            console.log(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
            );
    } else {
        console.log(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        console.log(err);
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
