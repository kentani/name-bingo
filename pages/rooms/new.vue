<template>
  <v-card flat>
    <v-card-title class="mt-2 mb-6 font-weight-bold">新しく部屋を作成する</v-card-title>
    <v-card-text>
      <room-form @create-button-click="handleCreateButtonClick" />
      <room-info :room="room" />
    </v-card-text>
  </v-card>
</template>

<script>
import roomInfo from '../../components/room-info.vue'
export default {
  components: { roomInfo },
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  computed: {
    isLogind() {
      return this.$store.getters.getIsLogind
    },
    userId() {
      return this.$store.getters.getUserId
    },
    room() {
      return this.$store.getters.getRoom
    }
  },
  methods: {
    handleCreateButtonClick (args) {
      this.$store.dispatch('createRoom', { name: args.name, userId: this.userId })
    },
  }
}
</script>