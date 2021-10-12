import forBusiness from './business'
import country from './country'
import destination from './destination/index'
import index from './home'
import travelAlertsVaccinated from './travel-alerts-vaccinated'

export default {
  index,
  privacy: {
    link: 'Privacy Policy',
    meta: {
      title: '@:page.privacy.link',
    },
  },
  terms: {
    link: 'Terms and Conditions',
    meta: {
      title: '@:page.terms.link',
    },
  },
  contact: {
    link: 'Contact Us',
    pageTitle: '@:page.contact.link',
    meta: {
      title: '@:page.contact.link',
    },
    messageField: 'Your message *',
    sendButton: 'Send message',
    messageSent: 'The message has been sent successfully',
  },
  forBusiness,
  country,
  destination,
  travelAlertsVaccinated,
  notFound: {
    title: '404',
    subtitle: 'Oops. Nothing here...',
  },
}
