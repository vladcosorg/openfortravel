export default {
  origin: {
    instruction: {
      heading: 'You must arrive to your destination from <b>{origin}</b>',
      subtitle: 'Alternatively, you can arrive from {sequence}',
    },
  },
  pcrTest: {
    instruction: {
      heading: 'Get a negative COVID-19 PCR test certificate',
      subtitle:
        'The test has to be issued within {hours} hours prior to arrival',
    },
  },
  didNotVisitCountries: {
    instruction: {
      heading:
        'Make sure that in the last {days} days you did not visit the countries from the red list',
      subtitle:
        "If you have been in or through any of the countries listed below in the previous {days} days, you don't meet the entry requirements from this section. <br><br> Banned countries: {sequence} ",
    },
  },
  onlineApplication: {
    instruction: {
      heading: 'Fill an online-application prior to entry to your destination',
      subtitle:
        'Please <a target="_blank" href="{url}">follow this link</a> to complete the registration form and follow further instructions from that page',
    },
  },
  vaccinated: {
    instruction: {
      heading: 'Bring your certificate of vaccination',
      subtitle:
        'You must present at the border the certificate for full vaccination with an approved vaccine against COVID-19 ',
    },
  },
  citizenship: {
    instruction: {
      heading: 'You are a national or a resident of <b>{country}</b>',
      subtitle: '{sequence}',
    },
  },
}
