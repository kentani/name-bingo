<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card class="mt-4">
        <p
          class="py-2 grey lighten-2 display-2 font-weight-bold text-center">
          BINGO CARD
        </p>
        <v-card-text>
          <v-row justify="center" class="my-3">
            <v-col
              v-for="(item, i) in userList"
              :key="i"
              cols="3">
              <v-card
                :flat="!room.resultList.some(el => el.id === userItem(item, i).id)"
                :dark="room.resultList.some(el => el.id === userItem(item, i).id)"
                :class="[ room.resultList.some(el => el.id === userItem(item, i).id) ? 'deep-purple' : 'grey lighten-4' ]"
                height="100">
                <v-card-title class="overline py-1">
                  {{ userInfo.bingoUserList[i] ? userInfo.bingoUserList[i].name : item.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
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
        userList: [
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''},
        ]
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
      userItem(item, index) {
        return this.userInfo.bingoUserList[index] ? this.userInfo.bingoUserList[index] : item
      }
    }
  }
</script>