<template>
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Event</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createEvent()">
          <div class="modal-body m-2">
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="Event Name"
                required>
              <label for="name">Event Name</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.description" type="text" class="form-control" id="description"
                placeholder="Description" required>
              <label for="description">Event Description</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.location" type="text" class="form-control" id="location"
                placeholder="Event Location" required>
              <label for="location">Event Location</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.startDate" type="date" class="form-control" id="startDate"
                placeholder="Event Start Data" required>
              <label for="startDate">Event Start Date</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.capacity" type="number" class="form-control" id="capacity"
                placeholder="Event Capacity" required>
              <label for="capacity">Event Capacity</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" placeholder="Cover Image"
                required>
              <label for="coverImg">Cover Image</label>
            </div>
            <div class="form-floating elevation-5 mb-2">
              <select v-model="editable.type" class="form-select" id="floatingSelect"
                aria-label="Floating label select example">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="digital">Digital</option>
                <option value="exhibit">Exhibit</option>
                <option value="expo">Expo</option>
                <option value="sport">Sport</option>
              </select>
              <label for="floatingSelect">Event Type</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary bg-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary bg-primary">Add event</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          // logger.log(editable.value)
          const event = await eventsService.createEvent(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#eventModal').hide()
          router.push({ name: 'Event', params: { eventId: event.id } })
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

</style>