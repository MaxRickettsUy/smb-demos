export interface Business {
  name: string;
  trade: string;
  tagline?: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  facebook?: string;
  address: string[];
  hours: { days: string; time: string }[];
  services: { title: string; blurb?: string }[];
  license?: string;
  founded?: string;
  heroImage?: string;
  accent?: string;
}
