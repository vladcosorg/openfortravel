import omit from 'lodash/omit'

import { useCookies } from '@/shared/src/composables/use-plugins'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

const ID = 'context'
export function saveContextToCookie(
  context: VisitorProfile,
  searchId: string | null,
): void {
  useCookies().set(
    ID,
    JSON.stringify(Object.assign(searchId ? { searchId } : {}, context)),
    {
      path: '/',
    },
  )
}

export function loadContextFromCookie(
  searchId?: string,
): Partial<VisitorProfile> | undefined {
  const cookies =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (useCookies().get(ID) as VisitorProfile & { searchId?: string }) ??
    undefined

  if (cookies === undefined) {
    return undefined
  }

  if (searchId !== undefined && cookies.searchId !== searchId) {
    return undefined
  }

  return omit(cookies, ['searchId'])
}
