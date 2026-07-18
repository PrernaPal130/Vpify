import { googleReviewOverrides } from "@/lib/google-review-overrides";

export type ResultsFilter =
  | "All"
  | "Website Projects"
  | "Google Business Profile"
  | "Google Maps Optimization"
  | "WhatsApp Automation"
  | "Branding"
  | "SEO"
  | "Reviews";

export type ReviewSource =
  | "Google Reviews"
  | "Google Business Profile"
  | "Website Review"
  | "WhatsApp Feedback"
  | "Video Testimonial"
  | "Email Feedback";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectAction = {
  label: string;
  href: string;
};

export type ClientProject = {
  id: number;
  businessName: string;
  industry: string;
  location: string;
  logo: string;
  websiteScreenshot: string;
  placeId?: string;
  websiteUrl?: string;
  googleBusinessUrl?: string;
  googleReviewUrl?: string;
  caseStudyUrl?: string;
  demoUrl?: string;
  reviewSource: ReviewSource;
  rating: number;
  reviewCount: number;
  review: string;
  reviewerName: string;
  reviewerRole: string;
  completedServices: string[];
  metrics: ProjectMetric[];
  tags: ResultsFilter[];
  status: "Completed" | "In Progress" | "Project in Development";
  projectType: string;
  accent: string;
};

export const resultFilters: ResultsFilter[] = [
  "All",
  "Website Projects",
  "Google Business Profile",
  "Google Maps Optimization",
  "WhatsApp Automation",
  "Branding",
  "SEO",
  "Reviews"
];

const baseClientProjects: ClientProject[] = [
  {
    id: 1,
    businessName: "Royal Banquet",
    industry: "Banquet Hall",
    location: "Ghaziabad",
    logo: "RB",
    websiteScreenshot: "",
    websiteUrl: "https://royalbanquet.in",
    googleBusinessUrl: "https://www.google.com/search?q=Royal+Banquet+Ghaziabad",
    googleReviewUrl: "https://www.google.com/search?q=Royal+Banquet+Ghaziabad+reviews",
    caseStudyUrl: "#",
    reviewSource: "Google Reviews",
    rating: 5,
    reviewCount: 1,
    review:
      "The website finally reflects our brand. Customers now trust us before they even visit.",
    reviewerName: "Rajesh Kumar",
    reviewerRole: "Owner",
    completedServices: [
      "Design",
      "Google Business Setup",
      "Google Maps Optimization",
      "WhatsApp Integration",
      "SEO",
      "Hosting",
      "Domain Setup",
      "Analytics"
    ],
    metrics: [
      { value: "+68%", label: "Increase in enquiries" },
      { value: "4.9", label: "Google Rating" },
      { value: "2.5x", label: "Website Traffic" },
      { value: "Top 3", label: "Google Maps Ranking" }
    ],
    tags: [
      "Website Projects",
      "Google Business Profile",
      "Google Maps Optimization",
      "WhatsApp Automation",
      "SEO",
      "Reviews"
    ],
    status: "Completed",
    projectType: "Website + Google Business + SEO",
    accent: "#28d596"
  },
  {
    id: 2,
    businessName: "MedCare Clinic",
    industry: "Healthcare",
    location: "Noida",
    logo: "MC",
    websiteScreenshot: "",
    websiteUrl: "https://medcareclinic.in",
    googleBusinessUrl: "https://www.google.com/search?q=MedCare+Clinic+Noida",
    googleReviewUrl: "https://www.google.com/search?q=MedCare+Clinic+Noida+reviews",
    caseStudyUrl: "#",
    reviewSource: "Website Review",
    rating: 5,
    reviewCount: 1,
    review:
      "The appointment flow and professional look helped patients understand our services faster.",
    reviewerName: "Dr. Amit Sharma",
    reviewerRole: "Clinic Director",
    completedServices: [
      "Design",
      "WhatsApp Integration",
      "SEO",
      "Hosting",
      "Domain Setup",
      "Analytics"
    ],
    metrics: [
      { value: "+42%", label: "Patient enquiries" },
      { value: "5.0", label: "Client Rating" },
      { value: "1.8x", label: "Appointment Clicks" },
      { value: "100%", label: "Mobile Responsive" }
    ],
    tags: [
      "Website Projects",
      "WhatsApp Automation",
      "Branding",
      "SEO",
      "Reviews"
    ],
    status: "Completed",
    projectType: "Healthcare Website + WhatsApp Flow",
    accent: "#5eead4"
  },
  {
    id: 3,
    businessName: "Glamour Salon",
    industry: "Salon",
    location: "Delhi NCR",
    logo: "GS",
    websiteScreenshot: "",
    websiteUrl: "#",
    googleBusinessUrl: "#",
    googleReviewUrl: "#",
    reviewSource: "WhatsApp Feedback",
    rating: 0,
    reviewCount: 0,
    review: "Project in development. Verified review will be added after launch.",
    reviewerName: "Coming Soon",
    reviewerRole: "Project in Development",
    completedServices: ["Design", "WhatsApp Integration", "Branding"],
    metrics: [
      { value: "Soon", label: "Launch Status" },
      { value: "0", label: "Published Reviews" },
      { value: "Planned", label: "Booking Flow" },
      { value: "Mobile", label: "First Design" }
    ],
    tags: ["Website Projects", "WhatsApp Automation", "Branding"],
    status: "Project in Development",
    projectType: "Salon Website + WhatsApp Booking",
    accent: "#f0abfc"
  },
  {
    id: 4,
    businessName: "Shree Ganesh Restaurant",
    industry: "Restaurant",
    location: "Ghaziabad",
    logo: "SG",
    websiteScreenshot: "",
    websiteUrl: "#",
    googleBusinessUrl: "#",
    googleReviewUrl: "#",
    reviewSource: "Google Business Profile",
    rating: 0,
    reviewCount: 0,
    review: "Project in development. Results will be published after verification.",
    reviewerName: "Coming Soon",
    reviewerRole: "Project in Development",
    completedServices: [
      "Google Business Setup",
      "Google Maps Optimization",
      "SEO"
    ],
    metrics: [
      { value: "Soon", label: "GBP Launch" },
      { value: "Maps", label: "Optimization" },
      { value: "Menu", label: "Local Search" },
      { value: "Reviews", label: "Planned" }
    ],
    tags: [
      "Google Business Profile",
      "Google Maps Optimization",
      "SEO",
      "Reviews"
    ],
    status: "Project in Development",
    projectType: "Google Business + Local SEO",
    accent: "#fbbf24"
  }
];

const googleReviewOverrideByProject = new Map(
  googleReviewOverrides.map((override) => [override.projectId, override])
);

export const clientProjects: ClientProject[] = baseClientProjects.map((project) => {
  const googleOverride = googleReviewOverrideByProject.get(project.id);
  if (!googleOverride) return project;

  return {
    ...project,
    placeId: googleOverride.placeId,
    websiteUrl: googleOverride.websiteUrl || project.websiteUrl,
    googleBusinessUrl: googleOverride.googleBusinessUrl || project.googleBusinessUrl,
    googleReviewUrl: googleOverride.googleReviewUrl || project.googleReviewUrl,
    reviewSource: googleOverride.reviewSource,
    rating: googleOverride.rating || project.rating,
    reviewCount: googleOverride.reviewCount || project.reviewCount,
    review: googleOverride.review || project.review,
    reviewerName: googleOverride.reviewerName || project.reviewerName,
    reviewerRole: googleOverride.reviewerRole || project.reviewerRole,
    metrics: project.metrics.map((metric) => {
      if (metric.label === "Google Rating" || metric.label === "Client Rating") {
        return {
          ...metric,
          value: googleOverride.rating ? googleOverride.rating.toFixed(1) : metric.value
        };
      }

      return metric;
    })
  };
});

export const reviewCtaLinks = {
  googleReview: "https://www.google.com/search?q=VPIFY+reviews",
  websiteReview: "#audit",
  contact: "#audit"
};
