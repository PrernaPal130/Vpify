import type { ComponentType } from "react";
import { Sparkles, Target, Workflow } from "lucide-react";

import Navbar1 from "../../components/navbar/Navbar1";
import Navbar2 from "../../components/navbar/Navbar2";
import Navbar3 from "../../components/navbar/Navbar3";

import Hero1 from "../../components/hero/Hero1";
import Hero2 from "../../components/hero/Hero2";
import Hero3 from "../../components/hero/Hero3";
import Hero4 from "../../components/hero/Hero4";

import Gallery1 from "../../components/gallary/Gallery1";
import Gallery2 from "../../components/gallary/Gallery2";

import Services1 from "../../components/services/Services1";
import Services2 from "../../components/services/Services2";

import Stats1 from "../../components/stats/Stats1";

import Testimonials1 from "../../components/testamonies/Testimonials1";
import Testimonials2 from "../../components/testamonies/Testimonials2";

import Pricing1 from "../../components/pricing/Pricing1";
import Pricing2 from "../../components/pricing/Pricing2";

import FAQ1 from "../../components/FAQ/FAQ1";

import CTA1 from "../../components/CTA/CTA1";

import Contact1 from "../../components/contact/Contact1";

import Footer1 from "../../components/footer/Footer1";
import Footer2 from "../../components/footer/Footer2";

import Process1 from "../../components/process/Process1";

type ShowcaseComponent = {
  name: string;
  description: string;
  component: ComponentType<any>;
  props?: Record<string, unknown>;
  info: {
    category: string;
    bestFor: string[];
    responsive: string;
    animation: string;
    theme: string;
  };
};

export type ShowcaseCategory = {
  slug: string;
  label: string;
  description: string;
  components: ShowcaseComponent[];
};

const placeholderImages = [
  "/circle.png",
  "/logo.png",
  "/new.png",
  "/trans.png",
  "/circle.png",
  "/logo.png",
  "/new.png",
  "/trans.png",
];

const serviceItems = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and visual direction for premium launches.",
    icon: Sparkles,
    badge: "Popular",
  },
  {
    title: "Conversion Design",
    description:
      "Refined layouts and clear flows that guide visitors to action.",
    icon: Target,
    badge: "High intent",
  },
  {
    title: "Automation",
    description:
      "Frictionless follow-up and CRM-ready handoffs built into the experience.",
    icon: Workflow,
    badge: "Growth",
  },
];

const testimonialItems = [
  {
    name: "Mina Chen",
    role: "Founder",
    company: "Lumen Studio",
    review:
      "The experience feels polished, fast, and completely aligned with our brand.",
    rating: 5,
    verified: true,
  },
  {
    name: "Daniel Brooks",
    role: "Marketing Lead",
    company: "Northstar Labs",
    review:
      "We moved from a generic template to a system that feels elevated and reliable.",
    rating: 5,
    verified: true,
  },
];

const pricingPlans = [
  {
    name: "Launch",
    price: {
      oneTime: "$2,400",
      monthly: "$240",
      yearly: "$2,200",
    },
    description: "A premium intro experience for new brands.",
    features: ["One-page presence", "Mobile-first layout", "Launch support"],
    featured: false,
  },
  {
    name: "Growth",
    price: {
      oneTime: "$4,800",
      monthly: "$480",
      yearly: "$4,400",
    },
    description: "A full-spectrum system for scaling businesses.",
    features: ["Multi-section site", "Lead flows", "Performance updates"],
    featured: true,
  },
];

const faqItems = [
  {
    question: "How quickly can a new component be launched?",
    answer:
      "Most patterns can be reviewed and integrated within the same design sprint.",
    category: "Implementation",
  },
  {
    question: "Can these previews be used in client work?",
    answer:
      "Yes. They are designed to mirror the production experience while remaining easy to refine.",
    category: "Usage",
  },
];

export const showcaseCategories: ShowcaseCategory[] = [
  {
    slug: "navbar",
    label: "Navbar",
    description:
      "Navigation patterns for polished storytelling and conversion-driven pages.",
    components: [
      {
        name: "Navbar1",
        description: "Full hero component",
        component: Navbar1,
        props: { logoText: "VPIFY", ctaText: "Book a call" },
        info: {
          category: "Navbar",
          bestFor: ["Luxury", "Studio", "Portfolio"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Navbar2",
        description: "Minimal navigation shell",
        component: Navbar2,
        props: { logoText: "VPIFY", ctaText: "Start" },
        info: {
          category: "Navbar",
          bestFor: ["Startups", "Agencies"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Navbar3",
        description: "Premium sticky navigation",
        component: Navbar3,
        props: { logoText: "VPIFY", ctaText: "Explore" },
        info: {
          category: "Navbar",
          bestFor: ["Luxury", "Restaurants"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "hero",
    label: "Hero",
    description:
      "High-impact opening sections tuned for hospitality, clinics, and luxury brands.",
    components: [
      {
        name: "Hero1",
        description: "Full hero component",
        component: Hero1,
        props: {
          title: "Royal Banquet",
          subtitle:
            "A refined opening section for luxury hospitality experiences.",
          badge: "Premium launch",
          theme: "dark",
        },
        info: {
          category: "Hero",
          bestFor: ["Luxury", "Clinic", "Restaurant", "Banquet"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Hero2",
        description: "Full hero component",
        component: Hero2,
        props: {
          title: "Modern Wellness",
          subtitle: "A calm, premium welcome experience for health brands.",
          badge: "Fresh arrival",
          theme: "dark",
        },
        info: {
          category: "Hero",
          bestFor: ["Clinic", "Wellness"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Hero3",
        description: "Full hero component",
        component: Hero3,
        props: {
          title: "Signature Dining",
          subtitle:
            "An immersive experience that balances elegance and clarity.",
          badge: "Elevated",
          theme: "light",
        },
        info: {
          category: "Hero",
          bestFor: ["Restaurant", "Banquet"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Hero4",
        description: "Full hero component",
        component: Hero4,
        props: {
          title: "Studio Presence",
          subtitle: "A confident first impression for modern service brands.",
          badge: "Bold",
          theme: "dark",
        },
        info: {
          category: "Hero",
          bestFor: ["Agency", "Studio"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    description:
      "Visual showcase patterns built for portfolios, venues, and campaigns.",
    components: [
      {
        name: "Gallery1",
        description: "Full gallery component",
        component: Gallery1,
        props: {
          title: "Signature Moments",
          subtitle: "A curated gallery for premium visual storytelling.",
          images: placeholderImages.map((image, index) => ({
            src: image,
            image,
            title: `Scene ${index + 1}`,
            category: "Featured",
            id: `${image}-${index}`,
          })),
          darkMode: false,
        },
        info: {
          category: "Gallery",
          bestFor: ["Restaurant", "Luxury", "Event"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Gallery2",
        description: "Full gallery component",
        component: Gallery2,
        props: {
          title: "Visual Storybook",
          subtitle: "A refined gallery layout for immersive browsing.",
          images: placeholderImages.map((image, index) => ({
            src: image,
            image,
            title: `Frame ${index + 1}`,
            category: "Editorial",
            id: `${image}-${index}`,
          })),
        },
        info: {
          category: "Gallery",
          bestFor: ["Agency", "Portfolio"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "services",
    label: "Services",
    description:
      "Clear, premium service blocks for presenting offers and capabilities.",
    components: [
      {
        name: "Services1",
        description: "Service cards grid",
        component: Services1,
        props: {
          title: "What we do",
          subtitle: "Flexible cards that articulate your value clearly.",
          services: serviceItems.map((item, index) => ({
            ...item,
            id: `service-${index}`,
            description: item.description,
            icon:
              index === 0 ? "Sparkles" : index === 1 ? "Target" : "Workflow",
          })),
          theme: "dark",
        },
        info: {
          category: "Services",
          bestFor: ["Agencies", "Consultants"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Services2",
        description: "Service cards grid",
        component: Services2,
        props: {
          title: "Services overview",
          subtitle: "Editorial service cards with visual depth.",
          services: serviceItems.map((item, index) => ({
            ...item,
            id: `service-${index + 3}`,
            image: placeholderImages[index % placeholderImages.length],
            alt: item.title,
          })),
          theme: "dark",
        },
        info: {
          category: "Services",
          bestFor: ["Creative", "Luxury"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "stats",
    label: "Stats",
    description: "Impact-driven metrics blocks for trust and proof.",
    components: [
      {
        name: "Stats1",
        description: "Animated stats section",
        component: Stats1,
        props: {
          title: "Trusted by ambitious teams",
          subtitle: "A flexible metrics layout that feels polished and modern.",
          stats: [
            { label: "Projects delivered", value: "120+" },
            { label: "Repeat clients", value: "94%" },
            { label: "Average launch time", value: "14 days" },
            { label: "Satisfaction", value: "4.9/5" },
          ],
          theme: "dark",
          columns: 4,
        },
        info: {
          category: "Stats",
          bestFor: ["Agency", "Studio"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "testimonials",
    label: "Testimonials",
    description: "Social proof patterns that feel credible and premium.",
    components: [
      {
        name: "Testimonials1",
        description: "Testimonial cards grid",
        component: Testimonials1,
        props: {
          title: "Loved by modern teams",
          subtitle: "Proof points for refined client experiences.",
          testimonials: testimonialItems,
          theme: "light",
          columns: 3,
        },
        info: {
          category: "Testimonials",
          bestFor: ["Clinic", "Agency", "Luxury"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Testimonials2",
        description: "Testimonial cards grid",
        component: Testimonials2,
        props: {
          title: "What clients say",
          subtitle: "Soft, editorial proof for premium brands.",
          testimonials: testimonialItems,
          theme: "light",
        },
        info: {
          category: "Testimonials",
          bestFor: ["Beauty", "Hospitality"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "pricing",
    label: "Pricing",
    description:
      "Flexible plans and comparison layouts for product-led experiences.",
    components: [
      {
        name: "Pricing1",
        description: "Pricing cards",
        component: Pricing1,
        props: {
          title: "Simple pricing",
          subtitle: "Choose the plan that fits your launch stage.",
          plans: pricingPlans,
          theme: "dark",
          showBillingToggle: true,
        },
        info: {
          category: "Pricing",
          bestFor: ["Product", "Agency"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Pricing2",
        description: "Pricing cards",
        component: Pricing2,
        props: {
          title: "Flexible packages",
          subtitle: "A premium layout for high-intent enquiries.",
          plans: pricingPlans,
          theme: "dark",
        },
        info: {
          category: "Pricing",
          bestFor: ["Luxury", "Studio"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "faq",
    label: "FAQ",
    description: "Searchable, expandable content patterns for better clarity.",
    components: [
      {
        name: "FAQ1",
        description: "Interactive FAQ section",
        component: FAQ1,
        props: {
          title: "Frequently asked questions",
          subtitle: "Keep support and onboarding friction low.",
          faqs: faqItems,
          theme: "dark",
          searchable: true,
        },
        info: {
          category: "FAQ",
          bestFor: ["Portfolio", "Product"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "cta",
    label: "CTA",
    description:
      "Conversion-focused call-to-action sections for final moments.",
    components: [
      {
        name: "CTA1",
        description: "High-impact CTA",
        component: CTA1,
        props: {
          badge: "Ready to begin",
          title: "Turn your next launch into a premium experience.",
          description: "The final push that feels polished and actionable.",
          primaryButtonText: "Explore the system",
          primaryButtonLink: "#",
          secondaryButtonText: "View examples",
          secondaryButtonLink: "#",
          theme: "dark",
        },
        info: {
          category: "CTA",
          bestFor: ["Campaign", "Product"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    description:
      "Contact and inquiry panels designed for professional follow-up.",
    components: [
      {
        name: "Contact1",
        description: "Contact panel",
        component: Contact1,
        props: {
          title: "Let’s talk",
          subtitle: "Start a conversation with your ideal client.",
          email: "hello@vpify.co",
          phone: "+1 800 555 0199",
          address: "12 Market Street, London",
          website: "vpify.co",
          theme: "light",
        },
        info: {
          category: "Contact",
          bestFor: ["Agency", "Consulting"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "footer",
    label: "Footer",
    description:
      "Concluding sections with structured navigation and trust signals.",
    components: [
      {
        name: "Footer1",
        description: "Full footer block",
        component: Footer1,
        props: {
          logoText: "VPIFY",
          description:
            "A premium design system for modern hospitality and service brands.",
          theme: "dark",
        },
        info: {
          category: "Footer",
          bestFor: ["Studio", "Agency"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
      {
        name: "Footer2",
        description: "Full footer block",
        component: Footer2,
        props: {
          logoText: "VPIFY",
          description:
            "A premium design system for modern hospitality and service brands.",
          theme: "dark",
        },
        info: {
          category: "Footer",
          bestFor: ["Luxury", "Hospitality"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
  {
    slug: "process",
    label: "Process",
    description: "Step-based storytelling for explainers and service journeys.",
    components: [
      {
        name: "Process1",
        description: "Process timeline",
        component: Process1,
        props: {
          title: "How it works",
          subtitle:
            "A clear path from first conversation to polished delivery.",
          steps: [
            {
              title: "Discover",
              description: "We learn your goals, audience, and constraints.",
              number: "01",
            },
            {
              title: "Design",
              description: "We shape the experience and visual system.",
              number: "02",
            },
            {
              title: "Deliver",
              description: "We ship refined, production-ready components.",
              number: "03",
            },
          ],
          theme: "dark",
        },
        info: {
          category: "Process",
          bestFor: ["Agency", "Consulting"],
          responsive: "Yes",
          animation: "Framer Motion",
          theme: "Dark & Light",
        },
      },
    ],
  },
];

export const totalComponentCount = showcaseCategories.reduce(
  (count, category) => count + category.components.length,
  0,
);

export const totalCategoryCount = showcaseCategories.length;
