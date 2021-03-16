<template>
  <v-row justify="center" class="my-6 py-6">
    <v-col cols="12">
      <v-card flat color="grey lighten-4" class="my-6 py-6">
        <p
          class="pt-6 mt-6 display-4 font-weight-bold text-center dark--text">
          Name Bingo
        </p>
        <p class="body-4 text-center" style="white-space: pre-line;">
          名前ビンゴゲームを開催できる無料のウェブアプリです。
          ユーザー登録なしで利用できます。
        </p>
        <v-card-actions class="mx-2">
          <v-row justify="center" class="my-6">
            <v-btn
              v-if="!loggedIn"
              dark
              rounded
              x-large
              color="deep-purple"
              :ripple="false"
              @click="login2">
              ユーザー登録なしで利用する
            </v-btn>
            <v-btn
              v-else
              nuxt
              text
              rounded
              x-large
              color="deep-purple"
              :ripple="false"
              to="/my/account">
              <span class="font-weight-bold">アカウント設定</span>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card flat color="grey lighten-4" class="mt-6 pt-6">
        <p
          class="display-1 font-weight-bold text-center dark--text">
          How to use
        </p>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-card flat>
        <p
          class="py-2 my-0 yellow accent-4 title font-weight-bold text-center">
          事前準備
        </p>
        <v-card-text>
          <div class="body-1 py-2">① ゲストユーザーでログイン</div>
          <div class="body-1 py-2">② 部屋を作成</div>
          <div class="body-1 py-2">③ 部屋のURLを共有</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-card flat>
        <p
          class="py-2 my-0 yellow accent-4 title font-weight-bold text-center">
          ゲーム開始
        </p>
        <v-card-text>
          <div class="body-1 py-2">④ プロフィールカードを作成</div>
          <div class="body-1 py-2">⑤ ビンゴカードを作成</div>
          <div class="body-1 py-2">⑥ ゲーム開始！</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'root',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'イベント1',
          to: '/rooms/IxkeDXeR97ono2Y3tsnA/admin/bingo'
        },
      ]
    }
  },
  created () {
    this.$store.dispatch('onAuth')
  },
  mounted () {
  },
  computed: {
    authUser () {
      return this.$store.getters.getAuthUser
    },
    loggedIn () {
      return this.$store.getters.getLoggedIn
    },
    authUserId () {
      return this.$store.getters.getAuthUserId
    }
  },
  methods: {
    handleCreateButtonClick (args) {
      this.$store.dispatch('login', { name: args.name })
    },
    login2 (args) {
      this.$store.dispatch('login', { name: 'ゲストユーザー' })
    },
  }
}
</script>
