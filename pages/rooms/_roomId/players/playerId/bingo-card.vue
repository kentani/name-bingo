<template>
  <div>
    <v-row justify="center" class="pt-6">
      <v-col cols="12" sm="9" md="6">
        <v-card>
          <p
            class="py-2 my-0 grey lighten-2 display-2 font-weight-bold text-center">
            BINGO CARD
          </p>
          <v-card-actions>
            <v-btn
              icon
              :ripple="false">
              <v-icon>mdi-account-multiple</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn
              rounded
              outlined
              small
              :ripple="false"
              @click="setUser">
              自動作成
            </v-btn>
            <v-btn
              rounded
              outlined
              small
              color="deep-purple"
              :ripple="false">
              準備完了
            </v-btn>
            <v-btn
              rounded
              outlined
              small
              color="red"
              :ripple="false"
              @click="resetUser">
              リセット
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <draggable
              tag="v-row"
              group="cardList"
              v-bind="draggableOptions">
              <v-col
                v-for="(item, i) in userList"
                :key="i"
                cols="3"
                class="pa-1">
                <v-card
                  :flat="!room.resultList.some(el => el.id === userItem(item, i).id)"
                  :dark="room.resultList.some(el => el.id === userItem(item, i).id)"
                  :class="[ room.resultList.some(el => el.id === userItem(item, i).id) ? 'deep-purple' : 'grey lighten-4' ]"
                  height="100">
                  <v-card-title class="overline py-1" style="line-height:15px">
                    {{ userInfo.bingoUserList[i] ? userInfo.bingoUserList[i].name : item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card flat>
          <v-card-text>
            <draggable
              tag="v-row"
              group="cardList"
              class="flex-nowrap"
              style="overflow-x: scroll;"
              v-bind="draggableOptions">
              <v-col
                v-for="(item, i) in room.joinedUserList"
                :key="i"
                cols="3"
                class="pa-1">
                <v-card
                  hover
                  class="grey lighten-4 overline py-1"
                  height="100">
                  <v-card-title class="overline py-1" style="line-height:15px">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
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