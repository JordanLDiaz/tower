import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class TicketsService {
  async getAll(query) {
    const tickets = await dbContext.Tickets.find(query).populate('profile')
    return tickets
  }

  async createTicket(body) {
    const event = await eventsService.getEventById(body.eventId)
    if (event.isCanceled) throw new Forbidden("Can't modify a canceled event")
    if (event.capacity == 0) throw new BadRequest('No more tickets remaining')
    const ticket = await dbContext.Tickets.create(body)
    // @ts-ignore
    event.capacity -= 1
    await event.save()
    await ticket.populate('profile event')
    return ticket
  }
  async getMyTickets(accountId) {
    const myTickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return myTickets
  }
  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)

    const event = await eventsService.getEventById(ticket.eventId)
    if (!ticket) throw new BadRequest(`No ticket at id: ${ticketId}`)
    if (ticket.accountId.toString() != userId) throw new Forbidden('Not your ticket')
    if (event.isCanceled) throw new Forbidden("Can't get ticket for canceled event")

    await ticket.remove()
    // @ts-ignore
    event.capacity += 1
    await event.save()
    return ticket
  }

}
export const ticketsService = new TicketsService();