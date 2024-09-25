import {OutputFindAll, OutputFindAllImpl, OutputObject} from "./FindAllDTOs";

const db = require('./../../../models/index')

const outputFindAll: OutputFindAll = new OutputFindAllImpl();

const showAllTickets = async () => {
    const allTickets = await db.Ticket.findAll();

    return outputFindAll.execute(allTickets);
}

module.exports = showAllTickets;