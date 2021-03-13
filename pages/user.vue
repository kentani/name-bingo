<template>
  <v-card>
    <v-card-title class="mt-2 mb-6">ゲストユーザー</v-card-title>
    <v-card-subtitle>新しく部屋を作成する</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="8" align="center">
          <v-text-field
            dense
            color="deep-purple"
            placeholder="部屋の名前を入力してください"
            filled />
        </v-col>
        <v-col cols="4" align="center">
          <v-btn
            text
            color="deep-purple"
            :ripple="false">
            作成する
          </v-btn>
        </v-col>
      </v-row>
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
export default {
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
  },
  computed: {
  },
  methods: {
  }
}
</script>