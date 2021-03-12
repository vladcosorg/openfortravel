import { getCurrentInstance } from '@vue/composition-api'
import Vue from 'vue'
import { NavigationGuard } from 'vue-router'
import { ComponentOptions } from 'vue/types/umd'

export function onHook(
  name: keyof ComponentOptions<Vue>,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any) => void,
): void {
  const vm = getCurrentInstance()
  const merge = Vue.config.optionMergeStrategies[name]
  if (vm && merge) {
    const prototype = Object.getPrototypeOf(vm.$options)
    prototype[name] = merge(vm.$options[name], callback)
  }
}

export function onBeforeRouteUpdate(callback: NavigationGuard<Vue>): void {
  return onHook('beforeRouteUpdate', callback)
}

export function onBeforeRouteLeave(callback: NavigationGuard<Vue>): void {
  return onHook('beforeRouteLeave', callback)
}
