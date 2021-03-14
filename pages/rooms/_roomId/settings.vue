<template>
  <v-card>
    <v-card-title class="headline font-weight-bold">{{ room.name }}</v-card-title>
    <v-card-subtitle>みんなで楽しみましょう！</v-card-subtitle>
    <v-card-actions class="mx-2">
      <v-btn
        nuxt
        outlined
        rounded
        small
        :disabled="!isJoinedRoom"
        :ripple="false"
        :to="'/rooms/' + roomId + '/players/' + userInfo.id + '/bingo-card'">
        ビンゴカード
      </v-btn>
      <v-btn
        nuxt
        outlined
        rounded
        small
        :disabled="!isJoinedRoom"
        :ripple="false"
        :to="'/rooms/' + roomId + '/bingo'">
        ビンゴルーム
      </v-btn>
      <v-btn
        v-if="isJoinedRoom"
        nuxt
        outlined
        rounded
        small
        color="red"
        :ripple="false"
        @click="">
        参加をやめる
      </v-btn>
      <v-btn
        v-else
        outlined
        rounded
        small
        color="deep-purple"
        :ripple="false"
        @click="handleJoinButtonClick">
        参加する
      </v-btn>
    </v-card-actions>
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
      <chip-list :items="room.joinedUserList" />
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