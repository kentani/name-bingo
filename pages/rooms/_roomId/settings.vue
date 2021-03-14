<template>
  <v-card>
    <v-card-title class="headline font-weight-bold">{{ room.name }}</v-card-title>
    <v-card-subtitle class="py-0">みんなで楽しみましょう！</v-card-subtitle>
    <v-card-actions class="py-0 mx-2">
      <v-btn
        v-if="isJoinedRoom"
        text
        nuxt
        large
        color="red"
        class="px-0"
        :ripple="false"
        @click="">
        参加をやめる
      </v-btn>
      <v-btn
        v-else
        text
        large
        color="deep-purple"
        class="px-0"
        :ripple="false"
        @click="handleJoinButtonClick">
        参加する
      </v-btn>
    </v-card-actions>
    <v-card-actions class="py-0 mx-2">
      <v-btn
        text
        nuxt
        large
        color="deep-purple"
        class="px-0"
        :disabled="!isJoinedRoom"
        :ripple="false"
        :to="'/rooms/' + roomId + '/players/' + userInfo.id + '/bingo-card'">
        ビンゴカードを見る
      </v-btn>
      <v-btn
        text
        nuxt
        large
        color="deep-purple"
        class="px-0"
        :disabled="!isJoinedRoom"
        :ripple="false"
        :to="'/rooms/' + roomId + '/bingo'">
        ルーレット部屋に行く
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