<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
        <v-card-actions class="mx-2">
          <v-spacer />
          <v-dialog
            v-model="dialog"
            scrollable
            persistent
            width="900">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                nuxt
                text
                rounded
                v-bind="attrs"
                v-on="on"
                color="deep-purple"
                :ripple="false"
                @click="dialog = true">
                <span class="font-weight-bold">部屋を作成</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="font-weight-bold">Add new</v-card-title>
              <v-divider class="mx-4" />
              <v-card-text class="pa-2">
                <v-card flat>
                  <v-card-text>
                    <v-text-field
                      filled
                      label="部屋の名前"
                      :disabled="finished"
                      color="deep-purple"
                      v-model="inputRoomName" />
                    <v-textarea
                      filled
                      label="メッセージ"
                      :disabled="finished"
                      color="deep-purple"
                      v-model="inputNote" />
                    <v-text-field
                    filled
                    label="あなたの名前"
                    :disabled="finished"
                    color="deep-purple"
                    v-model="inputPlayerName" />
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-divider class="mx-4" />
              <v-card-actions>
                <v-spacer />
                <div v-if="!finished">
                  <v-btn
                    text
                    nuxt
                    rounded
                    @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn
                    rounded
                    dark
                    color="deep-purple"
                    @click="addRoom">
                    Save
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    rounded
                    text
                    nuxt
                    color="deep-purple"
                    :to="'/rooms/' + room.id + '/admin/settings'">
                    <span class="font-weight-bold">部屋に入る</span>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold pb-0">ゲストユーザー</v-card-title>
        <v-card-text class="caption" style="white-space: pre-line;">{{ loggedIn ? 'ゲストユーザーとしてログイン中' : ''}}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ adminList.length > 0 ? 'pb-1' : 'pb-3' ]">管理履歴</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :items="adminList" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ joinedList.length > 0 ? 'pb-1' : 'pb-3' ]">参加履歴</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :items="joinedList" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">このサイトについて</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :with-icon="true" :items="appItems" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">暫定対応</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :with-icon="true" :items="appItems2" />
        </v-card-text>
        <v-divider class="mx-4" />
        <v-card-text class="py-0">
          <v-list dense>
            <v-list-item-group color="deep-purple">
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon v-text="'mdi-arrow-right'"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'ログアウト'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'top',
  data () {
    return {
      dialog: false,
      finished: false,
      inputRoomName: '',
      inputNote: '',
      inputPlayerName: '',
      appItems: [
        {
          icon: 'mdi-apps',
          name: 'ビンゴの始め方',
          to: '/'
        },
        {
          icon: 'mdi-note',
          name: '利用規約',
          to: '/'
        },
        {
          icon: 'mdi-github',
          name: 'ソースコード',
          to: '/'
        },
      ],
      appItems2: [
        {
          icon: 'mdi-apps',
          name: '招待リンク',
          to: '/rooms/fW80FMoyLnCtWbCJiQ5f/invite'
        },
        {
          icon: 'mdi-apps',
          name: '管理画面',
          to: '/rooms/fW80FMoyLnCtWbCJiQ5f/admin/bingo'
        },
      ]
    }
  },
  async created () {
    await this.$store.dispatch('onAuth')
    await this.$store.dispatch('fetchAccountInfo', { authId: this.authId })
  },
  mounted () {
  },
  computed: {
    authId() {
      return this.$store.getters.getAuthId
    },
    loggedIn() {
      return this.$store.getters.getLoggedIn
    },
    adminList() {
      return this.$store.getters.getAdminList
    },
    joinedList() {
      return this.$store.getters.getJoinedList
    },
    room() {
      return this.$store.getters.getRoom
    },
  },
  methods: {
    addRoom () {
      this.$store.dispatch('createRoom', { roomName: this.inputRoomName, note: this.inputNote, playerName: this.inputPlayerName, authId: this.authId })
      this.finished = true
    },
    logout() {
      this.$store.dispatch('logout')
    },
  }
}
</script>