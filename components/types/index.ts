import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
}

export interface TopBarData {
  address?: string;
  hours?: string;
  security?: string;
  phone?: string;
  phone_href?: string;
  email?: string;
  email_href?: string;
}

export interface HeaderData {
  logo_text: string;
  logo: string;
  badge_text?: string;
  top_bar?: TopBarData;
  links: LinkType[];
  button_text: string;
  button_href: string;
  phone: string;
  phone_href: string;
}

export interface FooterNewsletter {
  title: string;
  subtitle: string;
  placeholder: string;
  button_text: string;
}

export interface FooterData {
  logo_text: string;
  logo: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours?: string;
  newsletter?: FooterNewsletter;
  disclaimer?: string;
  links: LinkType[];
  support_links: LinkType[];
  socials: LinkType[];
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroTrustBadge {
  rating: string;
  rating_text: string;
  stat_value: string;
  stat_text: string;
}

export interface HeroFeatureItem {
  text: string;
}

export interface HeroSectionData {
  id: string;
  eyebrow: string;
  title_start: string;
  title_highlight: string;
  description: string;
  primary_button_text: string;
  primary_button_href: string;
  secondary_button_text: string;
  secondary_button_href: string;
  image: string;
  trust_badge?: HeroTrustBadge;
  features_strip?: HeroFeatureItem[];
}

export interface AboutSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  description: string;
  experience_years: string;
  experience_text: string;
  image_team: string;
  image_handshake: string;
  checklist: string[];
  client_avatars?: string[];
  trust_stat_title?: string;
  trust_stat_subtitle?: string;
}

export interface ServiceItem {
  id: string;
  number?: string;
  tag?: string;
  icon: string;
  title: string;
  description: string;
  link_text?: string;
}

export interface ServicesSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface WhyChooseItem {
  badge?: string;
  icon: string;
  title: string;
  description: string;
  guarantee_text?: string;
}

export interface WhyChooseUsSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  default_guarantee?: string;
  items: WhyChooseItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  experience?: string;
  specialty?: string;
  bio?: string;
  linkedin?: string;
  email?: string;
}

export interface TeamSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  book_meet_text?: string;
  schedule_consult_text?: string;
  members: TeamMember[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  badge?: string;
  highlight_metric?: string;
}

export interface TestimonialsSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  overall_rating?: string;
  reviews_count?: string;
  items: TestimonialItem[];
}

export interface ContactInfo {
  address_title: string;
  address: string;
  hours_title?: string;
  hours?: string;
  phone_title: string;
  phone: string;
  phone_href: string;
  email_title: string;
  email: string;
  email_href: string;
  badge?: string;
  card_title?: string;
  card_subtitle?: string;
  phone_note?: string;
  email_note?: string;
  security_note?: string;
}

export interface ContactForm {
  form_title?: string;
  form_subtitle?: string;
  first_name_placeholder: string;
  last_name_placeholder: string;
  phone_placeholder: string;
  subject_placeholder: string;
  message_placeholder: string;
  submit_button: string;
  submit_loading?: string;
  success_title?: string;
  success_message: string;
  services_label?: string;
  services_options?: string[];
}

export interface ContactSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  info: ContactInfo;
  form: ContactForm;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqSupportBox {
  title: string;
  subtitle: string;
  button_text: string;
  button_href: string;
}

export interface FaqSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  categories?: string[];
  support_box?: FaqSupportBox;
  items: FaqItem[];
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Finance.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
