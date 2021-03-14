<template>
  <div>
    <v-row justify="center" class="mt-2 mb-6">
      <v-col cols="4">
        <v-card flat class="grey lighten-4">
          <v-row justify="center">
            <v-card-title class="display-4 font-weight-bold">
              {{ room.result.name }}
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
        v-if="room.resultList.length !== 0"
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
        this.$store.dispatch('updateResult', { result: this.room.rouletteList[randomID], roomId: this.roomId })
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
          this.$store.dispatch('updateResultList', { result: this.result, roomId: this.roomId })
        }
      }
    }
  }
</script>
