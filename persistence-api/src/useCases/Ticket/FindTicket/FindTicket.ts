import { OutputObject, OutputFindTicket, OutputFindTicketImpl } from './FindTicketDTO'
const db = require('./../../../models/index')
const outputFindTicket: OutputFindTicket = new OutputFindTicketImpl();

const findTicket = async (id: number) => {
    try {
    const ticket = await db.Ticket.findByPk(id);
    let outputTicket: OutputObject | null;
    if (ticket) outputTicket = outputFindTicket.execute(ticket);
    else outputTicket = null;
    return outputTicket;
    }catch (error){
        console.error('something had gone wrong while recovering ticket', error)
    }
}

module.exports = findTicket;