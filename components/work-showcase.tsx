"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ProjectLink = {
  label: string;
  href?: string;
};

type Review = {
  text: string;
  client: string;
  business: string;
  source: "Google" | "Website";
  date: string;
};

type CaseStudy = {
  problem: string;
  solution: string;
  timeline: string;
  outcome: string;
};

type Project = {
  name: string;
  initials: string;
  industry: string;
  location: string;
  status: "Live" | "Completed" | "In progress";
  category: string;
  services: string[];
  outcome: string;
  technologies: string[];
  metrics: string[];
  links: ProjectLink[];
  review?: Review;
  caseStudy: CaseStudy;
  accent: string;
  preview: {
    title: string;
    lines: string[];
    cta: string;
  };
};

type GoogleBusinessProject = {
  name: string;
  industry: string;
  location: string;
  rating?: string;
  reviewCount?: string;
  status: string;
  badge: string;
  mapsUrl?: string;
  directionsUrl?: string;
  improvements: string[];
};

const categories = [
  "All",
  "Website Development",
  "Google Business",
  "SEO",
  "WhatsApp Automation",
];

const navItems = [
  { label: "Problem", href: "/#problem" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Packages", href: "/#packages" },
  { label: "Impact", href: "/#results" },
];

const projects: Project[] = [
  {
    name: "Royal Banquet",
    initials: "RB",
    industry: "Banquet Hall",
    location: "Ghaziabad",
    status: "Live",
    category: "Hospitality",
    services: [
      "Website Design",
      "Next.js",
      "Google Business",
      "SEO",
      "WhatsApp",
      "Hosting",
      "Analytics",
    ],
    outcome: "Increase enquiries through a modern online presence.",
    technologies: ["Next.js", "Local SEO", "WhatsApp", "Analytics"],
    metrics: [
      "Project completed",
      "Mobile optimized",
      "Google Business integrated",
      "WhatsApp connected",
      "SEO ready",
      "Custom designed",
    ],
    links: [
      { label: "Visit Website", href: "https://royalbanquet.in" },
      {
        label: "View Google Business",
        href: "https://www.google.com/search?q=Royal+Banquet+Ghaziabad",
      },
      {
        label: "Read Google Reviews",
        href: "https://www.google.com/search?q=Royal+Banquet+Ghaziabad+reviews",
      },
      { label: "Open WhatsApp", href: whatsappUrl },
      { label: "View Case Study", href: "#royal-banquet-case-study" },
    ],
    review: {
      text: "The website finally reflects our brand. Customers now trust us before they even visit.",
      client: "Rajesh Kumar",
      business: "Royal Banquet",
      source: "Google",
      date: "2026",
    },
    caseStudy: {
      problem:
        "The business needed a sharper first impression and clearer enquiry paths for event bookings.",
      solution:
        "Designed a premium website, connected WhatsApp actions, prepared local SEO pages, and aligned Google Business visibility.",
      timeline: "2 weeks",
      outcome:
        "A faster, mobile-first presence with trust signals and direct booking actions.",
    },
    accent: "#9ee7c8",
    preview: {
      title: "Premium venue website",
      lines: ["Weddings", "Events", "Gallery", "Booking"],
      cta: "Plan your celebration",
    },
  },
  {
    name: "MedCare Clinic",
    initials: "MC",
    industry: "Healthcare",
    location: "Noida",
    status: "Completed",
    category: "Healthcare",
    services: [
      "Website Design",
      "WhatsApp",
      "SEO",
      "Branding",
      "Hosting",
      "Analytics",
    ],
    outcome: "Make treatments easier to understand and enquiries easier to start.",
    technologies: ["Responsive UI", "SEO", "WhatsApp", "Forms"],
    metrics: [
      "Project completed",
      "Mobile optimized",
      "WhatsApp connected",
      "SEO ready",
      "Custom designed",
    ],
    links: [
      { label: "Open WhatsApp", href: whatsappUrl },
      { label: "View Case Study", href: "#medcare-clinic-case-study" },
    ],
    review: {
      text: "The appointment flow and professional look helped patients understand our services faster.",
      client: "Dr. Amit Sharma",
      business: "MedCare Clinic",
      source: "Website",
      date: "2026",
    },
    caseStudy: {
      problem:
        "Patients needed a clearer way to evaluate services and start a private enquiry from mobile.",
      solution:
        "Created a calm service-led website structure with direct WhatsApp actions and search-ready content.",
      timeline: "In review",
      outcome:
        "A polished healthcare presence prepared for launch, tracking, and ongoing SEO.",
    },
    accent: "#8bd3ff",
    preview: {
      title: "Clinic services portal",
      lines: ["Specialists", "Treatments", "Appointments", "Care"],
      cta: "Book consultation",
    },
  },
  {
    name: "Glamour Salon",
    initials: "GS",
    industry: "Salon",
    location: "Delhi NCR",
    status: "In progress",
    category: "Salon",
    services: ["Website Design", "WhatsApp", "Automation", "Branding"],
    outcome: "Prepare a booking-focused experience for beauty service enquiries.",
    technologies: ["Next.js", "WhatsApp Flow", "Brand System"],
    metrics: [
      "Custom designed",
      "Mobile optimized",
      "WhatsApp planned",
      "Booking flow planned",
    ],
    links: [{ label: "Open WhatsApp", href: whatsappUrl }],
    caseStudy: {
      problem:
        "Service discovery and appointment intent were happening manually across chat and calls.",
      solution:
        "Designing a visual service catalogue with direct booking prompts and reusable WhatsApp replies.",
      timeline: "Upcoming launch",
      outcome:
        "A brand-led website foundation ready for bookings, offers, and seasonal campaigns.",
    },
    accent: "#f7b7d7",
    preview: {
      title: "Beauty booking experience",
      lines: ["Hair", "Skin", "Bridal", "Offers"],
      cta: "Reserve a slot",
    },
  },
  {
    name: "Shree Ganesh Restaurant",
    initials: "SG",
    industry: "Restaurant",
    location: "Ghaziabad",
    status: "In progress",
    category: "Restaurant",
    services: ["Google Business", "SEO", "Google Maps", "Analytics"],
    outcome: "Improve local discovery for menu searches, directions, and calls.",
    technologies: ["Google Business", "Maps SEO", "Local Content"],
    metrics: [
      "Profile audit started",
      "Maps optimization planned",
      "SEO ready",
      "Review flow planned",
    ],
    links: [{ label: "Open WhatsApp", href: whatsappUrl }],
    caseStudy: {
      problem:
        "The restaurant needed a stronger local search presence before investing in a full website.",
      solution:
        "Optimizing Google Business categories, service areas, images, menu signals, and review prompts.",
      timeline: "Phase 1",
      outcome:
        "A local visibility foundation that can later connect into website and ordering flows.",
    },
    accent: "#ffd36e",
    preview: {
      title: "Local restaurant visibility",
      lines: ["Menu", "Directions", "Reviews", "Calls"],
      cta: "Find us nearby",
    },
  },
];

const googleBusinessProjects: GoogleBusinessProject[] = [
  {
    name: "Royal Banquet",
    industry: "Banquet Hall",
    location: "Ghaziabad",
    rating: "Profile live",
    reviewCount: "Reviews connected",
    status: "Profile optimized",
    badge: "After optimization",
    mapsUrl: "https://www.google.com/search?q=Royal+Banquet+Ghaziabad",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Banquet+Ghaziabad",
    improvements: ["Categories aligned", "Website linked", "Review path ready"],
  },
  {
    name: "Shree Ganesh Restaurant",
    industry: "Restaurant",
    location: "Ghaziabad",
    status: "Optimization in progress",
    badge: "Before to after",
    improvements: ["Menu signals", "Maps discovery", "Review plan"],
  },
];

function validLinks(links: ProjectLink[]) {
  return links.filter((link) => link.href && link.href !== "#");
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className="relative min-h-[270px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#101414] p-4"
      style={{
        background:
          `radial-gradient(circle at 15% 0%, ${project.accent}44, transparent 17rem), linear-gradient(135deg, #111414, #050606)`,
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
          {project.status}
        </span>
      </div>
      <div className="grid gap-5 pt-6 md:grid-cols-[1fr_0.78fr]">
        <div>
          <div
            className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold text-black"
            style={{ backgroundColor: project.accent }}
          >
            {project.initials}
          </div>
          <p className="max-w-xs text-3xl font-semibold leading-tight text-white">
            {project.preview.title}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
            {project.outcome}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
            {project.preview.cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <div className="space-y-3">
          {project.preview.lines.map((line, index) => (
            <div
              key={line}
              className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3"
              style={{ marginLeft: `${index * 8}px` }}
            >
              <p className="text-sm font-medium text-white">{line}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${76 - index * 10}%`,
                    backgroundColor: project.accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const links = validLinks(project.links);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <ProjectPreview project={project} />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-black"
              style={{ backgroundColor: project.accent }}
            >
              {project.initials}
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-1 text-sm text-white/52">
                {project.industry} - {project.location}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            {project.status}
          </span>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {project.services.map((service) => (
            <div key={service} className="flex items-center gap-2 text-sm text-white/72">
              <Check className="h-4 w-4 text-emerald-200" />
              {service}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/38">
            Result
          </p>
          <p className="mt-2 text-base leading-7 text-white/82">{project.outcome}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/62"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-medium text-white/58"
            >
              {metric}
            </span>
          ))}
        </div>

        {project.review ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex text-amber-200" aria-label="5 star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/58">
                {project.review.source}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-200/10 px-2.5 py-1 text-xs text-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/72">
              &ldquo;{project.review.text}&rdquo;
            </p>
            <p className="mt-3 text-xs text-white/42">
              {project.review.client}, {project.review.business} - {project.review.date}
            </p>
          </div>
        ) : null}

        <details
          id={`${project.name.toLowerCase().replace(/\s+/g, "-")}-case-study`}
          className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 open:bg-black/30"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
            Case study preview
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-white/62">
            <p>
              <span className="font-semibold text-white">Problem:</span>{" "}
              {project.caseStudy.problem}
            </p>
            <p>
              <span className="font-semibold text-white">Solution:</span>{" "}
              {project.caseStudy.solution}
            </p>
            <p>
              <span className="font-semibold text-white">Services used:</span>{" "}
              {project.services.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-white">Timeline:</span>{" "}
              {project.caseStudy.timeline}
            </p>
            <p>
              <span className="font-semibold text-white">Outcome:</span>{" "}
              {project.caseStudy.outcome}
            </p>
            <a
              href="#audit"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Read Full Case Study
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </details>

        <div className="mt-6 flex flex-wrap gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href?.startsWith("http") ? "_blank" : undefined}
              rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
            >
              {link.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function WorkShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");

  const visibleProjects = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory ||
        project.services.includes(activeCategory) ||
        project.industry === activeCategory;
      const searchable = [
        project.name,
        project.industry,
        project.location,
        project.status,
        project.services.join(" "),
        project.technologies.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalized || searchable.includes(normalized));
    });

    if (sort === "Live first") {
      return [...filtered].sort((a, b) => Number(b.status === "Live") - Number(a.status === "Live"));
    }

    if (sort === "A-Z") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [activeCategory, search, sort]);

  return (
    <main className="min-h-screen bg-[#050606] text-white">
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-4 z-40 px-4">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/10 bg-[#080a09]/82 px-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 pl-2">
              <Image
                src="/new.png"
                alt="VPify logo"
                width={120}
                height={120}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                priority
              />
            </Link>
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-white/58 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/work"
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-black"
              >
                Work
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="default"
                className="hidden h-10 bg-white px-4 text-black hover:bg-white/90 sm:inline-flex"
              >
                <Link href="/#audit">
                  Free audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 border-white/12 bg-white/8 text-white hover:bg-white/14 lg:hidden"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          {mobileMenuOpen ? (
            <div className="grid gap-1 border-t border-white/10 px-1 py-3 lg:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/62 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
              <Link
                href="/work"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Work
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#audit"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Book a free audit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-12 pt-24 md:pb-16">
        <div className="absolute inset-0 grid-fade opacity-35" />
        <div className="absolute left-1/2 top-0 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-emerald-200/10 blur-3xl" />
        <div className="section-shell relative z-10">
          <div className="grid gap-8 py-8 md:py-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="eyebrow text-emerald-200">
                Trusted by businesses. Proven through results.
              </p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
                Work that delivers real business results.
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/62">
              Every project represents a real business problem solved through design,
              development, automation, and local visibility.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-3 md:flex-row md:items-center">
            <label className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 text-sm text-white/52">
              <Search className="h-4 w-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project, industry, location, or service"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
              />
            </label>
            <label className="flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 text-sm text-white/52">
              <SlidersHorizontal className="h-4 w-4" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option className="text-black">Featured</option>
                <option className="text-black">Live first</option>
                <option className="text-black">A-Z</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
                  activeCategory === category
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.04] text-white/58 hover:bg-white/[0.08] hover:text-white",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="section-shell">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-white/48">
              Showing {visibleProjects.length} of {projects.length} projects
            </p>
            <p className="hidden text-sm text-white/48 md:block">
              Built to scale to 20+ projects, filters, tags, sorting, and pagination.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.035] px-4 py-20">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow text-emerald-200">Google Business projects</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal md:text-5xl">
              Local profiles optimized for discovery, calls, reviews, and directions.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {googleBusinessProjects.map((project) => (
              <article
                key={project.name}
                className="rounded-[1.5rem] border border-white/10 bg-[#090c0b] p-6 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-white/52">
                      {project.industry} - {project.location}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-200 px-3 py-1 text-xs font-semibold text-black">
                    {project.badge}
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[project.rating || "Rating pending", project.reviewCount || "Reviews pending", project.status].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm text-white/68"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.improvements.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.mapsUrl ? (
                    <a
                      href={project.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
                    >
                      <MapPin className="h-4 w-4" />
                      Maps
                    </a>
                  ) : null}
                  {project.directionsUrl ? (
                    <a
                      href={project.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Navigation className="h-4 w-4" />
                      Directions
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="px-4 py-20">
        <div className="section-shell rounded-[1.75rem] border border-white/10 bg-white p-8 text-black md:p-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Build the next result</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
                Want your business to be the next project shown here?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-black text-white hover:bg-black/90">
                <Link href="/#audit">
                  Book a free audit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
