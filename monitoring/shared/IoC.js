const { Container, injectable} = require("inversify");
const logger = require('../src/config/logger');
require('reflect-metadata');
const TYPES = {
    MyService: Symbol.for("MyService")
};

@injectable()
class MyService {
    createLog(level, message) {
        logger.log(level, message);
    }
}

const container = new Container();
container.bind(TYPES.MyService).to(MyService);

module.exports = { container, TYPES };
