<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card flat>
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          Account
        </p>
        <v-card-actions class="py-2 mx-2">
          <v-dialog
            v-model="dialog"
            scrollable
            width="600">
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
              <v-card-title class="mb-2 font-weight-bold">EDIT</v-card-title>
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
          <v-btn
            nuxt
            rounded
            dark
            small
            color="red darken-4"
            :ripple="false"
            @click="logout">
            ログアウト
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-4" />
        <v-card-title class="title font-weight-bold">{{ userInfo.name }}</v-card-title>
        <v-card-subtitle class="pb-0" style="white-space: pre-line;">{{ loggedIn ? 'ゲストユーザーとしてログイン中' : ''}}</v-card-subtitle>
        <v-card-title class="caption font-weight-bold pb-0">作成履歴</v-card-title>
        <v-card-text class="py-0">
          <link-list :items="userInfo.createdRoomList" />
        </v-card-text>
        <v-card-title class="caption font-weight-bold pb-0">参加履歴</v-card-title>
        <v-card-text class="py-0">
          <link-list :items="userInfo.joinedRoomList" />
        </v-card-text>
        <v-card-title class="caption font-weight-bold pb-0">このサイトについて</v-card-title>
        <v-card-text class="pt-0">
          <link-list :with-icon="true" :items="appItems" />
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