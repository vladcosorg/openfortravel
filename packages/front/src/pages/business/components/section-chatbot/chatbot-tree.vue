<style lang="scss" scoped>
.scroll-container {
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: $breakpoint-xs-max) {
    overflow-y: hidden;
    $pad: map-get($space-md, 'x');
    margin-left: -$pad;
    margin-right: -$pad;
    border-radius: 0 !important;
  }
}
</style>

<script lang="ts">
import { defineComponent, h, onMounted, Ref, ref, toRef } from 'vue'

import { useCustomI18n } from '@/front/src/modules/i18n/composables'
import CustomerMessage from '@/front/src/pages/business/components/section-chatbot/customer-message.vue'
import SupportMessage from '@/front/src/pages/business/components/section-chatbot/support-message.vue'
import { useDeferredCallback } from '@/shared/src/composables/use-misc'

const { tm } = useCustomI18n()
type MessageTree = string[][]
const messageTree: MessageTree = tm('page.forBusiness.sections.chatbot.chat')
function* iterator(destinationTree: Ref<MessageTree>) {
  for (const [index, treeItem] of messageTree.entries()) {
    destinationTree.value[index] = []
    for (const [messageIndex, message] of treeItem.entries()) {
      destinationTree.value[index].push(message)
      yield messageIndex
    }
  }
}

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
    },
  },
  setup(props) {
    const renderedTree = ref<MessageTree>([])
    const wrapperRef = ref()

    const messageIterator = iterator(renderedTree)

    const refocus = () => {
      wrapperRef.value.scrollTo({
        top: wrapperRef.value.scrollHeight,
        behavior: 'smooth',
      })
    }

    const next = useDeferredCallback(
      () => messageIterator.next(),
      toRef(props, 'isVisible'),
    )

    onMounted(() => messageIterator.next())

    return () => {
      let isCustomer = false
      return h(
        'div',
        {
          class: 'scroll-container rounded-borders bg-elevation-2 q-pa-lg',
          ref: wrapperRef,
        },
        {
          default: () =>
            renderedTree.value.map((messageGroup, key) => {
              isCustomer = !isCustomer

              return messageGroup.map((message, subkey) =>
                h(
                  isCustomer ? CustomerMessage : SupportMessage,
                  {
                    key: `${key}-${subkey}`,
                    onVnodeUpdated: refocus,
                    onReady: () => {
                      next()
                      refocus()
                    },
                  },
                  {
                    default: () => h('span', { innerHTML: message }),
                  },
                ),
              )
            }),
        },
      )
    }
  },
})
</script>
