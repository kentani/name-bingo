<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card flat>
        <v-card-actions class="mx-2">
          <v-spacer />
          <v-btn
            nuxt
            text
            rounded
            color="deep-purple"
            :disabled="!isAdmin"
            :to="{ path: '/operation/bingo-field', query: { roomId: roomId } }"
            :ripple="false">
            <span class="font-weight-bold">管理画面</span>
          </v-btn>
        </v-card-actions>
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
        <v-divider class="mx-4" />
        <v-card-text class="py-0">
          <link-list :with-icon="true" :items="items" />
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
        dialog: false,
        switch1: false,
        inputName: '',
        inputProfile: '',
        inputMessage: '',
      }
    },
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
      await this.$store.dispatch('fetchPlayer', { roomId: this.roomId, playerId: this.playerId })
    },
    computed: {
      roomId() {
        return this.$route.query.roomId
      },
      playerId() {
        return this.$route.query.playerId
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
      player() {
        return this.$store.getters.getPlayer
      },
      isAdmin() {
        return this.room.adminList && this.room.adminList.includes(this.playerId) ? true : false
      },
      items() {
        return [
          {
            icon: 'mdi-arrow-right',
            name: '参加をやめる',
            to: { path: '/invite', query: { roomId: this.roomId } },
            disabled: true
          },
        ]
      }
    },
    methods: {
    }
  }
</script>