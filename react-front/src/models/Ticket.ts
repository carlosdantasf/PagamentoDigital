export interface Ticket {
    id: number,
    descricao: string,
    identificacaoPagamento: string,
    nomeContribuinte: string,
    formaPagamento: string,
    cnpjContribuinte: string,
    idTransacao: string,
    numeroReferencia: string,
    dataPagamento: string,
    valor: number,
    dataConfirmacaoPagamento: string,
    createdAt: string,
}

export interface TicketLog{
    quantidade: number, valor: number, data: string
}