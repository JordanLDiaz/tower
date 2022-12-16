import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AttendeesService {
  async getAttendeesByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[GETTING ATTENDEES BY EVENT ID]', res.data)
    AppState.attendees = res.data
  }

  async createTicket(body) {
    const res = await api.post('api/tickets', body)
    logger.log('[CREATE TICKET]', res.data)
    AppState.attendees.push(res.data)
    AppState.myTickets.push(res.data)
    AppState.activeEvent.capacity--
  }

  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log(res.data)
    AppState.attendees = AppState.attendees.filter(a => a.id !== ticketId)
    AppState.myTickets = AppState.myTickets.filter(m => m.id !== ticketId)
    AppState.activeEvent.capacity++
  }
}

export const attendeesService = new AttendeesService();