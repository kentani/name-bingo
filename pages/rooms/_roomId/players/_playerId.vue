<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="'/rooms/' + this.roomId + '/players/' + this.playerId + '/bingo-card'">Card</v-tab>
      <v-tab class="font-weight-bold" :to="'/rooms/' + this.roomId + '/players/' + this.playerId + '/profile'">Profile</v-tab>
      <v-tab class="font-weight-bold" :to="'/rooms/' + this.roomId + '/players/' + this.playerId + '/info'">Info</v-tab>
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
  created () {
  },
  computed: {
    roomId() {
      return this.$route.params.roomId
    },
    playerId() {
      return this.$route.params.playerId
    },
  },
  methods: {
  }
}
</script>