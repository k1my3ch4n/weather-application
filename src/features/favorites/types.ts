export interface FavoriteType {
  id: string;
  lat: number;
  lng: number;
  addressName: string;
  nickname: string;
  createdAt: number;
}

export interface AddFavoriteParams {
  lat: number;
  lng: number;
  addressName: string;
}
