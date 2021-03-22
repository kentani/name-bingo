<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="{ path: '/operation/bingo-field', query: { roomId: roomId } }">Bingo</v-tab>
      <v-tab class="font-weight-bold" :to="{ path: '/operation/settings', query: { roomId: roomId } }">Settings</v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'protected',
  data () {
    return {
    }
  },
  async created () {
    await this.$store.dispatch('onAuth')
  },
  computed: {
    roomId() {
      return this.$route.query.roomId
    },
  },
  methods: {
  }
}
</script>