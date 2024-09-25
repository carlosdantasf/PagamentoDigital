import {InputCreateTicket, mapToOutput} from "./CreateDTOs";
const db = require('./../../../models/index')

const createTicket = async (ticket: InputCreateTicket) => {
    try {
        const newTicket = await db.Ticket.create({
            descricao: ticket.descricao,
            identificacaoPagamento: ticket.identificacaoPagamento,
            nomeContribuinte: ticket.nomeContribuinte,
            formaPagamento: ticket.formaPagamento,
            cnpjContribuinte: ticket.cnpjContribuinte,
            idTransacao: ticket.idTransacao,
            numeroReferencia: ticket.numeroReferencia,
            dataPagamento: ticket.dataPagamento,
            valor: ticket.valor,
            dataConfirmacaoPagamento: ticket.dataConfirmacaoPagamento
        });

        console.log(newTicket)

        return mapToOutput(newTicket);
    } catch (error) {
        console.error('something had gone wrong while creating Ticket', error);
    }
}

module.exports = createTicket;