<template>
  <v-card>
    <v-card-title class="headline font-weight-bold">{{ room.name }}</v-card-title>
    <v-card-subtitle>みんなで楽しみましょう！</v-card-subtitle>
    <v-row>
      <v-col cols="2" v-if="isJoinedRoom">
        <v-btn
          text
          nuxt
          x-large
          color="deep-purple"
          :ripple="false"
          :to="'/rooms/' + roomId + '/players/' + userInfo.id + '/bingo-card'">
          ビンゴカードを見る
        </v-btn>
      </v-col>
      <v-col cols="2" v-else>
        <v-btn
          text
          x-large
          color="deep-purple"
          :ripple="false"
          @click="handleJoinButtonClick">
          参加する
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          text
          nuxt
          x-large
          color="deep-purple"
          :disabled="!isJoinedRoom"
          :ripple="false"
          :to="'/rooms/' + roomId + '/bingo'">
          ルーレット部屋に行く
        </v-btn>
      </v-col>
    </v-row>
    <v-card-subtitle>作成者</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <chip-list :items="[room.createdUser]" />
    </v-card-text>
    <v-card-subtitle>管理者</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <chip-list :items="room.adminList" />
    </v-card-text>
    <v-card-subtitle>管理者を追加する</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <basic-form
        text="追加する"
        placeholder="追加するユーザーのIDを入力してください"
        :disabled="true"
        @create-button-click="" />
    </v-card-text>
    <v-card-subtitle>参加者</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <chip-list v-if="isJoinedRoom" :items="room.joinedUserList" />
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  layout: 'room',
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