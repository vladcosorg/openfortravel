import type { QBreadcrumbsEl } from 'quasar'

interface Flavoring<FlavorT> {
  _type?: FlavorT
}

interface Branding<BrandT> {
  _type: BrandT
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>
export type Brand<T, BrandT> = T & Branding<BrandT>

export type ExtractArgs<T> = T extends (...args: infer U) => T ? U : never

export type Entries<T> = Array<
  {
    [K in keyof T]: [K, T[K]]
  }[keyof T]
>

export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>

export interface OptionListItem<V> {
  value: V
  label: string
}

export type OptionList<V = string> = Array<OptionListItem<V>>
export type AnyArgFunction<T = unknown> = (...args: any[]) => T

export type Breadcrumbs = ReadonlyArray<
  Pick<QBreadcrumbsEl, 'to' | 'icon' | 'label'>
>
