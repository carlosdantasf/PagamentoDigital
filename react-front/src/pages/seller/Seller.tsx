import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import './Seller.css';
import TrainLoading from '../../components/loaders/TrainLoading';
import ErrorNotification from '../../components/errors/ErrorNotification';
import H1Span from '../../components/H1Span';
import LastTickets from "../../components/lastTickets/LastTickets.tsx";
import TicketsService from "../../services/TicketsService.tsx";
import {Ticket, TicketLog} from "../../models/Ticket.ts";
import {handleClick} from "../../services/automationService.tsx"

const Seller: React.FC = () => {

  const [ticketData, setTicketData] = useState<TicketLog[]>([]);
  const [ticketsQntd, setTicketsQntd] = useState<number>(1);
  const [itsLoading, setItsLoading] = useState(false);
  const [qrCodeSrc, setQrCodeSrc] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<Record<string, string> | null>(null);
  const [showBackBtn, setShowBackBtn] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_PERSISTENCE_API
  const postDataUrl = `${apiUrl}/tickets/`;
  console.log(postDataUrl)

  const ticketValue = 2.5;

  const { service, station } = useLocation().state || {}

  const baseUrl = "https://pagtesouro.tesouro.gov.br/portal-gru/#/pagamento-gru";
  const params = {
    orgao: "29214",
    ug: "275079",
    servico: service,
    cpfCnpjContribuinte: "42357483001017",
    nomeContribuinte: "CBTU",
    numeroReferencia: "2024",
    competencia: "",
    vencimento: moment().format("YYYY-MM-DD"),
    valorPrincipal: `${ticketValue*ticketsQntd}`,
    descontosAbatimentos: "",
    moraMulta: "",
    jurosEncargos: ""
  };

  useEffect(() => {
    if(qrCodeSrc){
      const interval = setInterval(() => {
        setShowBackBtn(true);
        clearInterval(interval);
      }, 120 * 1000);
    }
  }, [qrCodeSrc]);

  useEffect(() => {
    const ticketService: TicketsService = new TicketsService();

    const loadTickets = async () => {
      const ticketData = await ticketService.getAllTickets();
      console.log('ticketData:',ticketData)
      const ticketsTransformed = ticketTransform(ticketData);
      setTicketData(ticketsTransformed);
    };

    loadTickets();
  }, []);

  function ticketTransform(ticketData: Ticket[]):TicketLog[]{
    const tickets = ticketData.slice(-3)
    const ticketsTransformed:TicketLog[] = [];
    tickets.forEach((ticket) => {
      ticketsTransformed.push({quantidade: +ticket.valor/ticketValue, valor: ticket.valor, data: moment().format("DD-MM-YYYY") });
    })
    
    return ticketsTransformed;
  }

  return (
    <div className="container">
      <H1Span>{station}</H1Span>
      <H1Span>
        <span className={'infoTickets'}>Passagens: {ticketsQntd}</span>
        <br/>
        <span className={'infoTickets'}>Valor: R${(ticketsQntd*ticketValue).toFixed(2)}</span>
      </H1Span>
      {itsLoading && !error && <TrainLoading></TrainLoading>}
      {error && lastParams && (
        <ErrorNotification message={error} onRetry={
          () => handleClick({
            params,
            baseUrl,
            setQrCode: setQrCodeSrc,
            setError,
            setItsLoading,
            setLastParams,
            postUrl: postDataUrl,
            setTicketData,
            setPaymentStatus,
            ticketValue,
            ticketData
          })
        }
        />
      )}
      {!itsLoading && !qrCodeSrc && (
        <>
          <button className="button inteira" onClick={
            () =>  handleClick({
              params,
              baseUrl,
              setQrCode: setQrCodeSrc,
              setError,
              setItsLoading,
              setLastParams,
              postUrl: postDataUrl,
              setTicketData,
              setPaymentStatus,
              ticketValue,
              ticketData
            })
          }>Passagem Inteira</button>
          <div className={"passagem-quantidade"}>
            <div className={"btn-minus"} onClick={()=>{if(ticketsQntd>0)setTicketsQntd(ticketsQntd-1)}}>-</div>
            <div className={"ticketsQntd"}>{ticketsQntd}</div>
            <div className={"btn-plus"} onClick={()=>{setTicketsQntd(ticketsQntd+1)}}>+</div>
          </div>
          {/*{false && (<button className={"button meia"} onClick={() => { handleClick(params2); setFullOrHalfPriceTicket("Meia Passagem") }}>Passagem Meia</button>)}*/}
        </>
      )}
      {/*{false && qrCodeSrc && fullOrHalfPriceTicket && <H1Span>{fullOrHalfPriceTicket}</H1Span>}*/}
      {paymentStatus !== 'Pagamento realizado. Agradecemos a confiança!' && qrCodeSrc && (
        <img src={qrCodeSrc} alt="QR Code" className="qr-code" />
      )}
      {paymentStatus && (
        <p className='paymentStatus'>{paymentStatus}</p>
      )}
      {((paymentStatus && showBackBtn) || error) && <button className='backHomeBtn' onClick={() => { window.location.reload() }}>voltar</button>}
      <div className={'last-tickets'}>
        <LastTickets tickets={ticketData}></LastTickets>
      </div>
    </div>
  );
}

export default Seller;
