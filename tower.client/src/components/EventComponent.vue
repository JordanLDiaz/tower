<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="eventImg-card elevation-5 m-3">
      <img :src="event.coverImg" alt="" class="img-fluid selectable">
      <div class="text-center">
        <div class="text-light">{{ event.name }}</div>
        <div class="text-white">{{ event.location }}</div>
        <div class="text-white">{{ new Date(event.startDate).toLocaleDateString(`en-US`) }}</div>
        <div v-if="event?.isCanceled" class="text-dark bg-danger fw-bold">Event Canceled</div>
        <div v-if="event?.capacity == 0" class="text-dark bg-danger fw-bold">Event Full</div>
        <div v-else-if="event?.capacity > 0 && !event?.isCanceled" class="text-white"><span class="text-primary">{{
          event.capacity
        }}</span> spots left </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

export default {
  props: {
    event: { type: Object, required: true }
  },

  setup() {

    return {}
  }
};
</script>


<style lang="scss" scoped>
.eventImg-card {
  border: 2pt solid #FFD464;
  height: 40vh;
}

img {
  height: 25vh;
  min-width: auto;
  background-size: contain;
  background-position: center;
}
</style>