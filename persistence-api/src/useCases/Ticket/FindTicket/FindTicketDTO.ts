const Ticket = require("../../../models/ticket")

// DTOs
export class OutputObject {
    constructor(
        public id: string,
        public descricao: string,
        public dataPagamento: string,
        public identificacaoPagamento: string,
        public nomeContribuinte: string,
        public cnpjContribuinte: string,
        public idTransacao: string,
        public numeroReferencia: string,
        public valor: number,
        public dataConfirmacaoPagamento: string
    ) {
    }
}

// Interfaces
export interface OutputFindTicket {
    execute(ticket: typeof Ticket): OutputObject;
}

// Implementations
export class OutputFindTicketImpl implements OutputFindTicket {
    execute(ticket: typeof Ticket): OutputObject {
        const { id, descricao, dataPagamento, identificacaoPagamento, idTransacao, numeroReferencia, valor, dataConfirmacaoPagamento, nomeContribuinte, cnpjContribuinte } = ticket;
        const outPutObject: OutputObject = new OutputObject(id, descricao, dataPagamento, identificacaoPagamento, nomeContribuinte, cnpjContribuinte, idTransacao, numeroReferencia, valor, dataConfirmacaoPagamento);
        return outPutObject;
    }
}