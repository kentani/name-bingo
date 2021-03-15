<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="'/rooms/' + this.roomId + '/admin/roulette'">Roulette</v-tab>
      <v-tab class="font-weight-bold" :to="'/rooms/' + this.roomId + '/admin/settings'">Settings</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'room',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
    this.$store.dispatch('fetchRoom', { roomId: this.roomId })
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getLoggedIn
    },
    authUserId() {
      return this.$store.getters.getAuthUserId
    },
    userInfo() {
      return this.$store.getters.getUserInfo
    },
    roomId() {
      return this.$route.params.roomId
    },
    room() {
      return this.$store.getters.getRoom
    },
    playerId() {
      return this.$route.params.playerId
    },
  },
  methods: {
  }
}
</script>