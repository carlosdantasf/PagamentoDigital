export interface InputCreateTicket {
    descricao: string,
    identificacaoPagamento: string,
    nomeContribuinte: string,
    formaPagamento: string,
    cnpjContribuinte: string,
    idTransacao: string,
    numeroReferencia: string,
    dataPagamento: string,
    valor: number,
    dataConfirmacaoPagamento: string
}

export interface OutputCreatedTicket {
    descricao: string,
    identificacaoPagamento: string,
    nomeContribuinte: string,
    formaPagamento: string,
    cnpjContribuinte: string,
    idTransacao: string,
    numeroReferencia: string,
    dataPagamento: string,
    valor: number,
    dataConfirmacaoPagamento: string
}

export function mapToOutput(input: any): OutputCreatedTicket {
    return {
        descricao: input.descricao,
        identificacaoPagamento: input.identificacaoPagamento,
        nomeContribuinte: input.nomeContribuinte,
        formaPagamento: input.formaPagamento,
        cnpjContribuinte: input.cnpjContribuinte,
        idTransacao: input.idTransacao,
        numeroReferencia: input.numeroReferencia,
        dataPagamento: input.dataPagamento,
        valor: input.valor,
        dataConfirmacaoPagamento: input.dataConfirmacaoPagamento
    };
}
