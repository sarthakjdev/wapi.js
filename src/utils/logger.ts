import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(
            ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
        ),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'errors.log',
        }),
    ],
})

export default logger
