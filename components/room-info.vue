<template>
  <div v-if="room.id">
    <v-row>
      <v-col>
        <p class="body-1">{{ room.name }}を作成しました</p>
        <p class="body-1">人名ビンゴを始めましょう！</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn
          nuxt
          dark
          text
          rounded
          color="deep-purple"
          :to="'/rooms/' + room.id + '/settings'">
          <span class="font-weight-bold">作成した部屋に入る</span>
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