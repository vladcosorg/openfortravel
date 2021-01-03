interface Flavoring<FlavorT> {
  _type?: FlavorT
}

interface Branding<BrandT> {
  _type: BrandT
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>
export type Brand<T, BrandT> = T & Branding<BrandT>
