interface Ticket {
    quantidade: number;
    valor: number;
    data: string; // Exemplo de formato: '2024-09-08T14:30:00'
}

interface LastTicketsProps {
    tickets: Ticket[];
}

const LastTickets = ({ tickets }: LastTicketsProps) => {
    return (
        <div style={styles.container}>
            <h2>Últimas 3 Passagens Pagas</h2>
            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <div key={index} style={styles.ticket}>
                        <p><strong>Quantidade de Tickets:</strong> {ticket.quantidade}</p>
                        <p><strong>Valor Pago:</strong> R${ticket.valor.toFixed(2)}</p>
                        <p><strong>Data e Hora:</strong> {new Date(ticket.data).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>Nenhuma passagem paga.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    ticket: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    },
};

export default LastTickets;
