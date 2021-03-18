<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6">
      <v-card elevation="18">
        <p
          class="py-2 my-0 grey lighten-2 display-1 font-weight-bold text-center">
          BINGO CARD
        </p>
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
                :ripple="false"
                @click="setSelected">
                <v-icon color="deep-purple">mdi-account-multiple</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="font-weight-bold">参加者一覧</v-card-title>
              <v-card-text>参加者：{{ joinedList ? joinedList.length : 0 }}　　選択中：{{selected.length}}</v-card-text>
              <v-divider />
              <v-card-text class="pa-2">
                <v-card
                  v-for="(item, i) in joinedList"
                  :key="i"
                  class="my-2">
                  <v-card-title class="title font-weight-bold" :class="[ item.note ? 'pb-1' : 'pb-3' ]">{{ item.name }}</v-card-title>
                  <v-card-text style="white-space: pre-line;">{{ item.note }}</v-card-text>
                  <v-card-subtitle class="body-2 font-weight-bold pt-0" :class="[ item.profile ? 'pb-1' : 'pb-3' ]">プロフィール</v-card-subtitle>
                  <v-card-text style="white-space: pre-line;">{{ item.profile }}</v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions class="py-0 mx-2">
                    <v-spacer />
                    <v-switch
                      v-model="selected"
                      inset
                      hide-details
                      class="my-1"
                      color="deep-purple"
                      :disabled="switch1"
                      :value="item">
                      <template v-slot:label>
                        <span
                          class="overline font-weight-bold">
                          加える
                        </span>
                      </template>
                    </v-switch>
                  </v-card-actions>
                </v-card>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  rounded
                  @click="resetSelected">
                  Close
                </v-btn>
                <v-btn
                  rounded
                  dark
                  color="deep-purple"
                  :disabled="selected.length > 16 || switch1"
                  @click="updateSelectList">
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
            @end="updateSelectList">
            <v-col
              v-for="(item, i) in player.selectList"
              :key="i"
              cols="3"
              class="pa-1">
              <v-card
                :flat="!item.isHit"
                :class="[ !item.isHit ? 'grey lighten-4' : 'yellow accent-4' ]"
                height="100">
                <v-card-title class="overline pa-1" style="line-height:15px">
                  {{ item.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </draggable>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
      await this.$store.dispatch('fetchPlayer', { roomId: this.roomId, authId: this.authId })
      await this.$store.dispatch('fetchPlayerList', { roomId: this.roomId })
    },
    computed: {
      authId() {
        return this.$store.getters.getAuthId
      },
      loggedIn() {
        return this.$store.getters.getLoggedIn
      },
      room() {
        return this.$store.getters.getRoom
      },
      roomId() {
        return this.$route.params.roomId
      },
      player() {
        return this.$store.getters.getPlayer
      },
      playerId() {
        return this.$route.params.playerId
      },
      playerList() {
        return this.$store.getters.getPlayerList
      },
      joinedList() {
        return this.playerList.length > 0 ? this.playerList.filter(v => v.isJoined ) : this.playerList
      }
    },
    methods: {
      setSelected() {
        this.selected = Object.assign([], this.selected, this.player.selectList)
      },
      resetSelected() {
        this.selected = Object.assign([], this.selected, [])
        this.dialog = false
      },
      updateSelectList() {
        this.$store.dispatch('updateSelectList', { list: this.selected, playerId: this.playerId })
        this.selected = Object.assign([], this.selected, [])
        this.dialog = false
      }
    }
  }
</script>