<template>
  <div class="eventImg-card elevation-5 m-3">
    <img
      src="https://images.unsplash.com/photo-1493225774800-a08bb7034783?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
      alt="" class="img-fluid">
    <div class="text-center">
      <div>event.name</div>
      <div>event.location</div>
      <div>event.startDate</div>
      <div>event.capacity</div>
    </div>
  </div>
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
  border: 3pt solid #FFD464;
}
</style>