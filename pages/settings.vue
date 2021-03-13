<template>
  <v-card>
    <v-card-title class="mt-2 mb-6">ゲストユーザー</v-card-title>
    <v-card-subtitle>新しく部屋を作成する</v-card-subtitle>
    <v-card-text>
      <v-row no-gutters class="mt-2 mb-6">
        <v-text-field
          dense
          class="mx-1"
          placeholder="部屋の名前を入力してください"
          filled />
        <v-btn
        class="mx-1"
        :ripple="false">
        作成する
      　</v-btn>
      </v-row>
      <v-tabs v-model="tab">
        <v-tab
          v-for="item in items"
          :key="item.title">
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item.title">
          <v-list>
            <v-list-item
              v-for="(item, i) in item.items"
              :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-subtitle>このサイトについて</v-card-subtitle>
    <v-list>
      <v-list-item
        v-for="(item, i) in appItems"
        :key="i"
        :to="item.to"
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