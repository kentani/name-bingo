<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="900">
      <v-card>
        <v-card-title class="font-weight-bold">Add new</v-card-title>
        <v-divider class="mx-4" />
        <v-card-text class="pa-2">
          <v-card flat>
            <v-card-text>
              <v-text-field
                filled
                label="イベント名"
                :disabled="finished"
                color="deep-purple"
                v-model="inputName" />
              <v-textarea
                filled
                label="メッセージ"
                :disabled="finished"
                color="deep-purple"
                v-model="inputMessage" />
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions>
          <v-spacer />
          <div v-if="!finished">
            <v-btn
              text
              nuxt
              rounded
              to="/my/account">
              Close
            </v-btn>
            <v-btn
              rounded
              dark
              color="deep-purple"
              @click="handleCreateButtonClick">
              Save
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              rounded
              text
              nuxt
              color="deep-purple"
              :to="'/rooms/' + room.id + '/admin/settings'">
              <span class="font-weight-bold">部屋に入る</span>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: 'top',
  data () {
    return {
      dialog: true,
      inputName: '',
      inputMessage: '',
      finished: false
    }
  },
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
    handleCreateButtonClick () {
      this.$store.dispatch('createRoom', { name: this.inputName, message: this.inputMessage, user: this.userInfo })
      this.finished = true
    },
    setUserInfo() {
    },
  }
}
</script>