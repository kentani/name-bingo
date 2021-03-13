<template>
  <v-card>
    <v-card-title class="mt-2 mb-6">イベント盛り上げ隊！！</v-card-title>
    <v-card-subtitle>作成者</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <v-card
            flat
            class="grey lighten-4">
              <v-card-title class="subtitle-1 py-1">
                谷
              </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle>管理者</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="2">
          <v-card
            flat
            class="grey lighten-4">
              <v-card-title class="subtitle-1 py-1">
                {{ item.name }}
              </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle>管理者を追加する</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="8" align="center">
          <v-text-field
            dense
            color="deep-purple"
            placeholder="追加するユーザーのIDを入力してください"
            filled />
        </v-col>
        <v-col cols="4" align="center">
          <v-btn
            text
            color="deep-purple"
            :ripple="false">
            追加する
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        { name: "谷"},
        { name: "佐藤"},
      ],
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