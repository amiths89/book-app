import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

// Local execution path - Uncomment this and comment docker path when executing locally
//import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//const logDirectory = path.join(__dirname, '..', '..', '..', 'logs');

//Docker execution path
const logDirectory = '/app/logs';

console.log("logDirectory path ",logDirectory);
try {
    fs.mkdirSync(logDirectory, { recursive: true });
} catch (err) {
    console.error('Error creating log directory:', err);
}
const logFilePath = path.join(logDirectory, 'bookshelf-%DATE%.log');
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
    ],
});


export default logger;