import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.archiveEvent)
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query.page)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getAll({ eventId: req.params.eventId })
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getAllComments({ eventId: req.params.eventId })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      const edited = await eventsService.editEvent(req.params.eventId, req.body, req.userInfo.id)
      return res.send(edited)
    } catch (error) {
      next(error)
    }
  }

  async archiveEvent(req, res, next) {
    try {
      const message = await eventsService.archiveEvent(req.params.eventId, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}