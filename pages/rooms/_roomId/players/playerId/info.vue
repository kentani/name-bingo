<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-actions class="py-3 mx-2">
          <v-spacer />
          <v-btn
            nuxt
            text
            rounded
            color="deep-purple"
            :disabled="!player.isAdmin"
            :to="'/rooms/' + this.roomId + '/admin/settings'"
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
    layout: 'room',
    data () {
      return {
        dialog: false,
        switch1: false,
        inputName: '',
        inputProfile: '',
        inputMessage: '',
        items: [
        {
          icon: 'mdi-arrow-right',
          name: '参加をやめる',
          to: '/rooms/' + this.roomId + '/invite',
          disabled: false
        },
      ]
      }
    },
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
      await this.$store.dispatch('fetchPlayer', { roomId: this.roomId, authId: this.authId })
      await this.$store.dispatch('fetchPlayerList', { roomId: this.roomId })
    },
    computed: {
      authId() {
        return this.$store.getters.getAuthId
      },
      loggedIn() {
        return this.$store.getters.getLoggedIn
      },
      room() {
        return this.$store.getters.getRoom
      },
      roomId() {
        return this.$route.params.roomId
      },
      player() {
        return this.$store.getters.getPlayer
      },
      playerId() {
        return this.$route.params.playerId
      },
      playerList() {
        return this.$store.getters.getPlayerList
      },
      joinedList() {
        return this.playerList.length > 0 ? this.playerList.filter(v => v.isJoined ) : this.playerList
      }
    },
    methods: {
    }
  }
</script>