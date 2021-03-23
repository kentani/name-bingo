import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - name-bingo',
    title: 'Name Bingo',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '名前ビンゴゲームを開催できる無料のウェブアプリです。ユーザー登録なしで利用できます。' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Name Bingo'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://name-bingo-2b836.web.app'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '名前ビンゴゲームを開催できる無料のウェブアプリです。ユーザー登録なしで利用できます。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/static/title.png'
      },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Name Bingo' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // "@/plugins/vue-draggable"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/dotenv',
      { filename: process.env.NODE_ENV !== 'production' ? ".env.dev" : ".env.prod" },
    ],
    'nuxt-clipboard2',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  target: 'static',

  generate: {
    subFolders: false
  }
}
