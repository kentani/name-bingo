<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card flat color="grey lighten-4">
        <v-card-actions class="py-0 mx-2">
          <v-btn
              text
              rounded
              color="red darken-4"
              :disabled="switch1"
              :ripple="false"
              @click="reset">
              <span class="body-2 font-weight-bold">
                RESET
              </span>
            </v-btn>
          <v-spacer />
          <v-switch
            v-model="switch1"
            inset
            hide-details
            class="my-2"
            color="deep-purple">
            <template v-slot:label>
              <span
                class="body-2 font-weight-bold"
                :class="[ switch1 ? 'deep-purple--text' : 'grey--text' ]">
                ゲーム開始
              </span>
            </template>
          </v-switch>
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
        </v-card-actions>
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
                :flat="!ishit(player.id)"
                :class="[ !ishit(player.id) ? 'white' : 'yellow accent-4' ]"
                height="80">
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
    layout: 'room',
    data () {
      return {
        switch1: false,
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
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
    },
    computed: {
      roomId() {
        return this.$route.params.roomId
      },
      playerListMap() {
        return this.$store.getters.getPlayerListMap
      },
      room() {
        return this.$store.getters.getRoom
      },
      joinedList() {
        if (!this.room.adminList) return []
        return this.room.joinedList.map((v) =>{
          return this.playerListMap[v]
        })
      },
      hitList() {
        if (!this.room.hitList) return []
        return this.room.hitList.map((v) =>{
          return this.playerListMap[v]
        })
      }
    },
    methods: {
      start () {
        const randomID = parseInt(Math.floor(Math.random() * this.joinedList.length));
        this.starting = true
        this.result = this.joinedList[randomID]
        setTimeout(this.run, 80);
      },
      stop () {
        this.starting = false
      },
      run () {
        if (this.starting) {
          this.start()
        }
        else {
          this.$store.dispatch('addHit', { roomId: this.roomId, playerId: this.result.id })
        }
      },
      reset() {
        this.$store.dispatch('resetHit', { roomId: this.roomId })
        this.result = { id: '', name: '？？' }
      },
      ishit(playerId) {
        return this.room.hitList.includes(playerId)
      }
    }
  }
</script>
