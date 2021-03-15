<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-card>
          <p
            class="py-2 my-0 grey lighten-2 display-2 font-weight-bold text-center">
            BINGO CARD
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
                  @click="setSelected">
                  <v-icon color="deep-purple">mdi-account-multiple</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="mb-2 font-weight-bold">参加者一覧</v-card-title>
                <v-card-subtitle>参加者：{{ room.joinedUserList.length }} | 選択中：{{selected.length}}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text class="pa-2">
                  <v-card
                    v-for="(item, i) in room.joinedUserList"
                    :key="i"
                    class="my-2">
                    <v-card-title class="font-weight-bold mb-3">
                      {{ item.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      プロフィール
                    </v-card-subtitle>
                    <v-card-text>
                      {{ item.profile }}
                    </v-card-text>
                    <v-card-subtitle>
                      ひとこと
                    </v-card-subtitle>
                    <v-card-text>
                      {{ item.oneMessage }}
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions class="py-0 mx-2">
                      <v-spacer />
                      <v-switch
                        v-model="selected"
                        inset
                        hide-details
                        class="my-2"
                        color="deep-purple"
                        :value="item">
                        <template v-slot:label>
                          <span
                            class="overline font-weight-bold"
                            :class="[ switch1 ? 'deep-purple--text' : 'grey--text' ]">
                            加える
                          </span>
                        </template>
                      </v-switch>
                    </v-card-actions>
                  </v-card>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn
                    text
                    color="grey"
                    @click="resetSelected">
                    Close
                  </v-btn>
                  <v-btn
                    text
                    color="deep-purple"
                    :disabled="selected.length > 16"
                    @click="setBingoUserList">
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
                  準備完了
                </span>
              </template>
            </v-switch>
          </v-card-actions>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <draggable
              tag="v-row"
              group="cardList"
              v-model="selected"
              v-bind="draggableOptions"
              @start="setSelected"
              @end="setBingoUserList">
              <v-col
                v-for="(item, i) in userInfo.bingoUserList"
                :key="i"
                cols="3"
                class="pa-1">
                <v-card
                  :flat="!room.resultList.some(el => el.id === userItem(item, i).id)"
                  :class="[ room.resultList.some(el => el.id === userItem(item, i).id) ? 'yellow accent-4' : 'grey lighten-4' ]"
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
        dialogm1: '',
        dialog: false,
        selected: [],
        switch1: false,
        draggableOptions: { animation: 300, delay: 0 },
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
      },
    },
    methods: {
      userItem(item, index) {
        return this.userInfo.bingoUserList[index] ? this.userInfo.bingoUserList[index] : item
      },
      setUser() {
        this.$store.dispatch('setUser', { userId: this.userInfo.id, list: this.room.joinedUserList })
        this.selected = Object.assign([], this.selected, [])
      },
      resetUser() {
        this.$store.dispatch('setUser', { userId: this.userInfo.id, list: [] })
        this.selected = Object.assign([], this.selected, [])
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
      },
      setSelected() {
        this.selected = Object.assign([], this.selected, this.userInfo.bingoUserList)
      },
      resetSelected() {
        this.selected = Object.assign([], this.selected, [])
        this.dialog = false
      },
      setBingoUserList() {
        this.$store.dispatch('setUser', { userId: this.userInfo.id, list: this.selected })
        this.selected = Object.assign([], this.selected, [])
        this.dialog = false
      }
    }
  }
</script>