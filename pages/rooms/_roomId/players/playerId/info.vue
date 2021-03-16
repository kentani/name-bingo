<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-actions class="py-3 mx-2">
          <v-btn
            nuxt
            text
            rounded
            small
            color="deep-purple"
            :disabled="!room.adminList.some(el => el.id === this.userInfo.id)"
            :to="'/rooms/' + this.roomId + '/admin/settings'"
            :ripple="false">
            <span class="font-weight-bold">管理画面へ</span>
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="isJoinedRoom"
            nuxt
            rounded
            dark
            small
            color="red darken-4"
            :ripple="false"
            @click="unJoin">
            参加をやめる
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
            :content="room.joinedUserList.length">
            参加者
          </v-badge>
        </v-card-title>
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
      unJoin() {
        
      }
    }
  }
</script>