<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card>
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          Add room
        </p>
        <v-card-actions class="py-3 mx-2">
        <v-spacer />
          <v-btn
            readonly
            dark
            depressed
            rounded
            small
            color="deep-purple lighten-4"
            :ripple="false">
            ログイン済み
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="caption font-weight-bold pb-0">部屋を作成する</v-card-title>
        <v-card-text class="py-0">
          <basic-form
            text="作成する"
            placeholder="部屋の名前を入力してください"
            @create-button-click="handleCreateButtonClick" />
          <room-info :room="room" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'top',
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