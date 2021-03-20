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
                <v-icon color="deep-purple">mdi-account-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="font-weight-bold">参加者一覧</v-card-title>
              <v-card-subtitle v-if="selected.length === 0" class="pb-2">
                カードに加える人を <span class="title font-weight-bold deep-purple--text">16</span> 人選択してください
              </v-card-subtitle>
              <v-card-subtitle v-else-if="selected.length < 16" class="pb-2">
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
                      :disabled="switch1"
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
                  :dark="selected.length <= 16 && !switch1"
                  :text="selected.length > 16 || switch1"
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
            tag="div"
            class="row"
            group="cardList"
            v-model="selected"
            v-bind="draggableOptions"
            @start="setSelected"
            @end="updateSelectList">
            <v-col
              v-for="(item, i) in selectList"
              :key="i"
              cols="3"
              class="pa-1">
              <v-card
                :flat="room.hitList && !room.hitList.includes(item.id)"
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
    <!-- <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      centered
      color="grey">
      <span class="title font-weight-bold">{{ text }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-row>
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
        switch1: false,
        snackbar: true,
        text: 'リーチ！',
        timeout: 4000,
        draggableOptions: { animation: 300, delay: 0 },
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
    }
  }
</script>

<style scoped>
.ribbon19-wrapper {
  display: block;
  position: relative;
  margin: 15px auto;
  padding: 10px 0;
  width: 300px;
  height: 150px;
  background: #f1f1f1;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
}

.ribbon19-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 85px;
  height: 85px;
  overflow: hidden;
  }

.ribbon19 {
  display: inline-block;
  position: absolute;
  padding: 5px 0;
  left: -24px;
  top: 20px;
  width: 160px;
  text-align: center;
  font-size: 18px;
  line-height: 16px;
  background: #39c3d4;
  color: #fff;
  letter-spacing: 0.05em;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  box-shadow: 0 0 0 2px rgb(57, 195, 212);
  border-top: dashed 1px rgba(255, 255, 255, 0.65);
  border-bottom: dashed 1px rgba(255, 255, 255, 0.65);
}
</style>