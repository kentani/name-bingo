<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="900">
      <v-card>
        <v-card-title class="title font-weight-bold" :class="[ room.message ? 'pb-1' : 'pb-3' ]">{{ room.name }}</v-card-title>
        <v-card-text style="white-space: pre-line;">{{ room.message }}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">
          <v-badge
            offset-y="17"
            offset-x="-5"
            color="deep-purple"
            :content="room.joinedUserList ? room.joinedUserList.length : 0">
            参加者
          </v-badge>
        </v-card-subtitle>
        <v-card-text>
          <chip-list :items="room.joinedUserList" />
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="isJoinedRoom"
            nuxt
            rounded
            text
            color="deep-purple"
            :to="'/rooms/' + roomId + '/players/' + userInfo.id + '/bingo-card'"
            :ripple="false">
            <span class="font-weight-bold">部屋に入る</span>
          </v-btn>
          <v-btn
            v-else
            rounded
            dark
            color="deep-purple"
            :ripple="false"
            @click="handleJoinButtonClick">
            参加する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: 'room',
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