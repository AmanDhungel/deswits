export const COMPANY = {
  name: "Deswits",
  tagline: "Blockchain Startup Investments",
  description:
    "Deswits makes startup investing more secure and rewarding — connecting investors to vetted, high-growth startups through blockchain-verified deal flow and laser-precision diligence technology.",
  address: {
    line1: "700 17th Street",
    city: "Richmond",
    state: "California",
    country: "United States",
    full: "700 17th Street, Richmond, California, United States",
  },
  phone: "+1 (408) 982-6229",
  phoneHref: "tel:+14089826229",
  email: "hello@deswits.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Security", href: "/#security" },
  { label: "Contact", href: "/#contact" },
] as const;
