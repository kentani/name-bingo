<template>
  <div v-if="room.id">
    <v-row>
      <v-col>
        <p class="body-1">{{ room.name }}を作成しました</p>
        <p class="body-1">人名ビンゴを始めましょう！</p>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="8" align="center">
      <v-text-field
        v-model="url"
        readonly
      ></v-text-field>
      </v-col>
      <v-col cols="4" align="center">
        <v-btn class="my-2 amber" @click="">
          コピー
        </v-btn>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col align="center">
        <v-btn
          nuxt
          text
          x-large
          color="deep-purple"
          :to="'/rooms/' + room.id + '/settings'">
          作成した部屋に入る
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      default: () => ({})
    },
  }
}
</script>