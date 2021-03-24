<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card elevation="18">
          <p
            class="display-1 py-2 my-0 font-weight-bold text-center grey lighten-2">
            PROFILE CARD
          </p>
          <p
            class="subtitle-1 py-0 my-0 font-weight-bold text-center white--text"
            :class="setColor()">
            {{ setText() }}
          </p>
          <div class="text-center">
            <div v-if="room.isReady" class="subtitle-2 font-weight-bold">
              <span class="mx-1">参加者：{{ room.joinedList && room.joinedList.length }}</span>
              <span class="mx-1">リーチ：{{ room.reachList && room.reachList.length }}</span>
              <span class="mx-1">ビンゴ：{{ room.bingoList && room.bingoList.length }}</span>
            </div>
            <div v-else class="subtitle-2 font-weight-bold">
              <span class="mx-1">参加者：{{ room.joinedList && room.joinedList.length }}</span>
              <span class="mx-1">準備中：{{ room.joinedList && room.readyList && room.joinedList.length - room.readyList.length }}</span>
              <span class="mx-1">準備完：{{ room.readyList && room.readyList.length }}</span>
            </div>
          </div>
          <v-card-actions class="mx-2">
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
                  :disabled="room.isReady"
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
                    color="deep-purple"
                    :dark="!room.isReady"
                    :text="room.isReady"
                    :disabled="room.isReady"
                    @click="updatePlayerInfo">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
          <v-divider class="mx-4" />
          <v-card-title class="title font-weight-bold" :class="[ player.note ? 'pb-1' : 'pb-3' ]">{{ player.name }}</v-card-title>
          <v-card-text style="white-space: pre-line;">{{ player.note }}</v-card-text>
          <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ player.profile ? 'pb-1' : 'pb-3' ]">プロフィール</v-card-subtitle>
          <v-card-text style="white-space: pre-line;">{{ player.profile }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    layout: 'protected',
    data () {
      return {
        dialog: false,
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
      player() {
        return this.$store.getters.getPlayer
      },
      isEditFinished() {
        return this.room.editProfileList && this.room.editProfileList.includes(this.playerId) ? true : false
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
        this.addEditProfileList()
        this.dialog = false
      },
      addEditProfileList() {
        if (this.isEditFinished) return
        this.$store.dispatch('addEditProfileList', { roomId: this.roomId, playerId: this.playerId })
      },
      setColor() {
        if (this.room.bingoList && this.room.bingoList.includes(this.playerId)) {
          return 'yellow accent-4'
        } else if (this.room.reachList && this.room.reachList.includes(this.playerId)) {
          return 'deep-purple'
        } else if (this.room.isReady) {
          return 'deep-purple'
        } else if (this.isEditFinished) {
          return 'grey'
        } else {
          return 'red darken-4'
        }
      },
      setText() {
        if (this.room.bingoList && this.room.bingoList.includes(this.playerId)) {
          return 'ビンゴ!!!'
        } else if (this.room.reachList && this.room.reachList.includes(this.playerId)) {
          return 'リーチ!!!'
        } else if (this.room.isReady) {
          return 'ビンゴ開催中'
        } else if (this.isEditFinished) {
          return 'プロフィール編集済み'
        } else {
          return 'プロフィールを編集してください'
        }
      }
    }
  }
</script>