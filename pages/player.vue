<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="{ path: '/player/bingo-card', query: { roomId: roomId, playerId: playerId } }">Card</v-tab>
      <v-tab class="font-weight-bold" :to="{ path: '/player/profile-card', query: { roomId: roomId, playerId: playerId } }">Profile</v-tab>
      <v-tab class="font-weight-bold" :to="{ path: '/player/info', query: { roomId: roomId, playerId: playerId } }">Info</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'protected',
  data () {
    return {
    }
  },
  async created () {
    await this.$store.dispatch('onAuth')
  },
  computed: {
    roomId() {
      return this.$route.query.roomId
    },
    playerId() {
      return this.$route.query.playerId
    },
  },
  methods: {
  }
}
</script>