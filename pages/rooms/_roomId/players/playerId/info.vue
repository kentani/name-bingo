<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card>
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          Info
        </p>
        <v-card-actions class="py-2 mx-2">
          <v-btn
            nuxt
            text
            color="deep-purple"
            :to="'/rooms/' + this.roomId + '/admin/settings'"
            :ripple="false">
            <span class="font-weight-bold">管理者画面</span>
            <v-icon right>mdi-call-made</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="isJoinedRoom"
            nuxt
            rounded
            outlined
            color="deep-purple"
            :ripple="false"
            @click="">
            参加をやめる
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
        <v-divider class="mx-4" />
        <v-card-title class="headline font-weight-bold">{{ room.name }}</v-card-title>
        <v-card-subtitle>みんなで楽しみましょう！</v-card-subtitle>
        <v-card-subtitle class="font-weight-bold">
          <v-badge
            offset-y="16"
            offset-x="-4"
            color="deep-purple"
            content="6">
            参加者
          </v-badge>
        </v-card-subtitle>
        <v-divider class="mx-4" />
        <v-card-text>
          <chip-list :items="room.joinedUserList" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'room',
    data () {
      return {
        dialog: false,
        switch1: false,
        inputName: '',
        inputProfile: '',
        inputMessage: '',
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