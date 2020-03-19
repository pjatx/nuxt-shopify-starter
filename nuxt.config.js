require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    baseUrl: process.env.BASE_URL
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-lazyload',
    '~/plugins/currency',
    { src: '~/plugins/vuex-persist.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-shopify',
    '@bazzite/nuxt-optimized-images',
    'nuxt-buefy'
  ],

  // Load some mixins and variables globally
  styleResources: {
    scss: [
      'node_modules/bulma-scss/utilities/_all.scss',
      '~/assets/styles/utilities/_all.scss',
      '~/assets/styles/utilities/_all.scss',
      '~/assets/styles/_all.scss'
    ]
  },

  optimizedImages: {
    optimizeImages: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  shopify: {
    /**
     * Your shopify domain
     */
    domain: process.env.SHOPIFY_DOMAIN,

    /**
     * Your shopify storefront access token
     */
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,

    /**
     * This will be larger than the optimized version, as it will contain all fields that are available in the
     * Storefront API. (https://help.shopify.com/en/api/custom-storefronts/storefront-api/reference)
     * This should only be used when you need to add custom queries to supplement the JS Buy SDK queries.
     */
    unoptimized: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
