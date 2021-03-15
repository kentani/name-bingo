<template>
  <v-row justify="center" class="pt-6">
    <v-col cols="12" sm="9" md="6">
      <v-card>
        <p
          class="py-2 my-0 grey lighten-2 display-2 font-weight-bold text-center">
          PROFILE
        </p>
        <v-card-actions class="py-0 mx-2">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :ripple="false"
            :disabled="switch1"
            @click="setSelected">
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
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
        <v-divider class="mx-4"></v-divider>
        <v-card-title class="font-weight-bold mb-3">
          {{ userInfo.name }}
        </v-card-title>
        <v-card-subtitle>
          プロフィール
        </v-card-subtitle>
        <v-card-text>
          {{ userInfo.profile }}
        </v-card-text>
        <v-card-subtitle>
          ひとこと
        </v-card-subtitle>
        <v-card-text>
           {{ userInfo.oneMessage }}
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
        selected: [],
        switch1: false,
        result: {name: '？？'},
        starting: false,
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
      },
    },
    methods: {
    }
  }
</script>