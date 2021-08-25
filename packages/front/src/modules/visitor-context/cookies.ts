import { useCookies } from '@/shared/src/composables/use-plugins'
import { ProfileContext } from '@/shared/src/models/profile-context/profile-context'

const ID = 'context'
export function saveContextToCookie(context: ProfileContext): void {
  useCookies().set(ID, JSON.stringify(context), {
    path: '/',
  })
}

export function loadContextFromCookie(): Partial<ProfileContext> | undefined {
  return (useCookies().get(ID) as ProfileContext) ?? undefined
}
