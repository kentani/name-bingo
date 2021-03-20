<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="9" md="6">
        <v-alert
          dense
          text
          elevation="9"
          :color="setColor()"
          class="mb-0 text-center">
          <span class="font-weight-bold">{{ setText() }}</span>
        </v-alert>
      </v-col>
    </v-row>
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
                  :disabled="isReady || room.isReady"
                  :ripple="false"
                  @click="setSelected">
                  <v-icon color="deep-purple">mdi-account-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="font-weight-bold">参加者一覧</v-card-title>
                <v-card-subtitle v-if="selected.length < 16" class="pb-2">
                  あと <span class="title font-weight-bold deep-purple--text">{{ 16 - selected.length }}</span> 人選択してください
                </v-card-subtitle>
                <v-card-subtitle v-else-if="selected.length === 16" class="pb-2">
                  <v-icon color="deep-purple">mdi-check</v-icon><span class="title font-weight-bold deep-purple--text"></span>
                </v-card-subtitle>
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
                        :disabled="isReady || (!selected.includes(item.id) && selected.length === 16)"
                        :value="item.id">
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
                    :disabled="selected.length > 16"
                    @click="resetSelected">
                    Close
                  </v-btn>
                  <v-btn
                    rounded
                    color="deep-purple"
                    :dark="selected.length <= 16 && !isReady && !room.isReady"
                    :text="selected.length > 16 || isReady || room.isReady"
                    :disabled="selected.length > 16 || isReady || room.isReady"
                    @click="updateSelectList">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer />
            <v-switch
              v-model="isReady"
              inset
              hide-details
              :disabled="selectList.length !== 16 || room.isReady"
              class="my-2"
              color="deep-purple">
              <template v-slot:label>
                <span
                  class="overline font-weight-bold"
                  :class="[ isReady ? 'deep-purple--text' : 'grey--text' ]">
                  準備完了
                </span>
              </template>
            </v-switch>
          </v-card-actions>
          <v-divider class="mx-4" />
          <v-card-text>
            <v-row v-if="isReady">
              <v-col
                v-for="(item, i) in selectList"
                :key="i"
                cols="3"
                class="pa-1">
                <v-card
                  :flat="isReady && room.hitList && !room.hitList.includes(item.id)"
                  :class="[ room.hitList && !room.hitList.includes(item.id)? 'grey lighten-4' : 'yellow accent-4' ]"
                  height="100">
                  <v-card-title class="overline pa-1" style="line-height:15px">
                    {{ item.name }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <draggable
              v-else
              tag="div"
              class="row"
              group="cardList"
              v-model="selected"
              v-bind="draggableOptions"
              @start="handleDragStart"
              :move="handleMove"
              @end="handleDragEnd">
              <v-col
                v-for="(item, i) in selectList"
                :key="i"
                cols="3"
                class="pa-1">
                <v-card
                  :flat="setFlat(item.id)"
                  :class="[ room.hitList && !room.hitList.includes(item.id)? 'grey lighten-4' : 'yellow accent-4' ]"
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
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    layout: 'protected',
    components: { draggable },
    data () {
      return {
        dialogm1: '',
        dialog: false,
        selected: [],
        draggableOptions: { animation: 500, delay: 100 },
      }
    },
    async created () {
      await this.$store.dispatch('onAuth')
      await this.$store.dispatch('fetchPlayerListMap', { roomId: this.roomId })
      await this.$store.dispatch('fetchRoom', { roomId: this.roomId })
      await this.$store.dispatch('fetchPlayer', { roomId: this.roomId, playerId: this.playerId })
    },
    computed: {
      roomId() {
        return this.$route.params.roomId
      },
      playerId() {
        return this.$route.params.playerId
      },
      playerListMap() {
        return this.$store.getters.getPlayerListMap
      },
      room() {
        return this.$store.getters.getRoom
      },
      adminList() {
        if (!this.room.adminList) return []
        return this.room.adminList.map((v) =>{
          return this.playerListMap[v]
        }).filter(v => v)
      },
      joinedList() {
        if (!this.room.joinedList) return []
        return this.room.joinedList.map((v) =>{
          return this.playerListMap[v]
        }).filter(v => v)
      },
      player() {
        return this.$store.getters.getPlayer
      },
      selectList() {
        if (!this.player.selectList) return []
        return this.player.selectList.map((v) =>{
          return this.playerListMap[v]
        }).filter(v => v)
      },
      isReady: {
        get: function () {
          return this.room.readyList && this.room.readyList.includes(this.playerId) ? true : false
        },
        set: function (val) {
          if (val) {
            this.addReadyList()
          } else {
            this.removeReadyList()
          }
        }
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
      async updateSelectList() {
        await this.$store.dispatch('updateSelectList', { list: this.selected, playerId: this.playerId })
        this.selected = Object.assign([], this.selected, [])
        this.dialog = false
      },
      handleDragStart() {
        this.setSelected()
      },
      handleMove(e) {
        const { index, futureIndex } = e.draggedContext
        this.movingIndex = index
        this.futureIndex = futureIndex
        return false // disable sort
      },
      async handleDragEnd() {
        this.futureItem = this.selected[this.futureIndex]
        this.movingItem = this.selected[this.movingIndex]
        const _items = Object.assign([], this.selected)
        _items[this.futureIndex] = this.movingItem
        _items[this.movingIndex] = this.futureItem

        this.selected = _items

        await this.$store.dispatch('updateSelectList', { list: this.selected, playerId: this.playerId })
        this.selected = Object.assign([], this.selected, [])
      },
      addReadyList() {
        if (this.room.readyList && this.room.readyList.includes(this.playerId)) return
        this.$store.dispatch('addReadyList', { roomId: this.roomId, playerId: this.playerId })
      },
      removeReadyList() {
        if (this.room.readyList && !this.room.readyList.includes(this.playerId)) return
        this.$store.dispatch('removeReadyList', { roomId: this.roomId, playerId: this.playerId })
      },
      setColor() {
        if (this.room.bingoList && this.room.bingoList.includes(this.playerId)) {
          return 'yellow accent-4'
        } else if (this.room.reachList && this.room.reachList.includes(this.playerId)) {
          return 'deep-purple'
        } else if (this.room.isReady) {
          return 'deep-purple'
        } else if (this.isReady) {
          return 'grey'
        } else {
          return 'red darken-4'
        }
      },
      setText() {
        if (this.room.bingoList && this.room.bingoList.includes(this.playerId)) {
          return 'ビンゴ!!!'
        } else if (this.room.reachList && this.room.reachList.includes(this.playerId)) {
          return 'リーチ!!!'
        } else if (this.room.isReady) {
          return 'ビンゴ開催中'
        } else if (this.isReady) {
          return 'ビンゴの開催を待ってください'
        } else {
          return 'カードの準備をしてください'
        }
      },
      setFlat(playerId) {
        if (this.room.hitList && this.room.hitList.includes(playerId)) {
          return false
        } else if (this.room.isReady || this.isReady) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>