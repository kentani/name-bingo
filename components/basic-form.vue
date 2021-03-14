<template>
  <v-row>
    <v-col cols="8" align="center">
      <v-text-field
        v-model="inputName"
        dense
        hide-details
        color="deep-purple"
        :disabled="disabled"
        :placeholder="placeholder"
        filled />
    </v-col>
    <v-col cols="4" align="center">
      <v-btn
        text
        color="deep-purple"
        :disabled="!inputName"
        :ripple="false"
        @click="handleCreateButtonClick">
        {{ text }}
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
    props: {
      text: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        required: false
      },
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