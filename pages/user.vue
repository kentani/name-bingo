<template>
  <v-card>
    <v-row no-gutters class="mt-2 mb-0">
      <v-col cols="8" align="center">
        <v-card-title class="mt-2 headline font-weight-bold">{{ userInfo.name }}</v-card-title>
      </v-col>
      <v-col cols="4" align="center">
        <v-btn
          text
          nuxt
          x-large
          class="my-2"
          color="red"
          :ripple="false"
          @click="logout">
          ログアウト
        </v-btn>
      </v-col>
    </v-row>
    <v-card-subtitle>{{ userInfo.id }}</v-card-subtitle>
    <v-card-subtitle>作成した部屋</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <link-list :items="userInfo.createdRoomList" />
    </v-card-text>
    <v-card-subtitle>参加した部屋</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <link-list :items="userInfo.joinedRoomList" />
    </v-card-text>
    <v-card-subtitle>このサイトについて</v-card-subtitle>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <link-list :with-icon="true" :items="appItems" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'room',
  data () {
    return {
      appItems: [
        {
          icon: 'mdi-apps',
          name: 'ビンゴの始め方',
          to: '/'
        },
        {
          icon: 'mdi-note',
          name: '利用規約',
          to: '/'
        },
        {
          icon: 'mdi-github',
          name: 'ソースコード',
          to: '/'
        },
      ]
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
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
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>