<template>
  <v-row>
    <v-col cols="12">root</v-col>
    <v-col cols="12">
      <v-btn
        v-if="isLogind"
        disabled
        :ripple="false">
        ログイン済み
      </v-btn>
      <v-btn
        v-else
        nuxt
        :ripple="false"
        @click="login">
        ゲストユーザーでログイン
      </v-btn>
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
          title: 'profile',
          to: '/rooms/1/players/1/profile'
        },
        {
          icon: 'mdi-apps',
          title: 'bingo-card',
          to: '/rooms/1/players/1/bingo-card'
        },
        {
          icon: 'mdi-apps',
          title: 'settings',
          to: '/settings'
        },
      ]
    }
  },
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  computed: {
    isLogind () {
      return this.$store.getters.getIsLogind
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    }
  }
}
</script>
