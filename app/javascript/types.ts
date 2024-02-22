export interface Event {
  id?: number;
  kind: string;
  body: string;
  event: string;
  username?: string;
  event_at?: string;
  location?: string;
  image?: string;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  banner: string;
  creator: {
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  numRatings: number;
  ratingDistributions: Array<number>;
  numSales: number;
  stats: {
    weeklySales: number;
    dailySales: number;
    monthlySales: number;
    totalSales: number;
  };
  offer: {
    percent: number;
    title: string;
  };
  showProofEvents: boolean;
  description: string;
}
