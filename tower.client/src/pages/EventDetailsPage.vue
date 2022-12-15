<template>
  <!-- SECTION Single Event Card-->
  <section class="container-fluid">
    <div class="row detail-card elevation-5 m-2 p-5 bg-dark-lighten rounded">
      <div v-if="event" class="col-4">
        <img :src="event?.coverImg" alt="" class="img-fluid p-3">
      </div>
      <div class="col-8 text-light">
        <div class="row justify-content-between">
          <div class="col-5 p-2">
            <h3> {{ event?.name }}</h3>
            <h5>{{ event?.location }}</h5>
          </div>
          <div class="col-3">
            <h4>{{ new Date(event?.startDate).toLocaleDateString(`en-US`) }}</h4>
            <h5>Starting at 9:00 am</h5>
          </div>
        </div>
        <div class="row p-2">
          <p>{{ event?.description }}</p>
        </div>
        <div class="row">
          <div class="col-2">
            <h5 class="div">
              <span class="text-warning">{{ event?.capacity }}</span> spots left
            </h5>
          </div>
          <div class="col-3">
            <button class="btn btn-warning bg-warning">Attend <span class="mdi mdi-human"></span></button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION Who is attending -->
  <section class="container-fluid">
    <div class="row m-2 mt-3">
      <h5 class="text-dark-lighten">See who is attending</h5>
    </div>
    <div class="row attendee-card elevation-5 m-2 my-3 p-5 bg-dark-lighten rounded">
    </div>
  </section>

  <!-- SECTION Comments -->
  <section class="container">
    <div class="row">
      <h5 class="text-dark-lighten">What are people saying</h5>
    </div>
    <div class="row comment-card elevation-5 m-2 p-3 bg-dark-lighten rounded">
      <div class="row">
        <h5 class="text-success"> Join the conversation </h5>
        <form>
          <div class="form-group ">
            <label for="commentField"></label>
            <textarea class="form-control" id="commentField" rows="4">Tell the people...</textarea>
            <button class="mt-3 btn btn-success bg-success">Post comment</button>
          </div>
        </form>
      </div>

      <div class="row mt-4">
        <!-- <div v-for="c in comments" class="col-12">
          <CommentCard :comment="c" />
        </div> -->
        <div class="col-12">
          <div class="row">
            <div class="col-2">
              <img src="https://thiscatdoesnotexist.com" alt="" class="img-fluid account-pic rounded">
            </div>
            <div class="col-10">
              <div class="card p-2 m-1 text-dark">
                <h5> Attendee Name </h5>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae nisi harum, temporibus reiciendis
                  facilis, placeat quae non ab odio labore tempore officiis asperiores doloremque tempora voluptates
                  exercitationem accusamus. Quod, delectus!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js"
import { useRoute } from "vue-router";

export default {

  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById();
      getCommentsByEventId();
    })

    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments)
    }
  }
};
</script>


<style lang="scss" scoped>
.detail-card {
  background-color: #56C7FB;
  border: 2pt solid #FFD464;
}

.attendee-card,
.comment-card {
  background-color: #56C7FB;
  border: 2pt solid #FFD464;
}
</style>