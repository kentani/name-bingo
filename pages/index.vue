<template>
  <v-row>
    <v-col cols="12">
      <div v-if="loggedIn">
        <v-btn
          readonly
          dark
          depressed
          color="deep-purple deep-purple lighten-4"
          :ripple="false">
          ログイン済み
        </v-btn>
        <div class="caption">ゲストユーザーとしてログイン済み</div>
      </div>
      <div v-else>
        <basic-form
          text="ログインする"
          placeholder="あなたの名前を入力してください"
          @create-button-click="handleCreateButtonClick" />
        <div class="caption">ゲストユーザーとしてログインします</div>
      </div>
    </v-col>
    <v-col cols="12">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      title: 'BINGO',
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'root',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'bingo',
          to: '/rooms/1/bingo'
        },
        {
          icon: 'mdi-apps',
          title: 'join',
          to: '/rooms/1/join'
        },
        {
          icon: 'mdi-apps',
          title: 'players',
          to: '/rooms/1/players/1/bingo-card'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    console.log("aaa", this.authUserId)
  },
  mounted () {
    console.log("aaa", this.authUserId)
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
    }
  }
}
</script>
