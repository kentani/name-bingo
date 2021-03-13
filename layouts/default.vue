<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      dense
      fixed
      flat
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="px-0">
        <nuxt-link to="/" tag="div" class="c-p">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        nuxt
        to="/settings"
        :ripple="false">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'BINGO',
      drawer: false
    }
  },
  mounted () {
  },
  computed: {
    isLogind () {
      return this.$store.getters.getIsLogind
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
