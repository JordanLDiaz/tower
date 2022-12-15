<template>
  <div class="container-fluid">
    <!-- SECTION  Hero-Img/Banner-->
    <section class="row mt-3 justify-content-center">
      <div class="col-11">
        <div class="row p-1" id="hero-img">
          <div class="col-3 mt-3 ms-3">
            <h5 class="text-white">Get ahead of the scalpers.</h5>
            <h5 class="text-white">Reserve your seat now with</h5>
            <h5 class="text-white">real events for real people.</h5>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="container">
    <!-- SECTION Event Type Bar -->
    <section class="row mt-3 justify-content-center">
      <div class="col-11 d-flex elevation-5 rounded justify-content-between bg-dark-lighten">
        <button class="btn btn-dark-lighten text-white">All</button>
        <button class="btn btn-dark-lighten text-white">Concerts</button>
        <button class="btn btn-dark-lighten text-white">Conventions</button>
        <button class="btn btn-dark-lighten text-white">Digital</button>
        <button class="btn btn-dark-lighten text-white">Exhibits</button>
        <button class="btn btn-dark-lighten text-white">Expos</button>
        <button class="btn btn-dark-lighten text-white">Sports</button>
      </div>
    </section>
    <!-- SECTION Event Component -->
    <section class="row">
      <div v-for="e in events" class="col-12 col-md-3">
        <EventComponent :event="e" />
      </div>
    </section>
  </div>

</template>

<script>
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    async function getEvents() {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEvents();
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
#hero-img {
  width: 100%;
  height: 20vh;
  background-image: url(https://images.unsplash.com/photo-1607499699372-7bb722dff7e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGJhY2tncm91bmR8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60);
  background-position: center;
  background-size: cover;
  border-style: solid;
  border-color: #56C7FB;
  // background-repeat: no-repeat;
}
</style>
