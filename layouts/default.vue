<template>
  <v-app dark>
    <v-app-bar
      clipped-left
      dense
      fixed
      flat
      app>
      <v-app-bar-nav-icon disabled />
      <v-toolbar-title class="px-0">
        <nuxt-link to="/" tag="div" class="c-p font-weight-bold">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        nuxt
        :disabled="!loggedIn"
        :ripple="false"
        to="/user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn
        icon
        nuxt
        :disabled="!loggedIn"
        :ripple="false"
        to="/add-room">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'default',
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
    }
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
