
import { Request, Response } from 'express';

const createTicket = require('./../useCases/Ticket/CreateTicket/CreateTicket')
const showAllTickets = require('./../useCases/Ticket/FindAllTickets/FindAll')
const findTicket = require('./../useCases/Ticket/FindTicket/FindTicket')
// Exemplo de controlador para operações básicas

export default class ticketsController {

  public getAllTickets = async (req: Request, res: Response) => {
    try {
      const tickets = await showAllTickets();
      res.status(200).json(tickets)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public getTicketById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const ticket = await findTicket(userId);
    res.send(ticket)
  };

  public createTicket = async (req: Request, res: Response) => {
    try {
      const newTicket = createTicket(req.body)
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public updateTicket = (req: Request, res: Response) => {
    const userId = req.params.id;
    // Lógica para atualizar um usuário pelo ID
    res.send(`Usuário com ID ${userId} atualizado`);
  };

  public deleteTicket = (req: Request, res: Response) => {
    const userId = req.params.id;
    // Lógica para deletar um usuário pelo ID
    res.send(`Usuário com ID ${userId} deletado`);
  };
}