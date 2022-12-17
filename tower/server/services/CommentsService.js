import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class CommentsService {
  async getAllComments(query) {
    const comments = await dbContext.Comments.find(query).populate('creator')
    return comments
  }
  async createComment(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }
  async removeComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)

    // const event = await eventsService.getEventById(comment.eventId)
    // if (!comment) throw new BadRequest(`No comment at id: ${commentId}`)
    if (comment.creatorId != userId) throw new Forbidden("You cannot remove other users' comments")
    comment.remove()
    return comment
  }

}

export const commentsService = new CommentsService();