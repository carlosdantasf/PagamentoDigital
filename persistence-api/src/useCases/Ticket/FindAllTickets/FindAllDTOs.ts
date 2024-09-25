const Ticket = require("../../../models/ticket")

// DTOs
export class OutputObject {
    constructor(
        public id: string,
        public descricao: string,
        public dataPagamento: string,
        public valor: number,
        public dataConfirmacaoPagamento: string,
        public createdAt: string
        ) {
    }
}

// Interfaces
export interface OutputFindAll {
    execute(input: typeof Ticket[]): OutputObject[];
}

// Implementations
export class OutputFindAllImpl implements OutputFindAll {
    execute(input: typeof Ticket[]): OutputObject[] {
        const outPutObjectList: OutputObject[] = []
        input.forEach((ticket) => {
            const { id, descricao, dataPagamento, valor, dataConfirmacaoPagamento, createdAt } = ticket;
            outPutObjectList.push(new OutputObject(id, descricao, dataPagamento, valor, dataConfirmacaoPagamento, createdAt))
        })
        return outPutObjectList;
    }
}