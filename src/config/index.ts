import { config } from 'dotenv';
config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = process.env;
export const DB_FILE_URL = 'src/db/db.json';
export const DB_MONGO_URL =
  'mongodb+srv://laposhkabolt:Laposhka1717@cluster0.ss8ntdg.mongodb.net/WTF';
