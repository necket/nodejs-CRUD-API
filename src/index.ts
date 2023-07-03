import { config } from 'dotenv';
import { app } from './app';

config();
const port = Number(process.env.PORT) ?? 4000;

app(port);
