<template>
  <v-row>
    <v-col cols="8" align="center">
      <v-text-field
        v-model="inputName"
        dense
        color="deep-purple"
        placeholder="部屋の名前を入力してください"
        filled />
    </v-col>
    <v-col cols="4" align="center">
      <v-btn
        text
        color="deep-purple"
        :disabled="!inputName"
        :ripple="false"
        @click="handleCreateButtonClick">
        作成する
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        inputName: ''
      }
    },
    methods: {
      handleCreateButtonClick() {
        if (this.inputName === '') return
        this.$emit("create-button-click", {name: this.inputName})
        this.inputName = ''
      },
    }
  }
</script>