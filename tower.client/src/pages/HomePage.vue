<template>
  <div class="container-fluid">
    <!-- SECTION  Banner-->
    <section class="row mt-3 justify-content-center">
      <div class="col-12 text-center">
        <img src="../assets/img/Banner.png" alt="banner">
      </div>
    </section>
  </div>

  <div class="container">
    <!-- SECTION Event Type Bar -->
    <section class="row mt-3 justify-content-center">
      <div class="col-12 d-flex elevation-5 rounded justify-content-between bg-dark-lighten">
        <button @click="filterBy = ''" class="btn btn-dark-lighten text-white">All</button>
        <button @click="filterBy = 'concert'" class="btn btn-dark-lighten text-white">Concerts</button>
        <button @click="filterBy = 'convention'" class="btn btn-dark-lighten text-white">Conventions</button>
        <button @click="filterBy = 'digital'" class="btn btn-dark-lighten text-white">Digital</button>
        <button @click="filterBy = 'exhibit'" class="btn btn-dark-lighten text-white">Exhibits</button>
        <button @click="filterBy = 'expo'" class="btn btn-dark-lighten text-white">Expos</button>
        <button @click="filterBy = 'sport'" class="btn btn-dark-lighten text-white">Sports</button>
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
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import EventComponent from "../components/EventComponent.vue";
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const filterBy = ref("");
    async function getEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        }
        else {
          return AppState.events.filter(e => e.type == filterBy.value);
        }
      })
    };
  },
  components: { EventComponent }
}
</script>

<style scoped lang="scss">

</style>
