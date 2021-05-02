import type { Path, TranslateResult, Values } from 'vue-i18n'

import { useVueI18n } from '@/shared/src/composables/use-plugins'

const { t } = useVueI18n()

export function translateBlock(
  translatePath: Path,
  values: Values,
  branches: Record<string, string | boolean> = {},
): string {
  const result = t(translatePath, values) as string
  if (typeof result === 'object' && !Array.isArray(result)) {
    const out = []
    for (const key of Object.keys(result)) {
      const keyBranch = branches[key]
      if (keyBranch !== undefined) {
        if (!keyBranch) {
          continue
        }
        out.push(t(`${translatePath}.${key}`, values))
      } else {
        out.push(t(`${translatePath}.${key}`, values))
      }
    }
    return out.join('')
  }

  return result
}
export type QAItem = {
  id?: string
  question: string | TranslateResult
  answer: string | TranslateResult
}
