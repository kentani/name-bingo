<template>
  <v-row justify="center" class="pt-6">
    <v-col cols="12" sm="9" md="6">
      <v-card>
        <p
          class="py-2 my-0 grey lighten-2 display-2 font-weight-bold text-center">
          PROFILE
        </p>
        <v-card-actions class="py-0 mx-2">
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
                  :disabled="switch1"
                  @click="editStart">
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="mb-2 font-weight-bold">EDIT PROFILE</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                  <v-card flat>
                    <v-card-text>
                      <v-text-field
                        filled
                        label="name"
                        color="deep-purple"
                        v-model="inputName" />
                      <v-text-field
                        filled
                        label="one message"
                        color="deep-purple"
                        v-model="inputMessage" />
                      <v-textarea
                        filled
                        label="profile"
                        color="deep-purple"
                        v-model="inputProfile" />
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn
                    text
                    color="grey"
                    @click="resetUserInfo">
                    Close
                  </v-btn>
                  <v-btn
                    text
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
            color="deep-purple"
            :disabled="editting">
            <template v-slot:label>
              <span
                class="overline font-weight-bold"
                :class="[ switch1 ? 'deep-purple--text' : 'grey--text' ]">
                準備完了
              </span>
            </template>
          </v-switch>
        </v-card-actions>
        <v-divider class="mx-4"></v-divider>
        <v-card-title class="title font-weight-bold mb-3">
          {{ userInfo.name }}
        </v-card-title>
        <v-card-subtitle>
          ひとこと
        </v-card-subtitle>
        <v-card-text class="body-1">
          {{ userInfo.message }}
        </v-card-text>
        <v-card-subtitle>
          プロフィール
        </v-card-subtitle>
        <v-card-text class="body-1">
          {{ userInfo.profile }}
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
      }
    },
    created () {
      this.$store.dispatch('onAuth')
      this.$store.dispatch('fetchUserInfo', { authUserId: this.authUserId })
      this.$store.dispatch('fetchRoom', { roomId: this.roomId })
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
      }
    },
    methods: {
      editStart() {
        this.inputName = this.userInfo.name
        this.inputMessage = this.userInfo.message
        this.inputProfile = this.userInfo.profile
      },
      resetUserInfo() {
        this.inputName = ''
        this.inputMessage = ''
        this.inputProfile = ''
        this.dialog = false
      },
      editEnd() {
        this.$store.dispatch('setUserInfo', { userId: this.userInfo.id, name: this.inputName, message: this.inputMessage, profile: this.inputProfile })
        this.dialog = false
      },
      setUserInfo() {

      }
    }
  }
</script>