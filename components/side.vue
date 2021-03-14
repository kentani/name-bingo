<template>
  <v-navigation-drawer
    v-model="drawer"
    width="300"
    clipped
    fixed
    app>
    <v-tabs
      centered
      v-model="tab"
      color="deep-purple">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab>参加者</v-tab>
      <v-tab>チャット</v-tab>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
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