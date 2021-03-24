<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card flat color="grey lighten-4">
        <v-card-actions class="py-0 mx-2">
          <v-btn
              text
              rounded
              color="red darken-4"
              :disabled="isReady"
              :ripple="false"
              @click="reset">
              <span class="body-2 font-weight-bold">
                RESET
              </span>
            </v-btn>
          <v-spacer />
          <v-switch
            v-model="isReady"
            inset
            hide-details
            class="my-2"
            color="deep-purple">
            <template v-slot:label>
              <span
                class="body-2 font-weight-bold"
                :class="[ isReady ? 'deep-purple--text' : 'grey--text' ]">
                ゲーム開始
              </span>
            </template>
          </v-switch>
        </v-card-actions>
        <p
          class="py-2 my-0 display-3 font-weight-bold text-center"
          style="text-shadow:0px 0px 1px #FFF, 2px 2px 4px rgba(0,0,0,0.3)">
          {{ result.name }}
        </p>
        <v-card-actions class="py-2 mx-2">
          <v-row v-if="room.isReady" justify="center" class="my-3">
            <v-btn
              v-if="!starting"
              color="deep-purple"
              dark
              x-large
              rounded
              elevation="18"
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
          <v-row v-else justify="center" class="my-3">
            <v-btn
              text
              x-large
              rounded
              disabled
              :ripple="false">
              準備中...
            </v-btn>
          </v-row>
        </v-card-actions>
        <v-alert
          dense
          text
          flat
          color="grey lighten-4"
          class="text-center">
          <div v-if="room.isReady" class="subtitle-1 font-weight-bold black--text">
            <span class="mx-1">参加者：{{ room.joinedList && room.joinedList.length }}</span>
            <span class="mx-1">リーチ：{{ room.reachList && room.reachList.length }}</span>
            <span class="mx-1">ビンゴ：{{ room.bingoList && room.bingoList.length }}</span>
          </div>
          <div v-else class="subtitle-1 font-weight-bold grey--text">
            <span class="mx-1">参加者：{{ room.joinedList && room.joinedList.length }}</span>
            <span class="mx-1">準備中：{{ room.joinedList && room.readyList && room.joinedList.length - room.readyList.length }}</span>
            <span class="mx-1">準備完：{{ room.readyList && room.readyList.length }}</span>
          </div>
        </v-alert>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(player, i) in joinedList"
              :key="i"
              cols="3"
              sm="2"
              md="1"
              class="pa-1">
              <v-card
                :flat="setFlat(player.id)"
                :class="[ !ishit(player.id) ? 'white' : 'yellow accent-4' ]"
                height="80">
                <v-badge
                  v-if="setText(player.id)"
                  offset-y=""
                  offset-x=""
                  color="deep-purple"
                  :content="setText(player.id)">
                </v-badge>
                <v-card-title class="overline pa-1" style="line-height:15px">
                  {{ player.name }}
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
    layout: 'protected',
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
        reach: [],
        bingo: [],
      }
    },
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
    },
    computed: {
      roomId() {
        return this.$route.query.roomId
      },
      playerListMap() {
        return this.$store.getters.getPlayerListMap
      },
      room() {
        return this.$store.getters.getRoom
      },
      joinedList() {
        if (!this.room.joinedList) return []
        return this.room.joinedList.map((v) =>{
          return this.playerListMap[v]
        }).filter(v => v)
      },
      hitList() {
        if (!this.room.hitList) return []
        return this.room.hitList.map((v) =>{
          return this.playerListMap[v]
        }).filter(v => v)
      },
      isReady: {
        get: function () {
          return this.room.isReady ? true : false
        },
        set: function (val) {
          this.changeStatus(val)
          if (!val) {
            this.reset()
          }
        }
      }
    },
    methods: {
      start () {
        const list = this.joinedList.filter(v => !this.room.hitList.includes(v.id) )
        const randomID = parseInt(Math.floor(Math.random() * list.length));
        this.starting = true
        this.result = list[randomID]
        this.reach =  Object.assign([], this.reach, this.room.reachList)
        this.bingo =  Object.assign([], this.bingo, this.room.bingoList)
        setTimeout(this.run, 30);
      },
      stop () {
        this.starting = false
      },
      async run () {
        if (this.starting) {
          this.start()
        }
        else {
          await this.$store.dispatch('addHit', { roomId: this.roomId, playerId: this.result.id })
          await this.check()
        }
      },
      reset() {
        this.$store.dispatch('resetHit', { roomId: this.roomId })
        this.result = { id: '', name: '？？' }
        this.reach = []
        this.bingo = []
      },
      ishit(playerId) {
        return this.room.hitList.includes(playerId)
      },
      check() {
        this.joinedList.forEach((player) => {
          let hitIndexList = []
          this.room.hitList.forEach((v) => {
            hitIndexList.push(player.selectList.indexOf(v))
          })

          this.checkList.forEach((list) => {
            let tmpResult = []
            list.forEach((index) => {
              tmpResult.push(hitIndexList.includes(index))
            })

            let result = []
            result = tmpResult.filter(v => v === true)

            if (result.length === 3 && !this.room.reachList.includes(player.id) && !this.reach.includes(player.id)) {
              this.reach.push(player.id)
            }

            if (result.length === 4 && !this.room.bingoList.includes(player.id) && !this.bingo.includes(player.id)) {
              this.bingo.push(player.id)
            } 
          })
        })

        if (this.reach.length != 0) {
          this.$store.dispatch('addReach', { roomId: this.roomId, reachList: this.reach })
        }

        if (this.bingo.length != 0) {
          this.$store.dispatch('addBingo', { roomId: this.roomId, bingoList: this.bingo })
        }
      },
      changeStatus(status) {
        this.$store.dispatch('updateRoomReady', { status: status, roomId: this.roomId })
      },
      setFlat(playerId) {
        if (this.ishit(playerId)) {
          return false
        } else if (this.room.isReady || (this.room.readyList && this.room.readyList.includes(playerId))) {
          return true
        } else {
          return false
        }
      },
      setText(playerId) {
        if (this.room.bingoList && this.room.bingoList.includes(playerId)) {
          return 'ビンゴ'
        } else if (this.room.reachList && this.room.reachList.includes(playerId)) {
          return 'リーチ'
        }
      },
    }
  }
</script>
