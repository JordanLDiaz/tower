<template>
  <!-- SECTION Single Event Card-->
  <section class="container-fluid">
    <div class="row detail-card elevation-5 m-3 p-5 bg-dark-lighten rounded">
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
            <button v-if="event?.capacity == 0" class="fs-5 m-1 btn btn-primary bg-primary text-dark" disabled>Event
              Full</button>
            <button v-if="event?.isCanceled" class="m-1 btn btn-success bg-success text-dark" disabled>Event
              Canceled</button>
            <button v-if="event?.capacity > 0 && !event.isCanceled && account.id && !foundMe" @click="createTicket()"
              class="m-1 btn btn-warning bg-warning"> Attend <span class="mdi mdi-human"></span>
            </button>
            <button v-else-if="account.id && foundMe" @click="removeTicket(foundMe.id)"
              class="m-1 btn btn-danger bg-danger"><span class="mdi mdi-account-cancel"> Unattend</span>
            </button>
          </div>
          <div class="col-4">
            <button v-if="account.id == event?.creatorId && !event?.isCanceled" class="btn btn-success bg-success p-2"
              data-bs-toggle="modal" data-bs-target="#updateEventModal"><i class="mdi mdi-pen"> Update Event
                Details</i></button>
          </div>
          <div class="col-3">
            <button v-if="account.id == event?.creatorId && !event?.isCanceled" class="btn btn-danger bg-danger p-2"
              @click="archiveEvent(event.id)"><span class="mdi mdi-cancel"> Cancel Event</span></button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION Who is attending -->
  <section class="container-fluid">
    <div class="row m-3 mt-3">
      <h5 class="text-primary">See who is attending</h5>
    </div>
    <div class="row attendee-card elevation-5 m-3 my-3 p-5 bg-dark-lighten rounded">
      <div class="col-12">
        <img v-for="a in attendees" :key="a.id" :src="a.profile?.picture" :title="a.profile?.name" alt=""
          class="img-fluid p-2">
      </div>
    </div>
  </section>

  <!-- SECTION Comments -->
  <section class="container">
    <div class="row">
      <h5 class="text-primary">What are people saying</h5>
    </div>
    <div class="row comment-card elevation-5 m-2 p-3 bg-dark-lighten rounded">
      <div class="row">
        <h5 class="text-success"> Join the conversation </h5>
        <form @submit.prevent="createComment()">
          <div class="form-group ">
            <label for="commentField"></label>
            <textarea type="text" class="form-control" id="commentField" rows="4" required
              v-model="editable.body">Tell the people...</textarea>
          </div>
          <div>
            <button type="submit" class="mt-3 btn btn-success bg-success">Post
              comment</button>
          </div>
        </form>
      </div>

      <div class="row mt-4">
        <div v-for="c in comments" class="col-12">
          <CommentCard :comment="c" />
        </div>
      </div>
    </div>
  </section>
  <ModalComponent id="updateEventModal">
    <UpdateEventModal />
  </ModalComponent>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";
import { attendeesService } from "../services/AttendeesService.js"
import { useRoute } from "vue-router";

export default {
  // props: {
  //   event: { type: Object, required: true },
  //   comment: { type: Object, required: true }
  // },

  setup() {
    const editable = ref({});
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

    async function getAttendeesByEventId() {
      try {
        await attendeesService.getAttendeesByEventId(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getAttendeesByEventId();
    })

    return {
      editable,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      foundMe: computed(() => AppState.attendees.find(a => a.accountId == AppState.account.id)),

      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId })
          Pop.success('Ticket received!')
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async removeTicket(ticketId) {
        try {
          if (await Pop.confirm()) {
            await attendeesService.removeTicket(ticketId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async archiveEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event?')) {
            await eventsService.archiveEvent(eventId)
            Pop.success('Event has been canceled')
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async createComment() {
        try {
          editable.value.eventId = route.params.eventId
          await commentsService.createComment(editable.value)
          editable.value = {}
          Pop.toast('Created comment', "success")
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