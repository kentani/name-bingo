<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-actions class="py-3 mx-2">
          <v-spacer />
          <v-btn
            nuxt
            text
            rounded
            color="deep-purple"
            :disabled="!room.adminList.some(el => el.id === this.userInfo.id)"
            :to="'/rooms/' + this.roomId + '/admin/settings'"
            :ripple="false">
            <span class="font-weight-bold">管理画面</span>
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
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
        <v-card-text class="py-0">
          <link-list :with-icon="true" :items="items" />
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
        items: [
        {
          icon: 'mdi-arrow-right',
          name: '参加をやめる',
          to: '/rooms/' + this.roomId + '/invite',
          disabled: false
        },
      ]
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
      isCreater() {
        return this.room.adminList.some(el => el.id === this.playerId)
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