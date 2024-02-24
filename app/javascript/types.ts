export interface Event {
  id?: number;
  kind: string;
  body: string;
  event: string;
  value: string;
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
export interface Settings {
  hide_names: boolean;
  show_on_checkout: boolean;
  key: string;
}
export interface TestimonialSettings {
  show_testimonials: boolean;
  title: string;
  body: string;
  product_id: number;
}

export interface Testimonial {
  user_id: number;
  user_name: string;
  user_title: string;
  product_id: number;
  published?: boolean;
  body: string;
}
export interface ProductProofEvent {
  id?: number;
  product_id: number;
  label: string;
  valueLabel?: string;
  message: string;
}

export interface Option {
  label: string;
  value: string;
}
