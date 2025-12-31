export interface Event {
  image: string;
  time: string;
  date: string;
  title: string;
  description: string;
  location: string;
  eventType: string;
  socialLinks?: {
    instagram?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
  };
}

export interface EventsData {
  events: Event[];
}

