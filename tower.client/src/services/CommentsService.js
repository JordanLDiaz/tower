import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[GET COMMENTS BY EVENT ID]', res.data)
    AppState.comments = res.data
  }
}
export const commentsService = new CommentsService();