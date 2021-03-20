<template>
  <div>
    <v-tabs
      centered
      background-color="grey lighten-4"
      color="deep-purple"
      class="mb-6">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab class="font-weight-bold" :to="'/rooms/' + roomId + '/admin/bingo'">Bingo</v-tab>
      <v-tab class="font-weight-bold" :to="'/rooms/' + roomId + '/admin/settings'">Settings</v-tab>
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
  created () {
  },
  computed: {
    roomId() {
      return this.$route.params.roomId
    },
    room() {
      return this.$store.getters.getRoom
    },
  },
  methods: {
  }
}
</script>