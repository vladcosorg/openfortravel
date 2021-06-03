import { useCookies } from '@/shared/src/composables/use-plugins'
import { VisitorProfile } from '@/shared/src/restriction-tree/visitor-profile'

const ID = 'context'
export function saveContextToCookie(context: VisitorProfile): void {
  useCookies().set(ID, JSON.stringify(context), {
    path: '/',
  })
}

export function loadContextFromCookie(): VisitorProfile | undefined {
  return useCookies().get(ID) ?? undefined
}
