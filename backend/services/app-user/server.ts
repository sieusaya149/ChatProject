import Logger from '@viethung/logger';
import {port} from './config';
import app from './app';

app.listen(port, () => {
    console.log(`server running on port : ${port}`);
}).on('error', (e: Error) => Logger.error(e));
