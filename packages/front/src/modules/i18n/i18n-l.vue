<script lang="ts">
import { defineComponent, h, VNode } from 'vue'

import { useCustomI18n } from '@/front/src/modules/i18n/composables'

const regex = new RegExp('<\\s*?i\\s*?id="(.*?)"\\s*?>(.*?)<\\s*?/\\s*?i\\s*?>')
export default defineComponent({
  props: {
    keypath: { type: String, required: true },
    tag: {
      type: String,
      default: 'span',
    },
  },
  setup(props, { slots }) {
    const { t } = useCustomI18n()
    let text = t(props.keypath)

    const out: Array<string | VNode | VNode[]> = []
    let iterate = true
    let match: ReturnType<typeof regex['exec']>

    while (iterate) {
      match = regex.exec(text)

      if (!match) {
        out.push(text)
        iterate = false
        continue
      }

      out.push(text.slice(0, match.index))

      const slot = slots[match[1]]
      if (slot) {
        out.push(slot({ innerContent: match[2] }))
      }

      text = text.slice(match.index + match[0].length)
    }

    return () => h(props.tag, out)
  },
})
</script>
