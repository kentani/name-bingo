<template>
  <v-app style="background: #F5F5F5">
    <v-app-bar
      clipped-left
      dense
      fixed
      flat
      app
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
        to="/my/dashboard">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt v-if="loggedIn" />
        <div v-else>
          <v-dialog
            v-model="dialog"
            scrollable
            persistent
            width="900">
            <v-card>
              <v-card-title class="font-weight-bold">Invalid</v-card-title>
              <v-divider class="mx-4" />
              <v-card-text class="title font-weight-bold text-center py-6">ログインしてご利用ください</v-card-text>
              <v-card-actions>
                <v-row justify="center" class="my-3">
                  <v-btn
                    color="deep-purple"
                    dark
                    x-large
                    rounded
                    :ripple="false"
                    to="/"
                    nuxt>
                    トップ画面
                  </v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
  name: 'protected',
  // middleware: 'authenticated',
  data () {
    return {
      title: 'Name Bingo',
    }
  },
  async created () {
    this.$store.dispatch('onAuth')
  },
  mounted () {
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getLoggedIn
    },
    dialog() {
      return !this.loggedIn
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
