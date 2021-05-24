import { useCookies } from '@/shared/src/composables/use-plugins'
import { VisitorContextType } from '@/shared/src/restriction-tree/visitor-context'

const ID = 'context'
export function saveContextToCookie(context: VisitorContextType): void {
  useCookies().set(ID, JSON.stringify(context), {
    path: '/',
  })
}

export function loadContextFromCookie(): VisitorContextType | undefined {
  return useCookies().get(ID) ?? undefined
}
