<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat min-height="600">
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
                :disabled="switch1"
                :ripple="false"
                @click="editStart">
                <v-icon color="deep-purple">mdi-square-edit-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="mb-2 font-weight-bold">EDIT</v-card-title>
              <v-divider />
              <v-card-text class="pa-2">
                <v-card flat>
                  <v-card-text>
                    <v-text-field
                      filled
                      label="イベント名"
                      color="deep-purple"
                      v-model="inputName" />
                    <v-textarea
                      filled
                      label="メッセージ"
                      color="deep-purple"
                      v-model="inputMessage" />
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn
                  text
                  rounded
                  small
                  @click="resetUserInfo">
                  Close
                </v-btn>
                <v-btn
                  rounded
                  dark
                  small
                  color="deep-purple"
                  @click="editEnd">
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
                ゲーム開始
              </span>
            </template>
          </v-switch>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold">{{ room.name }}</v-card-title>
        <v-card-subtitle class="pb-0" style="white-space: pre-line;">{{ room.message }}</v-card-subtitle>
        <v-card-title class="caption font-weight-bold pb-0">この部屋の招待リンク</v-card-title>
        <v-card-text class="py-0">
          <v-text-field
            filled
            dense
            hide-details
            readonly
            append-icon="mdi-clipboard-text-outline"
            class="mt-2"
            color="deep-purple"
            :value="local + '/rooms/' + roomId + '/join'"
            @click:append="copy(local + '/rooms/' + roomId + '/join')" />
        </v-card-text>
        <v-card-title class="caption font-weight-bold pb-0">管理者</v-card-title>
        <v-card-text class="py-0">
          <chip-list :items="room.adminList" />
        </v-card-text>
        <v-card-title class="caption font-weight-bold pb-0">
          <v-badge
            offset-y="17"
            offset-x="-5"
            color="deep-purple"
            :content="room.joinedUserList ? room.joinedUserList.length : 0">
            参加者
          </v-badge>
        </v-card-title>
        <v-card-text class="py-0">
          <chip-list :items="room.joinedUserList" />
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
      inputMessage: '',
      local: window.location.origin,
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
    this.$store.dispatch('fetchRoom', { roomId: this.roomId })
  },
  mounted () {
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
    },
    isJoinedRoom() {
      let val = false
      if (this.room.joinedUserList) {
        val = this.room.joinedUserList.filter(v => v).some(el => el.id === this.userInfo.id)
      }
      return val
    }
  },
  methods: {
    handleJoinButtonClick() {
      this.$store.dispatch('joinRoom', { user: this.userInfo, roomId: this.roomId })
    },
    editStart() {
      this.inputName = this.room.name
      this.inputMessage = this.room.message
    },
    resetUserInfo() {
      this.inputName = ''
      this.inputMessage = ''
      this.dialog = false
    },
    editEnd() {
      this.$store.dispatch('setRoomInfo', { roomId: this.roomId, name: this.inputName, message: this.inputMessage })
      this.dialog = false
    },
    setUserInfo() {
    },
    copy(str) {
      this.$copyText(str)
    }
  }
}
</script>