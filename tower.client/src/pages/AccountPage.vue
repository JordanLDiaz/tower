<template>
  <!-- SECTION My Events Component -->
  <section class="container-fluid">
    <div class="row m-5">
      <div class="col-12">
        <h3 class="text-success">My Events</h3>
      </div>
    </div>
    <div class="row m-5">
      <div v-for="m in myTickets" class="col-12 col-md-3">
        <MyTicket :event="m.event" />
      </div>
    </div>
  </section>

  <!-- SECTION My Event Tickets -->
  <!-- <section class="container-fluid">
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
  </section> -->
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { accountService } from "../services/AccountService.js";

export default {

  setup() {

    async function getMyTickets() {
      try {
        await accountService.getMyTickets();
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getMyTickets();
    })
    return {
      events: computed(() => AppState.events),
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
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
