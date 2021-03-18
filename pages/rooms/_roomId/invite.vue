<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      width="900">
      <v-card>
        <v-card-title class="font-weight-bold">Invite</v-card-title>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold" :class="[ room.note ? 'pb-1' : 'pb-3' ]">{{ room.name }}</v-card-title>
        <v-card-text style="white-space: pre-line;">{{ room.note }}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">
          <v-badge
            offset-y="17"
            offset-x="-5"
            color="deep-purple"
            :content="joinedList ? joinedList.length : 0">
            参加者
          </v-badge>
        </v-card-subtitle>
        <v-card-text>
          <chip-list :items="joinedList" />
        </v-card-text>
        <v-card-text>
          <v-text-field
            filled
            label="あなたの名前"
            :disabled="!!player.id"
            color="deep-purple"
            v-model="inputPlayerName" />
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="room.joinedList && room.joinedList.includes(player.id)"
            nuxt
            rounded
            text
            color="deep-purple"
            :to="'/rooms/' + roomId + '/players/' + player.id + '/bingo-card'"
            :ripple="false">
            <span class="font-weight-bold">部屋に入る</span>
          </v-btn>
          <v-btn
            v-else
            rounded
            dark
            color="deep-purple"
            :ripple="false"
            @click="joinRoom">
            参加する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: 'room',
  data () {
    return {
      dialog: true,
      inputPlayerName: '',
    }
  },
  async created () {
    await this.$store.dispatch('onAuth')
    await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
    await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
    await this.$store.dispatch('fetchPlayerByAuth', { roomId: this.roomId, authId: this.authId })
    this.inputPlayerName = this.player.name
  },
  mounted () {
  },
  computed: {
    authId() {
      return this.$store.getters.getAuthId
    },
    playerListMap() {
      return this.$store.getters.getPlayerListMap
    },
    room() {
      return this.$store.getters.getRoom
    },
    roomId() {
      return this.$route.params.roomId
    },
    joinedList() {
      if (!this.room.joinedList) return []
      return this.room.joinedList.map((v) =>{
        return this.playerListMap[v]
      }).filter(v => v)
    },
    player() {
      return this.$store.getters.getPlayer
    },
  },
  methods: {
    joinRoom() {
      if (this.player.id) {
        this.$store.dispatch('creatorJoinRoom', { roomId: this.roomId, playerId: this.player.id })
      }
      else {
        this.$store.dispatch('joinRoom', { roomId: this.roomId, playerName: this.inputPlayerName, authId: this.authId })
      }
    },
  }
}
</script>