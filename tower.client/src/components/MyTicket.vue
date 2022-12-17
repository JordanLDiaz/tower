<template>
  <router-link :to="{ name: 'Account' }">
    <div class="eventImg-card elevation-5 m-3">
      <img :src="event.coverImg" alt="" class="img-fluid">
      <div class="text-center">
        <div class="text-light">{{ event.name }}</div>
        <div class="text-white">{{ event.location }}</div>
        <div class="text-white">{{ new Date(event.startDate).toLocaleDateString(`en-US`) }}</div>
        <div v-if="event?.isCanceled" class="text-dark bg-danger">Event Canceled</div>
        <div v-if="event?.capacity == 0" class="text-dark bg-danger">Event Full</div>
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
    event: {
      type: Object, required: true
    }
  },

  setup() {
    return {
      account: computed(() => AppState.account),
    }
  }
};
</script>


<style lang="scss" scoped>
.eventImg-card {
  border: 2pt solid #FFD464;
  cursor: default;
}

.eventImg-card:hover {
  border: 2pt solid #FFD464;
  cursor: default;
}
</style>