<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-card class="mt-4">
        <v-card-title class="mt-2 mb-6">ゲストユーザー</v-card-title>
        <v-card-subtitle>自己紹介</v-card-subtitle>
        <v-card-text>

        </v-card-text>
        <v-card-subtitle>意気込み</v-card-subtitle>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'room',
    data () {
      return {
        result: {name: '？？'},
        starting: false,
        userList: [
          {name: '齋藤'},
          {name: '白石'},
          {name: '堀'},
          {name: '星野'},
          {name: 'abc abc abc'},
          {name: '若月'},
          {name: '桜井'},
          {name: '橋本'},
          {name: 'abc abc abc'},
          {name: 'abc abc abc'},
          {name: '佐藤'},
          {name: '田中'},
          {name: '山田'},
          {name: ''},
          {name: '生田'},
          {name: '遠藤'},
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