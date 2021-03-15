<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat color="grey lighten-4">
          <v-card-actions class="py-2 mx-2">
            <v-spacer />
            <v-btn
              dark
              small
              rounded
              depressed
              color="red darken-4"
              :ripple="false"
              @click="reset">
              リセット
            </v-btn>
          </v-card-actions>
          <p
            class="py-2 my-0 display-4 font-weight-bold text-center"
            style="text-shadow:0px 0px 1px #FFF, 2px 2px 4px rgba(0,0,0,0.3)">
            {{ result.name }}
          </p>
          <v-card-actions class="py-2 mx-2">
            <v-row justify="center" class="my-3">
              <v-btn
                v-if="!starting"
                color="deep-purple"
                dark
                x-large
                rounded
                :ripple="false"
                @click="start">
                START
              </v-btn>
              <v-btn
                v-else
                color="deep-purple"
                dark
                x-large
                rounded
                :ripple="false"
                @click="stop">
                STOP
              </v-btn>
            </v-row>
          </v-card-actions>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, i) in room.joinedUserList"
                :key="i"
                cols="3"
                sm="2"
                md="1"
                class="pa-1">
                <v-card
                  :class="[ room.resultList.some(el => el.id === item.id) ? 'yellow accent-4' : 'grey lighten-4']"
                  height="60">
                  <v-card-title class="overline py-1" style="line-height:15px">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-3">
      <v-col
        v-for="(item, i) in room.resultList"
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
    layout: 'room',
    data () {
      return {
        starting: false,
        result: { id: '', name: '？？' },
        checkList: [
          [0,1,2,3],
          [4,5,6,7],
          [8,9,10,11],
          [12,13,14,15],
          [0,4,8,12],
          [1,5,9,13],
          [2,6,10,14],
          [3,7,11,15],
          [0,5,10,15],
          [3,6,9,12],
        ],
      }
    },
    created () {
      this.$store.dispatch('onAuth')
      this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
      this.$store.dispatch('fetchRoom', { roomId: this.roomId })
    },
    computed: {
      loggedIn() {
        return this.$store.getters.getLoggedIn
      },
      authUserId() {
        return this.$store.getters.getAuthUserId
      },
      userInfo() {
        return this.$store.getters.getUserInfo
      },
      roomId() {
        return this.$route.params.roomId
      },
      room() {
        return this.$store.getters.getRoom
      }
    },
    methods: {
      start () {
        const randomID = parseInt(Math.floor(Math.random() * this.room.rouletteList.length));
        this.starting = true
        this.result = this.room.rouletteList[randomID]
        setTimeout(this.run, 80);
      },
      stop () {
        this.starting = false
      },
      run () {
        if (this.starting) {
          this.start()
        } else {
          this.$store.dispatch('updateResult', { result: this.result, roomId: this.roomId })
          this.$store.dispatch('updateResultList', { result: this.result, roomId: this.roomId })
          this.$store.dispatch('updateBingoList', { result: this.result, roomId: this.roomId })
          this.$store.dispatch('updateReachList', { result: this.result, roomId: this.roomId })
        }
      },
      reset() {
        this.$store.dispatch('resetResultList', { roomId: this.roomId })
        this.result = { id: '', name: '？？' }
      },
      reachCheck() {
        let returnVal = false
        this.checkList.forEach(function(list) {
          let ary = list.filter((val) => {
            return winItemList.indexOf(val) !== -1
          })
          if (ary.length === 3) {
            this.isReach = true
          }
        })
      },
      startGame() {

      }
    }
  }
</script>
