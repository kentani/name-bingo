<template>
  <v-row>
    <v-col cols="12">root</v-col>
    <v-col cols="12">
      <div v-if="isLogind">
        <v-btn
          readonly
          dark
          depressed
          color="deep-purple deep-purple lighten-4"
          :ripple="false">
          ログイン済み
        </v-btn>
        <div>ゲストユーザーとしてログイン済み</div>
      </div>
      <div v-else>
        <v-btn
          nuxt
          dark
          color="deep-purple"
          :ripple="false"
          @click="login">
          ログイン
        </v-btn>
        <div>ゲストユーザーとしてログインします</div>
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
          to: '/rooms/1/players/1'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  computed: {
    isLogind () {
      return this.$store.getters.getIsLogind
    },
    userId () {
      console.log("aaa", this.$store.getters.getUserId)
      return this.$store.getters.getUserId
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    }
  }
}
</script>
