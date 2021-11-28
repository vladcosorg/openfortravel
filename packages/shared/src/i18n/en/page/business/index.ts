import chatbot from './chatbot'
import cs from './customer-service'

export default {
  link: 'For Business',
  sections: {
    contact: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Work Email',
      org: 'Organization',
      jobTitle: 'Job Title',
      message: 'Tell us a bit about your case',
    },
    chatbot,
    cs,
  },
  shared: {
    verified: `Per our standards, the information is considered verified, if
              our human operator can confirm its correctness by
              cross-referencing several sources or after confirmation from
              the embassy personnel.`,
  },
  meta: {
    title: 'Restoring traveller confidence',
  },
}
