<template>
  <v-card flat>
    <v-card-title class="mt-2 mb-6">イベント盛り上げ隊！！</v-card-title>
    <v-card-text>
      <v-tabs
        v-model="tab"
        color="deep-purple">
        <v-tabs-slider color="deep-purple"></v-tabs-slider>
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
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        { title: "ビンゴカード", items: ["イベント盛り上げ隊！！"] },
        { title: "自己紹介", items: ["イベント盛り上げ隊！！", "ビンゴ！！"] },
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