<template>
  <v-card flat>
    <v-card-title class="mt-2 mb-6 font-weight-bold">新しく部屋を作成する</v-card-title>
    <v-card-text>
      <basic-form
        text="作成する"
        placeholder="部屋の名前を入力してください"
        @create-button-click="handleCreateButtonClick" />
      <room-info :room="room" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('onAuth')
  },
  mounted () {
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
    this.$store.dispatch('clearRoom')
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
    room() {
      return this.$store.getters.getRoom
    }
  },
  methods: {
    handleCreateButtonClick (args) {
      this.$store.dispatch('createRoom', { name: args.name, user: this.userInfo })
    },
  }
}
</script>