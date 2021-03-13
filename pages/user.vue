<template>
  <v-card>
    <v-card-title class="mt-2 mb-6">ゲストユーザー</v-card-title>
    <v-card-subtitle>新しく部屋を作成する</v-card-subtitle>
    <v-card-text>
      <room-form @create-button-click="handleCreateButtonClick" />
    </v-card-text>
    <v-card-subtitle>作成した部屋</v-card-subtitle>
    <v-card-text>
      <link-list :items="createdRoomList" />
    </v-card-text>
    <v-card-subtitle>参加した部屋</v-card-subtitle>
    <v-card-text>
      <link-list :items="joindRoomList" />
    </v-card-text>
    <v-card-subtitle>このサイトについて</v-card-subtitle>
    <v-card-text>
      <link-list :with-icon="true" :items="appItems" />
    </v-card-text>
  </v-card>
</template>

<script>
import BasicList from '../components/link-list.vue'
import RoomForm from '../components/room-form.vue'
export default {
  components: { RoomForm, BasicList },
  data () {
    return {
      tab: null,
      createdRoomList: [
        { title: "イベント盛り上げ隊！！", to: "/rooms/1/players/1/bingo-card" },
      ],
      joindRoomList: [
        { title: "イベント盛り上げ隊！！", to: "/rooms/1/players/1/bingo-card" },
        { title: "ビンゴ", to: "/rooms/1/players/1/bingo-card" },
      ],
      appItems: [
        {
          icon: 'mdi-apps',
          title: 'ビンゴの始め方',
          to: '/'
        },
        {
          icon: 'mdi-note',
          title: '利用規約',
          to: '/'
        },
        {
          icon: 'mdi-github',
          title: 'ソースコード',
          to: '/'
        },
      ]
    }
  },
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  computed: {
    isLogind () {
      return this.$store.getters.getIsLogind
    },
    userId () {
      return this.$store.getters.getUserId
    }
  },
  methods: {
    handleCreateButtonClick (args) {
      this.$store.dispatch('createRoom', { userId: this.userId, name: args.name })
    },
  }
}
</script>