<template>
  <div>
    <v-row justify="center" class="mt-2 mb-6">
      <v-col cols="4">
        <v-card flat class="grey lighten-4">
          <v-row justify="center">
            <v-card-title class="display-4 font-weight-bold">
              {{ result.name }}
            </v-card-title>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-3">
      <v-btn
        v-if="!starting"
        color="deep-purple"
        dark
        x-large
        :ripple="false"
        @click="start">
        スタート
      </v-btn>
      <v-btn
        v-else
        color="deep-purple"
        dark
        x-large
        :ripple="false"
        @click="stop">
        ストップ
      </v-btn>
    </v-row>
    <v-row justify="center" class="my-3">
      <v-col
        v-for="(item, i) in resultList"
        :key="i"
        cols="2">
        <v-card
          flat
          class="grey lighten-4">
            <v-card-title class="subtitle-1 py-1">
              {{ item.name }}
            </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    layout: 'bingo',
    data () {
      return {
        result: {name: '？？'},
        starting: false,
        userList: [
          {name: '斎藤'},
          {name: '白石'},
          {name: '堀'},
          {name: '星野'},
          {name: '西野'},
          {name: '若月'},
          {name: '桜井'},
          {name: '橋本'},
          {name: '与田'},
          {name: '山田'},
          {name: '佐藤'},
          {name: '田中'},
          {name: '山田'},
          {name: '秋元'},
          {name: '生田'},
          {name: '遠藤'},
          {name: '生駒'},
          {name: '松村'},
          {name: '中田'},
          {name: '中元'},
        ],
        resultList: [],
      }
    },
    created () {
      this.$emit("handleUserList", {list: this.userList})
    },
    computed: {
    },
    methods: {
      start () {
        const randomID = parseInt(Math.floor(Math.random() * this.userList.length));
        this.result = this.userList[randomID]
        this.starting = true
        setTimeout(this.run, 50);
      },
      stop () {
        this.starting = false
      },
      run () {
        if (this.starting) {
          this.start()
        } else {
          this.resultList.push(this.result)
        }
      }
    }
  }
</script>
