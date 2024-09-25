const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketsController').default;

const ticketControllerInstance = new ticketController();
// Route to get all tickets
router.get('/', ticketControllerInstance.getAllTickets);
// Route to create a new ticket
router.post('/', ticketControllerInstance.createTicket);
// Route to get a ticket by ID
router.get('/:id', ticketControllerInstance.getTicketById);
// Route to update a todo by ID
/*router.put('/:id', todoController.updateTodo);
// Route to delete a todo by ID
router.delete('/:id', todoController.deleteTodo); */
module.exports = router;