import axios from "axios";
import moment from "moment/moment";
import {TicketLog} from "../models/Ticket.ts";

interface HandleClickParams{
    params: Record<string, string>;
    baseUrl: string;
    setQrCode: (str:string|null)=>void;
    setItsLoading: (isLoading:boolean)=>void;
    setError: (error:string|null)=>void;
    setLastParams: (lastParams: Record<string, string> | null)=>void;
    ticketData: TicketLog[];
    ticketValue: number;
    setTicketData: (ticketLog:TicketLog[]) => void;
    setPaymentStatus: (status: string | null)=>void;
    postUrl:string | undefined;
}

interface checkPaymentStatusParams{
    params: Record<string, string>;
    ticketData: TicketLog[];
    ticketValue: number;
    setTicketData: (ticketLog:TicketLog[]) => void;
    setPaymentStatus: (status: string | null)=>void;
    postUrl:string | undefined;
}

const constructUrl = (base: string, params: Record<string, string>) => {
    let query = "";
    let isFirst = true;

    for (const [key, value] of Object.entries(params)) {
        if (value !== "") {
            if (isFirst) {
                query += `?${key}=${encodeURIComponent(value)}`;
                isFirst = false;
            } else {
                query += `&${key}=${encodeURIComponent(value)}`;
            }
        }
    }

    return base + query;
};

const apiUrl = import.meta.env.VITE_AUTOMATION_API;
console.log(apiUrl)

const checkPaymentStatus = async (params: checkPaymentStatusParams) => {
    try {
        const interval = setInterval(async () => {
            const response = await axios.get(`${apiUrl}/check-payment-status`);
            const data = await response.data;
            console.log("Aguardando pagamento...")
            if (data.message === 'Payment completed successfully') {
                console.log(JSON.stringify(data))
                console.log(data)

                // Convertendo o valor de string para float
                if (data.valor) {
                    const valorString = data.valor.replace('R$ ', '').replace(',', '.').replace('R$', '');
                    data.valor = parseFloat(valorString);
                }

                params.setTicketData([...params.ticketData.slice(-2), {quantidade: (+params.params.valorPrincipal/params.ticketValue), valor: +params.params.valorPrincipal, data: moment().format("DD-MM-YYYY") }]);
                params.setPaymentStatus('Pagamento realizado. Agradecemos a confiança!');
                clearInterval(interval);
                await (async () => {
                    try {
                        const response = await axios.post(String(params.postUrl), data);
                        console.log('Resposta:', response.data);
                    } catch (error) {
                        console.error('Erro:', error);
                    }
                })();

            } else {
                params.setPaymentStatus('Aguardando pagamento...');

            }
        }, 5000); // Verifica o status do pagamento a cada 5 segundos
    } catch (error) {
        console.error('Error checking payment status:', error);
    }
};

export const handleClick = async (params: HandleClickParams) => {
    const url = constructUrl(params.baseUrl, params.params);
    params.setQrCode("")
    params.setItsLoading(true)
    params.setError(null);
    params.setLastParams(params.params);

    try {
        const response = await fetch(`${apiUrl}/automate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (data.qrCodeSrc) {
            params.setQrCode(data.qrCodeSrc);
            params.setItsLoading(false)
            // Inicia a verificação do status do pagamento
            await checkPaymentStatus({
                params: params.params,
                postUrl: params.postUrl,
                ticketData:params.ticketData,
                ticketValue:params.ticketValue,
                setPaymentStatus: params.setPaymentStatus,
                setTicketData: params.setTicketData
            });
        } else {
            console.error('QR code not found in response');
            params.setError("Algo deu errado durante a geração do QR code. Por favor, tente novamente.")
        }
    } catch (error) {
        console.error('Error automating the page:', error);
        params.setError("Algo deu errado durante a geração do QR code. Por favor, tente novamente.")
    }
}