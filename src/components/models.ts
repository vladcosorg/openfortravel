export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Country {
  id: number;
  code: string;
  destinations: DestinationCountry[]
}

export interface DestinationCountry {
  countryId: number;
  status: string;
  requiresTest?: boolean;
  notes?: string;
}

export interface FormattedDestinationCountry extends Omit<DestinationCountry, 'countryId'> {
  country: {
    label: string,
    flag: string,
    code: string
  };
}

export interface GroupedDestinations {
  allowed?: FormattedDestinationCountry[];
  forbidden?: FormattedDestinationCountry[];
  conditional?: FormattedDestinationCountry[];
}
