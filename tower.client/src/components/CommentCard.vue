<template>
  <div class="row">
    <div class="col-2">
      <img :src="comment.creator.picture" alt="" class="img-fluid account-pic rounded">
    </div>
    <div class="col-10">
      <div class="card p-2 m-1 text-dark">
        <h5> {{ comment.creator.name }} </h5>
        <p>{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {
    comment: { type: Object, required: true }
  },

  setup() {
    return {
      comments: computed(() => AppState.comments)
    }
  }
};
</script>


<style lang="scss" scoped>
.account-pic {
  border-radius: 50%;
}
</style>