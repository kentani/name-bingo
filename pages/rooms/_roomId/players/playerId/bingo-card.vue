<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card flat>
          <v-card-text>
            <draggable
              tag="v-row"
              group="cardList"
              class="flex-nowrap pt-6 pb-3"
              style="overflow-x: scroll;"
              v-bind="draggableOptions">
              <v-col
                v-for="(item, i) in room.joinedUserList"
                :key="i"
                cols="3">
                <v-card
                  hover
                  class="grey lighten-4"
                  height="100">
                  <v-card-title class="overline py-1">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card>
          <p
            class="py-2 grey lighten-2 display-2 font-weight-bold text-center">
            BINGO CARD
          </p>
          <v-card-text>
            <draggable
              tag="v-row"
              group="cardList"
              v-bind="draggableOptions">
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
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-3">
      <v-btn
        text
        x-large
        :ripple="false"
        @click="setUser">
        ユーザーセット
      </v-btn>
      <v-btn
        text
        x-large
        color="red"
        :ripple="false"
        @click="isReach([0, 5, 10, 15])">
        ユーザーリセット
      </v-btn>
    </v-row>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    layout: 'room',
    components: { draggable },
    data () {
      return {
        draggableOptions: { animation: 300, delay: 0 },
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
        ],
        checkList: [
          [0,1,2,3],
          [4,5,6,7],
          [8,9,10,11],
          [12,13,14,15],
          [0,4,8,12],
          [1,5,9,13],
          [2,6,10,14],
          [3,7,11,15],
          [0,5,10,15],
          [3,6,9,12],
        ],
        isReach: false
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
      },
      setUser() {
        this.$store.dispatch('setUser', { userId: this.userInfo.id, list: this.room.joinedUserList })
      },
      resetUser() {
        this.$store.dispatch('setUser', { userId: this.userInfo.id, list: [] })
      },
      reachCheck(winItemList) {
        let returnVal = false
        this.checkList.forEach(function(list) {
          let ary = list.filter((val) => {
            return winItemList.indexOf(val) !== -1
          })
          if (ary.length === 3) {
            this.isReach = true
          }
        })
      }
    }
  }
</script>