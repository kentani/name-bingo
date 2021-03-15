<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="'/my/account'">Account</v-tab>
      <v-tab class="font-weight-bold" :to="'/my/add-room'">Add room</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'top',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
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
    }
  },
  methods: {
  }
}
</script>