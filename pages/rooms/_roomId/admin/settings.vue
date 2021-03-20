<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
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
                :disabled="room.isReady"
                :ripple="false"
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
                      label="イベント名"
                      color="deep-purple"
                      v-model="inputName" />
                    <v-textarea
                      filled
                      label="メッセージ"
                      color="deep-purple"
                      v-model="inputNote" />
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
                  @click="editEnd">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer />
          <v-btn
            nuxt
            text
            rounded
            color="deep-purple"
            :disabled="!isJoined"
            :to="'/rooms/' + this.roomId + '/players/' + player.id + '/bingo-card'"
            :ripple="false">
            <span class="font-weight-bold">プレイヤー画面</span>
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold" :class="[ room.note ? 'pb-1' : 'pb-3' ]">{{ room.name }}</v-card-title>
        <v-card-text style="white-space: pre-line;">{{ room.note }}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">この部屋の招待リンク</v-card-subtitle>
        <v-card-text>
          <v-text-field
            filled
            dense
            hide-details
            readonly
            append-icon="mdi-clipboard-text-outline"
            class="mt-2"
            color="deep-purple"
            :value="local + '/rooms/' + roomId + '/invite'"
            @click:append="copy(local + '/rooms/' + roomId + '/invite')" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">管理者</v-card-subtitle>
        <v-card-text>
          <chip-list :items="adminList" />
        </v-card-text>
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
      inputName: '',
      inputNote: '',
      local: process.env.BASEURL,
    }
  },
  async created () {
    await this.$store.dispatch('onAuth')
    await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
    await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
    await this.$store.dispatch('fetchPlayerByAuth', { roomId: this.roomId, authId: this.authId })
  },
  mounted () {
  },
  computed: {
    authId() {
      return this.$store.getters.getAuthId
    },
    roomId() {
      return this.$route.params.roomId
    },
    playerListMap() {
      return this.$store.getters.getPlayerListMap
    },
    room() {
      return this.$store.getters.getRoom
    },
    adminList() {
      if (!this.room.adminList) return []
      return this.room.adminList.map((v) =>{
        return this.playerListMap[v]
      }).filter(v => v)
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
    isJoined() {
      return this.room.joinedList && this.room.joinedList.includes(this.player.id) ? true : false
    },
  },
  methods: {
    editStart() {
      this.inputName = this.room.name
      this.inputNote = this.room.note
    },
    resetUserInfo() {
      this.inputName = ''
      this.inputNote = ''
      this.dialog = false
    },
    editEnd() {
      this.$store.dispatch('updateRoom', { name: this.inputName, note: this.inputNote, roomId: this.roomId })
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