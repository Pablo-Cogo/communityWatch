export enum ServedStates {
  SANTA_CATARINA = "SC",
}

export enum ServedCities {
  CHAPECO = "Chapecó",
}

export interface Address {
  id?: string;
  addressState: ServedStates;
  addressCity: ServedCities;
  addressDistrict: string;
  addressStreet: string;
  addressNumber: string;
  addressZipCode: string;
}
