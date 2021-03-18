<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card elevation="18">
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          PROFILE CARD
        </p>
        <v-card-actions class="py-0 mx-2">
          <v-dialog
            v-model="dialog"
            scrollable
            persistent
            width="900">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :ripple="false"
                :disabled="switch1"
                @click="editStart">
                <v-icon color="deep-purple">mdi-square-edit-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="font-weight-bold">Edit</v-card-title>
              <v-divider />
              <v-card-text class="pa-2">
                <v-card flat>
                  <v-card-text>
                    <v-text-field
                      filled
                      label="なまえ"
                      color="deep-purple"
                      v-model="inputName" />
                    <v-text-field
                      filled
                      label="ひとこと"
                      color="deep-purple"
                      v-model="inputNote" />
                    <v-textarea
                      filled
                      label="プロフィール"
                      color="deep-purple"
                      v-model="inputProfile" />
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  rounded
                  @click="resetUserInfo">
                  Close
                </v-btn>
                <v-btn
                  rounded
                  dark
                  color="deep-purple"
                  @click="updatePlayerInfo">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer />
          <v-switch
            v-model="switch1"
            inset
            hide-details
            class="my-2"
            color="deep-purple">
            <template v-slot:label>
              <span
                class="overline font-weight-bold"
                :class="[ switch1 ? 'deep-purple--text' : 'grey--text' ]">
                準備完了
              </span>
            </template>
          </v-switch>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold" :class="[ player.note ? 'pb-1' : 'pb-3' ]">{{ player.name }}</v-card-title>
        <v-card-text style="white-space: pre-line;">{{ player.note }}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ player.profile ? 'pb-1' : 'pb-3' ]">プロフィール</v-card-subtitle>
        <v-card-text style="white-space: pre-line;">{{ player.profile }}</v-card-text>
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
        inputNote: '',
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
        return this.$route.params.roomId
      },
      playerId() {
        return this.$route.params.playerId
      },
      playerListMap() {
        return this.$store.getters.getPlayerListMap
      },
      room() {
        return this.$store.getters.getRoom
      },
      player() {
        return this.$store.getters.getPlayer
      }
    },
    methods: {
      editStart() {
        this.inputName = this.player.name
        this.inputNote = this.player.note
        this.inputProfile = this.player.profile
      },
      resetUserInfo() {
        this.inputName = ''
        this.inputNote = ''
        this.inputProfile = ''
        this.dialog = false
      },
      updatePlayerInfo() {
        this.$store.dispatch('updatePlayerInfo', { name: this.inputName, note: this.inputNote, profile: this.inputProfile, playerId: this.playerId })
        this.dialog = false
      }
    }
  }
</script>