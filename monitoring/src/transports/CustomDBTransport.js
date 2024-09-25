const Transport = require('winston-transport');
const {Log} = require('../../models');

module.exports = class CustomDBTransport extends Transport {
    constructor(opts) {
        super(opts);
    }

    // Função log que é chamada pelo winston
    async log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        try {
            await Log.create({
                level: info.level,
                message: info.message,
                timestamp: new Date(info.timestamp || Date.now()) // Define o timestamp
            });

            callback();
        } catch (error) {
            console.error('Error writing log to database:', error);
            callback(error);
        }
    }
};
