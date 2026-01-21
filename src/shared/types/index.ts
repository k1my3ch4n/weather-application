export interface CoordinatesType {
  lat: number;
  lng: number;
}

export interface AddressCoordinatesType extends CoordinatesType {
  addressName: string;
}
