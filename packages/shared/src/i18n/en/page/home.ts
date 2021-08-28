export default {
  link: 'Home',
  route: 'from',
  sections: {
    hero: {
      title: 'COVID-19 travel ban info <br> for travellers from',
      subtitle: `Where can I travel during pandemic as a {country} citizen?<br> Do I
            need a COVID-19 vaccine passport at the border control?<br/> You’ve got
            questions - we’ve got answers!`,
      button: 'Explore destinations',
    },
    stats: {
      title: 'Travel restrictions for travellers from ',
      subtitle: 'categorized by the level of restrictions and requirements.',
      types: {
        allowed: {
          title: '@:restriction.travel.value.allowed',
          valueSuffix:
            'countries have no travel restrictions <br> for <b>{nationality}</b>',
          description:
            'The country has no formal restrictions on entry by air, but is still monitoring the situation and may have other travel policies in place like mandatory testing or quarantines upon arrival.',
        },
        allowed_soon: {
          title: '@:restriction.travel.value.allowedSoon',
          valueSuffix:
            'countries are opening soon <br> for <b>{nationality}</b>',
          description:
            'The country has announced a specific date for reopening, but certain entry requirements may still apply.',
        },
        forbidden: {
          title: '@:restriction.travel.value.forbidden',
          valueSuffix:
            'countries are completely closed <br> for <b>{nationality}</b>',
          description:
            'Only citizens, residents returning home, or people in other special circumstances may enter the country.',
        },
        conditional: {
          title: '@:restriction.travel.value.conditional',
          valueSuffix:
            'countries are partially open <br> for <b>{nationality}</b>',
          description:
            'Entrance into the country may depend on the traveler’s citizenship, point of origin, or other specific regulations.',
        },
      },
    },
    countries: {
      title: 'Explore restrictions from other countries',
    },
  },
  meta: {
    title: 'Travel restrictions from {country}',
  },
}
