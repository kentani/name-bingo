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
          nuxt>
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
          title: 'イベント1',
          to: '/rooms/IxkeDXeR97ono2Y3tsnA/settings'
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
    }
  }
}
</script>
