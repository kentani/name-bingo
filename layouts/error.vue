<template>
  <v-row justify="center" class="my-6 py-6">
    <v-col cols="12">
      <v-card flat color="grey lighten-4" class="my-6 py-6">

        <p
          v-if="error.statusCode === 404"
          class="py-2 my-0 display-3 font-weight-bold text-center"
          style="text-shadow:0px 0px 1px #FFF, 2px 2px 4px rgba(0,0,0,0.3)">
          {{ pageNotFound }}
        </p>

        <p
          v-else
          class="py-2 my-0 display-3 font-weight-bold text-center"
          style="text-shadow:0px 0px 1px #FFF, 2px 2px 4px rgba(0,0,0,0.3)">
          {{ otherError }}
        </p>

        <v-card-actions class="py-2 mx-2">
        <v-row justify="center" class="my-3">
          <v-btn
            v-if="!starting"
            color="deep-purple"
            dark
            x-large
            rounded
            :ripple="false"
            to="/"
            nuxt>
            トップ画面
          </v-btn>
        </v-row>
      </v-card-actions>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
