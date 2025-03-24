import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logDirectory = path.join(__dirname, '..', '..', '..', 'logs');
const logFilePath = path.join(logDirectory, 'bookshelf-%DATE%.log');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true }); 
}

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, books, ...meta }) => {
        let logMessage = `${timestamp} ${level}: ${message}`;

        if (books) {
            logMessage += ` Books: ${JSON.stringify(books)}`;
        }

        if (Object.keys(meta).length) {
            logMessage += ` ${JSON.stringify(meta)}`;
        }

        return logMessage;
    })
);

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new DailyRotateFile({
            filename: logFilePath,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat   
            ),
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

export default logger;