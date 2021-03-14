<template>
  <div>
    <v-tabs
      v-model="tab"
      centered
      color="deep-purple">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab
        v-for="item in items"
        :key="item.title"
        :to="item.to">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        { title: "ビンゴカード", to: "/rooms/1/players/1/bingo-card" },
        { title: "自己紹介", to: "/rooms/1/players/1/profile" },
      ]
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>