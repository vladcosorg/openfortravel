import faq from './faq'

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
  rs: {
    test: {
      title: {
        beforeArrival:
          'Provide proof of a negative <i id="type">COVID-19 test</i>. The procedure should be done no more than <i id="hours">72</i>  hours before entry.',
        atArrival:
          'Get a negative COVID-19 test certificate <b>at at the airport after arrival</b>.',
        afterArrival:
          'Get a negative COVID-19 test certificate <b>at most <i id="hours">72</i>h after arrival</b>.',
      },
      body: {
        beforeArrival:
          'The COVID-19 test has to be performed no later than than <i id="hours">72</i> hours before arrival.',
        atArrival:
          'The COVID-19 test has to be performed at the airport after arrival. You have to self-isolate until you receive a negative result.',
        afterArrival:
          'The COVID-19 test has to be performed within <i id="hours">72</i> hours after arrival. You have to self-isolate until you receive a negative result.',
        acceptedTests: 'Accepted COVID-19 test types: <i id="types">PCR</i>',
      },
    },
    quarantine: {
      title: {
        earlyRelease:
          'Self-isolate for <b>at least <i id="days">5</i> days</b> upon arrival',
        noEarlyRelease:
          'Self-isolate for <b><i id="days">5</i> days</b> upon arrival',
      },
      body: {
        firstLine: `Travelers are subject to <b><i id="days">5</i> days</b> of
        mandatory self-isolation at home, declared location or location
        designated by authorities.`,
        earlyRelease: `The quarantine period may be shortened by taking another test during the
        self-isolation. If the result of this test is negative,
        <b
          >the period of quarantine can end on day
          <i id="days">5</i>.</b
        >`,
        noEarlyRelease: ` You have to self-isolate for the full duration ( <i id="days">5</i>
        days) and it is not possible to end the quarantine early by taking a
        repeated test.`,
      },
    },
  },
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
    faq,

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
