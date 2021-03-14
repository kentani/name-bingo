<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-card class="mt-4">
        <p
          class="py-2 grey lighten-2 display-2 font-weight-bold text-center">
          BINGO CARD
        </p>
        <v-card-text>
          <v-row justify="center" class="my-3">
            <v-col
              v-for="(item, i) in userList"
              :key="i"
              cols="3">
              <v-card
                :flat="i !== 0 && i !== 7 && i !== 10"
                :dark="i === 0 || i === 7 || i === 10"
                :class="{ 'deep-purple lighten-2': i === 0 || i === 7 || i === 10, 'grey lighten-4': i !== 0 && i !== 7 && i !== 10 }"
                height="100">
                <v-card-title class="overline py-1">
                  {{ item.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'bingo',
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