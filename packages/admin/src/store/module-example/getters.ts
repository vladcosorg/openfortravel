import { GetterTree } from 'vuex'

import { StateInterface } from '..'

import { ExampleStateInterface } from './state'

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
}

export default getters
