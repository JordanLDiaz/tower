<template>
  <div class="row p-1">
    <div class="col-2">
      <img :src="comment.creator.picture" alt="" class="img-fluid account-pic rounded">
    </div>
    <div class="col-10">
      <div class="card p-2 m-1 text-dark">
        <h5> {{ comment.creator.name }} </h5>
        <p>{{ comment.body }}</p>
        <div @click.prevent="deleteComment(comment.id)" class="text-end">
          <button v-show="comment.creatorId == account.id" class="btn btn-danger bg-danger">
            <i class="mdi mdi-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  props: {
    comment: { type: Object, required: true }
  },

  setup(props) {
    const route = useRoute();

    return {
      route,
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),

      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this comment?', 'This cannot be undone'))
            await commentsService.deleteComment(commentId)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.account-pic {
  border-radius: 50%;
}
</style>