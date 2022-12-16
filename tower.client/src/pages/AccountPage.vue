<template>
  <!-- SECTION My Events Component -->
  <section class="container-fluid">
    <div class="row m-5">
      <div class="col-12">
        <h3 class="text-success">My Events</h3>
      </div>
    </div>
    <div class="row m-5">
      <!-- <div v-for="e in events" class="col-12 col-md-3">
          <EventComponent :event="e" />
        </div> -->
    </div>
  </section>

  <!-- SECTION My Event Tickets -->
  <section class="container-fluid">
    <div class="row m-5">
      <div class="col-12">
        <h3 class="text-success">My Upcoming Events</h3>
      </div>
    </div>
    <div class="row ticket elevation-5 m-5 bg-dark-lighten rounded">
      <div class="col-12 d-flex justify-content-start">
        <img src="https://thiscatdoesnotexist.com" alt="" class="img-fluid">
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

export default {
  setup() {

    // async function getEvents() {
    //   try {
    //     await eventsService.getAllEvents();
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.error(error)
    //   }
    // }

    onMounted(() => {
      // getEvents();
    })
    return {
      // event: computed(() => AppState.events),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.ticket {
  height: 25vh;
  width: 75vh;
  border: 2pt solid #FFD464
}
</style>
