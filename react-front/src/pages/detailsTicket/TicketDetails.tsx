import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Ticket } from '../../models/Ticket';

const TicketDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const apiUrl = import.meta.env.VITE_PERSISTENCE_API;
    console.log(apiUrl);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                // const response = await axios.get(`http://localhost:3030/tickets/${id}`);
                const response = await axios.get(`${apiUrl}tickets/${id}`);
                setTicket(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch ticket details');
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!ticket) return <p>Ticket not found</p>;

    return (
        <div className="ticket-details">
            <h1>Ticket Details</h1>
            <div className="ticket-details-card">
                <p><strong>ID:</strong> {ticket.id}</p>
                <p><strong>Descrição:</strong> {ticket.descricao}</p>
                <p><strong>Data de Pagamento:</strong> {ticket.dataPagamento}</p>
                <p><strong>Valor:</strong> {ticket.valor}</p>
                <p><strong>Nome do Contribuinte:</strong> {ticket.nomeContribuinte}</p>
                <p><strong>CNPJ do Contribuinte:</strong> {ticket.cnpjContribuinte}</p>
                <p><strong>Forma de Pagamento:</strong> {ticket.formaPagamento}</p>
                <p><strong>Data de Confirmação de Pagamento:</strong> {ticket.dataConfirmacaoPagamento}</p>
                <p><strong>Número de Referência:</strong> {ticket.numeroReferencia}</p>
            </div>
            <button className="back-button" onClick={() => navigate('/tickets-list')}>
                Voltar
            </button>
        </div>
    );
};

export default TicketDetails;
