import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('[GETTING ALL EVENTS]', res.data)
    AppState.events = res.data
  }
  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    logger.log('[GETTING EVENTS BY ID]', res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('[CREATE EVENT]', res.data)
    AppState.events.push(res.data)
    return res.data
  }
}

export const eventsService = new EventsService();