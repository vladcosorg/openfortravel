// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare module 'iso-639-1/src/data'
