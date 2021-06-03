// eslint-disable-next-line unused-imports/no-unused-imports-ts,@typescript-eslint/no-unused-vars
import Vue from 'vue'

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $style: Record<string, string>
    $isDev: boolean
  }
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}
