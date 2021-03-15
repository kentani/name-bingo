<template>
  <v-app style="background: #F5F5F5">
    <!-- <side :drawer="drawer" /> -->
    <v-app-bar
      app
      clipped-left
      dense
      fixed
      flat
      dark>
      <v-toolbar-title class="px-0">
        <nuxt-link to="/" tag="div" class="c-p font-weight-bold">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        nuxt
        :disabled="!loggedIn"
        :ripple="false"
        to="/my/account">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'room',
  middleware: 'authenticated',
  data () {
    return {
      title: 'BINGO',
      drawer: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    loggedIn () {
      return this.$store.getters.getLoggedIn
    },
    roomId() {
      return this.$route.params.roomId
    },
  },
  methods: {
  }
}
</script>

<style>
.c-p {
  cursor: pointer;
}
</style>
