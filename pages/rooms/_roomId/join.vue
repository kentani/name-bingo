<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="900">
      <v-card>
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          Join
        </p>
        <v-card-actions class="py-2 mx-2">
          <v-spacer />
          <v-btn
            v-if="isJoinedRoom"
            nuxt
            rounded
            text
            small
            color="deep-purple"
            :to="'/rooms/' + roomId + '/players/' + userInfo.id + '/bingo-card'"
            :ripple="false">
            <span class="font-weight-bold">部屋に入る</span>
          </v-btn>
          <v-btn
            v-else
            rounded
            dark
            small
            color="deep-purple"
            :ripple="false"
            @click="handleJoinButtonClick">
            参加する
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold">{{ room.name }}</v-card-title>
        <v-card-subtitle class="pb-0" style="white-space: pre-line;">{{ room.message }}</v-card-subtitle>
        <v-card-title class="caption font-weight-bold pb-0">
          <v-badge
            offset-y="17"
            offset-x="-5"
            color="deep-purple"
            :content="room.joinedUserList ? room.joinedUserList.length : 0">
            参加者
          </v-badge>
        </v-card-title>
        <v-card-text class="py-0">
          <chip-list :items="room.joinedUserList" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: 'join',
  data () {
    return {
      dialog: true,
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
    this.$store.dispatch('fetchRoom', { roomId: this.roomId })
  },
  mounted () {
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
    isJoinedRoom() {
      let val = false
      if (this.room.joinedUserList) {
        val = this.room.joinedUserList.filter(v => v).some(el => el.id === this.userInfo.id)
      }
      return val
    },
  },
  methods: {
    handleJoinButtonClick() {
      this.$store.dispatch('joinRoom', { user: this.userInfo, roomId: this.roomId })
    },
  }
}
</script>