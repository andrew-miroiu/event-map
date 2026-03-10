export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  address: string;
  description: string;
  price: number;
  tags: string[];
  lat: number;
  lng: number;
}