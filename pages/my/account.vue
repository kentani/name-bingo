<template>
  <v-row justify="center">
    <v-col cols="12" md="9">
      <v-card flat>
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
            :to="'/add-room'"
            :ripple="false">
            <span class="font-weight-bold">部屋を作成</span>
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold pb-0">{{ userInfo.name }}</v-card-title>
        <v-card-text class="caption" style="white-space: pre-line;">{{ loggedIn ? 'ゲストユーザーとしてログイン中' : ''}}</v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ userInfo.createdRoomList.length > 0 ? 'pb-1' : 'pb-3' ]">作成履歴</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :items="userInfo.createdRoomList" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ userInfo.joinedRoomList.length > 0 ? 'pb-1' : 'pb-3' ]">参加履歴</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :items="userInfo.joinedRoomList" />
        </v-card-text>
        <v-card-subtitle class="body-2 font-weight-bold pt-0 pb-1">このサイトについて</v-card-subtitle>
        <v-card-text class="py-0">
          <link-list :with-icon="true" :items="appItems" />
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
      inputName: '',
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
      ]
    }
  },
  created () {
    this.$store.dispatch('onAuth')
    this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
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
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    editStart() {
      this.inputName = this.userInfo.name
    },
    resetUserInfo() {
      this.inputName = ''
      this.dialog = false
    },
    editEnd() {
      this.$store.dispatch('setUserInfo2', { userId: this.userInfo.id, name: this.inputName })
      this.dialog = false
    },
    setUserInfo() {

    }
  }
}
</script>