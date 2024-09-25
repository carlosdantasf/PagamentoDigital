const { createLogger, format, transports } = require('winston');
const CustomDBTransport = require("../transports/CustomDBTransport");

// Configuração do formato dos logs
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Criação do logger Winston
const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new CustomDBTransport({exitOnError: false}),
        new transports.Console()
    ],
});

module.exports = logger;
