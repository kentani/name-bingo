<template>
  <v-card flat>
    <v-card-title class="mt-2 mb-6">イベント盛り上げ隊！！</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8" align="center">
          <v-text-field
            dense
            color="deep-purple"
            placeholder="名前を入力してください"
            filled />
        </v-col>
        <v-col cols="4" align="center">
          <v-btn
            text
            color="deep-purple"
            :ripple="false">
            参加する
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>