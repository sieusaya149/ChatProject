import Logger from '@viethung/logger';
import {port} from './config';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
app.listen(port, () => {
    console.log(`server running on port : ${port}`);
}).on('error', (e: Error) => Logger.error(e));
