import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async createEvent(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }
  async getAllEvents(page) {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }
  async getEventById(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) throw new BadRequest(`No event by id: ${id}`)
    return event
  }

  async editEvent(eventId, eventData) {
    const event = await dbContext.Events.findById(eventId)
    if (event.isCanceled) throw new BadRequest('Cannot edit a canceled event')
    if (!event) throw new BadRequest(`No event at this id: ${eventId}`)
    // @ts-ignore
    if (event.creatorId.toString != userId) throw new Forbidden("Cannot edit event that you did not create")
    event.name = eventData.name ? eventData.name : event.name
    event.description = eventData.description ? eventData.description : event.description
    event.coverImg = eventData.coverImg ? eventData.coverImg : event.coverImg
    event.location = eventData.location ? eventData.location : event.location
    event.capacity = eventData.capacity ? eventData.capacity : event.capacity
    event.startDate = eventData.startDate ? eventData.startDate : event.startDate
    event.type = eventData.type ? eventData.type : event.type
    await event.save()
    return event
  }
  async archiveEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    // NOTE tostring changes object to string so matches userId and is able to be compared w/it
    if (event.creatorId.toString() != userId) throw new Forbidden('This is not your event to archive')
    // if (event.isCanceled) throw new BadRequest(`No event at this id: ${eventId}`)
    event.isCanceled = true
    await event.save()
    return `Canceled ${event.name}`
  }

}

export const eventsService = new EventsService