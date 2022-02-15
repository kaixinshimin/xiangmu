import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'xx',
  },
  buildModules: [
    '@vueuse/core/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    "assets/scss/index.scss"
  ],
  components: [
    '~/components/',
    // {
    //   path: 'node_modules/element-plus/lib/components/*/index.js',
    // }
  ],
  //仅在服务端可以访问 
  privateRuntimeConfig: { API_BASE: 'http://shadowplay.top' },
  vite: {
    logLevel: 'info',
    server: {
      proxy: {
        "/user": {
          target: "http://shadowplay.top",
          changeOrigin: true,
        },
        "/product": {
          target: "http://shadowplay.top",
          changeOrigin: true,
        },
        "/news": {
          target: "http://shadowplay.top",
          changeOrigin: true,
        },
        "/car": {
          target: "http://shadowplay.top",
          changeOrigin: true,
        },
        "/infos": {
          target: "http://shadowplay.top",
          changeOrigin: true,
        },
      },
    },
  },
})
