import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[GET COMMENTS BY EVENT ID]', res.data)
    AppState.comments = res.data
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('[POSTING COMMENT]', res.data)
    AppState.comments.unshift(res.data)
    return res.data
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('[DELETING COMMENT]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}
export const commentsService = new CommentsService();