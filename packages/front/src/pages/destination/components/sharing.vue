<template>
  <div v-if="sharing">
    {{ $t('components.sharing.prefix') }}
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitter-user="sharing.twitterUser"
      style="text-decoration: none"
    >
      <q-chip
        text-color="grey-3"
        square
        :style="{
          backgroundColor: network.color,
          filter: 'grayscale(30%) contrast(150%) brightness(80%)',
        }"
        :icon="network.icon"
        clickable
      >
        <span style="font-weight: bold; text-shadow: 1px 1px 2px #3e3e3e">
          {{ network.name }}
        </span>
      </q-chip>
    </ShareNetwork>
  </div>
  <div v-else>
    <q-skeleton type="text" width="80%" />
  </div>
</template>

<script lang="ts">
import {
  laTwitter as twitterIcon,
  laFacebookF as facebookIcon,
  laPinterest as pinterestIcon,
  laOdnoklassniki as odnoklassnikiIcon,
  laVk as vkIcon,
  laSkype as skypeIcon,
  laTelegram as telegramIcon,
  laViber as viberIcon,
  laWhatsapp as whatsappIcon,
} from '@quasar/extras/line-awesome'
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api'

import type { Restriction } from '@/shared/src/api/restrictions/models'
import { useRouter, useVueI18n } from '@/shared/src/composables/use-plugins'

export default defineComponent({
  components: {},
  props: {
    restriction: {
      type: Object as PropType<Restriction>,
    },
  },
  setup(props) {
    const { t } = useVueI18n()
    const sharing = computed(() => {
      if (!props.restriction) {
        return
      }

      return {
        url: `https://openfortravel.org${useRouter().currentRoute.fullPath}`,
        title: t('page.destination.meta.title', {
          origin: props.restriction.originLabel,
          destination: props.restriction.originLabel,
        }),
      }
    })

    const networks = [
      {
        network: 'facebook',
        name: 'Facebook',
        icon: facebookIcon,
        color: '#1877f2',
      },
      {
        network: 'pinterest',
        name: 'Pinterest',
        icon: pinterestIcon,
        color: '#bd081c',
      },

      {
        network: 'skype',
        name: 'Skype',
        icon: skypeIcon,
        color: '#00aff0',
      },

      {
        network: 'telegram',
        name: 'Telegram',
        icon: telegramIcon,
        color: '#0088cc',
      },

      {
        network: 'twitter',
        name: 'Twitter',
        icon: twitterIcon,
        color: '#1da1f2',
      },
      {
        network: 'viber',
        name: 'Viber',
        icon: viberIcon,
        color: '#59267c',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: whatsappIcon,
        color: '#25d366',
      },
      {
        network: 'odnoklassniki',
        name: 'Odnoklassniki',
        icon: odnoklassnikiIcon,
        color: '#ed812b',
      },
      {
        network: 'vk',
        name: 'VK',
        icon: vkIcon,
        color: '#4a76a8',
      },
    ]

    return { sharing, networks }
  },
})
</script>
