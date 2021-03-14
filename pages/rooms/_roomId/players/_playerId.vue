<template>
  <div>
    <v-tabs
      centered
      color="deep-purple">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab :to="'/rooms/' + this.roomId + '/players/' + this.playerId + '/bingo-card'">ビンゴカード</v-tab>
      <v-tab :to="'/rooms/' + this.roomId + '/players/' + this.playerId + '/profile'">自己紹介</v-tab>
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