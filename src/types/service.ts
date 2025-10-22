export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  included?: string[];
  forWho?: string;
  outcomes?: string;
  ctaText: string;
  ctaLink: string;
}
