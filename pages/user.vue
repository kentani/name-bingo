<template>
  <v-card>
    <v-card-title class="mt-2 mb-6">ゲストユーザー</v-card-title>
    <v-card-subtitle>新しく部屋を作成する</v-card-subtitle>
    <v-card-text>
      <room-form @create-button-click="handleCreateButtonClick" />
    </v-card-text>
    <v-card-subtitle>作成した部屋</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(item, i) in items[0].items"
          :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
        <v-card-subtitle>参加した部屋</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(item, i) in items[1].items"
          :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-subtitle>このサイトについて</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(item, i) in appItems"
          :key="i"
          :to="item.to"
          color="deep-purple"
          router
          exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import RoomForm from '../components/room-form.vue'
export default {
  components: { RoomForm },
  data () {
    return {
      tab: null,
      items: [
        { title: "作成した部屋", items: ["イベント盛り上げ隊！！"] },
        { title: "参加した部屋", items: ["イベント盛り上げ隊！！", "ビンゴ！！"] },
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