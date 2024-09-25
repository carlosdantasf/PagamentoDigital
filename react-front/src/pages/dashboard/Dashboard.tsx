import { useEffect, useState } from 'react';
import { Ticket } from '../../models/Ticket';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import DateFilter from '../../components/filters/DateFilter';
import TicketsService from "../../services/TicketsService";
import { useFilter } from '../../context/FilterContext';

const Dashboard = () => {
    const { startDate, endDate } = useFilter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sumTicketsPrice, setSumTicketsPrice] = useState<string>("");

    const dateTransform = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const timeTransform = (dateString: string) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        const ticketsService = new TicketsService();
        const fetchTickets = async () => {
            ticketsService.getAllTickets()
                .then(currentTickets => {
                    setTickets(currentTickets);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Failed to fetch tickets');
                    setLoading(false);
                });
        };
        fetchTickets();
    }, []);

    useEffect(() => {
        const filtered = tickets.filter(ticket => {
            const date = new Date(ticket.dataConfirmacaoPagamento);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
        setFilteredTickets(filtered);
    }, [tickets, startDate, endDate]);

    useEffect(() => {
        setSumTicketsPrice(sumTickets(filteredTickets));
    }, [filteredTickets]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Relatório de passagens vendidas</h1>
            <DateFilter />
            <h2 className="ticketsSum">{`Soma do valor no período: ${sumTicketsPrice}`}</h2>
            <div className="table-container">
                <table className="ticket-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Data de Pagamento</th>
                        <th>Hora de Pagamento</th>
                        <th>Valor Pago</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>
                                <Link to={`/tickets/${ticket.id}`} style={{ textDecoration: 'none' }}>
                                    {ticket.id}
                                </Link>
                            </td>
                            <td>{ticket.descricao}</td>
                            <td>{dateTransform(ticket.dataConfirmacaoPagamento)}</td>
                            <td>{timeTransform(ticket.createdAt)}</td>
                            <td>{ticket.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function sumTickets(tickets: Ticket[]) {
    let sum = 0;
    tickets.forEach((ticket) => {
        sum += ticket.valor;
    });
    return sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default Dashboard;