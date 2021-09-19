export default {
  title: 'Questions & Answers',
  quarantine: {
    q: {
      returning:
        'Do I have to quarantine when returning back from <b><i id="origin">Moldova</i></b> to <i id="destination">Austria</i>?',
      outgoing:
        'Do I have to quarantine when travelling from <i id="origin">Moldova</i> to <i id="destination">Austria</i>?',
    },
    a: {
      notAllowed: {
        returning:
          'Yes, you do have to quarantine upon returning back to <i id="destination">Austria</i>.',
        outgoing:
          'Yes, you do have to quarantine when travelling to <i id="destination">Austria</i>.',
      },
      forbidden:
        'Unfortunately you are not permitted to enter <i id="destination">Austria</i> at all, with or without quarantine.',
      allowed:
        'No, you don\'t need to quarantine upon arriving to  <i id="destination">Austria</i>.',
    },
  },
}
