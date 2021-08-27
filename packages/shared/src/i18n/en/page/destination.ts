export default {
  route: 'to',
  meta: {
    title:
      '{destination} travel restrictions from {origin}: flight restrictions, quarantine measures,  COVID-19 vaccine passport  and other entry requirements',
  },
  heading:
    'Travel restrictions for travelling from <b>{origin}</b> to <b>{destination}</b>',
  breadcrumb: 'To {country}',
  title: 'Latest information on travelling from {origin} to {destination}',
  seeReturnPage: 'See return travel',
  backToList: 'Back to list',
  returnWay: 'Return way',
  fillDeclaration: 'Fill online',
  widgets: {
    info: {
      title: 'Outgoing country resouces',
      returnTitle: 'Return country resouces',
      subtitle: '{country} official and non-official sources and references',
      none: 'No resources at the moment',
    },
    entryRequirements: {
      title: 'Personalized entry requirements',
      subtitle:
        'These restrictions are generated based on the information entered above.',
    },
    summary: {
      title: 'Summary',
      subtitle:
        'Make sure to read all the additional information listed on the page before making a decision',
    },
    faqIndex: { title: 'F.A.Q.' },
    faq: {
      title: 'Questions & Answers',
      subtitle: 'Got more questions? Contact us!',
    },
    stats: {
      title: 'COVID-19 confirmed cases',
      subtitle: 'in {country}',
      casesThisWeek: {
        title: 'new cases this week',
        subtitle: 'per 100.000 people',
      },
      trend: {
        title: {
          up: 'Up',
          down: 'Down',
          noChange: 'No change',
        },
        subtitle: 'from {count} per 100.000 people since last week',
      },
      riskLevel: {
        title: 'Infection risk',
        subtitle: 'according to Risk Assessment Level data from',
      },
    },
  },
}
