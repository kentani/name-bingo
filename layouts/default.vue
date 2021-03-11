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
      <v-toolbar-title>
        <nuxt-link to="/" tag="div" class="c-p">{{ title }}</nuxt-link>
      </v-toolbar-title>
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
  data () {
    return {
      title: 'BINGO',
      drawer: false,
    }
  }
}
</script>

<style>
.c-p {
  cursor: pointer;
}
</style>
