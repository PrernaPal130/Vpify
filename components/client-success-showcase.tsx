"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  PlayCircle,
  Search,
  Star,
  Video
} from "lucide-react";
import {
  clientProjects,
  resultFilters,
  reviewCtaLinks,
  type ClientProject,
  type ProjectMetric,
  type ResultsFilter,
  type ReviewSource
} from "@/lib/clients";

const reviewIcons: Record<ReviewSource, typeof Star> = {
  "Google Reviews": Star,
  "Google Business Profile": MapPin,
  "Website Review": Globe2,
  "WhatsApp Feedback": MessageCircle,
  "Video Testimonial": Video,
  "Email Feedback": Mail
};

const sectionStats = [
  { value: 50, suffix: "+", label: "Digital projects shipped" },
  { value: 98, suffix: "%", label: "Client satisfaction target" },
  { value: 4.9, suffix: "★", label: "Average verified rating", decimals: 1 },
  { value: 100, suffix: "%", label: "Mobile responsive builds" }
];

function useCountUp(target: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const startedAt = performance.now();
    const duration = 1200;

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, decimals, target]);

  return value.toFixed(decimals);
}

function AnimatedStat({
  stat,
  active
}: {
  stat: (typeof sectionStats)[number];
  active: boolean;
}) {
  const value = useCountUp(stat.value, active, stat.decimals ?? 0);

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
      <p className="text-4xl font-semibold tracking-normal text-white md:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm text-white/52">{stat.label}</p>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#f5c451]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4"
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function MetricPill({ metric }: { metric: ProjectMetric }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
      <p className="text-2xl font-semibold tracking-normal text-white">{metric.value}</p>
      <p className="mt-1 text-xs leading-5 text-white/48">{metric.label}</p>
    </div>
  );
}

function WebsitePreview({ project }: { project: ClientProject }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10 bg-[#111615]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 10%, ${project.accent}55 0, transparent 30%), linear-gradient(135deg, #050706 0%, #111615 48%, #f5f3ec 48%, #ffffff 100%)`
        }}
      />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between rounded-full border border-white/12 bg-white/10 px-3 py-2 text-white backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-[0.65rem] font-bold text-black"
            style={{ backgroundColor: project.accent }}
          >
            {project.logo}
          </span>
          <span className="text-xs font-semibold">{project.businessName}</span>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[0.62rem] text-white/66">
          {project.status}
        </span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/14 bg-white/90 p-5 text-black shadow-2xl backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-800">
              {project.industry}
            </p>
            <p className="mt-2 max-w-[16rem] text-2xl font-semibold leading-tight">
              {project.projectType}
            </p>
          </div>
          <div className="hidden h-16 w-24 rounded-2xl bg-[#0b0f0e] sm:block" />
        </div>
        <div className="mt-5 grid grid-cols-[1fr_0.8fr] gap-2">
          <span className="h-2 rounded-full bg-black/12" />
          <span className="h-2 rounded-full bg-black/12" />
          <span className="h-2 rounded-full bg-black/12" />
          <span className="h-2 rounded-full bg-emerald-600/55" />
        </div>
      </div>
    </div>
  );
}

function ProjectActionButton({ label, href }: { label: string; href: string }) {
  const disabled = href === "#";
  const content = (
    <>
      {label}
      <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white/45"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 text-sm font-medium text-white transition hover:border-emerald-300/40 hover:bg-emerald-300/12"
    >
      {content}
    </a>
  );
}

function ProjectCard({ project, index }: { project: ClientProject; index: number }) {
  const ReviewIcon = reviewIcons[project.reviewSource];
  const actions = [
    project.websiteUrl && { label: "Visit Website", href: project.websiteUrl },
    project.googleBusinessUrl && {
      label: "View Google Business",
      href: project.googleBusinessUrl
    },
    project.googleReviewUrl && {
      label: "Read Google Reviews",
      href: project.googleReviewUrl
    },
    project.caseStudyUrl && { label: "View Case Study", href: project.caseStudyUrl },
    project.demoUrl && { label: "Watch Demo", href: project.demoUrl }
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-[28px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur"
    >
      <div className="overflow-hidden rounded-[24px]">
        <motion.div transition={{ duration: 0.6 }} className="group-hover:scale-[1.03]">
          <WebsitePreview project={project} />
        </motion.div>
      </div>

      <div className="px-2 pb-2 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold text-black"
              style={{ backgroundColor: project.accent }}
            >
              {project.logo}
            </span>
            <div>
              <h3 className="text-2xl font-semibold tracking-normal text-white">
                {project.businessName}
              </h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/52">
                <span>{project.industry}</span>
                <span className="text-white/24">/</span>
                <span>{project.location}</span>
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            {project.status}
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-medium text-white">{project.projectType}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {project.metrics.map((metric) => (
            <MetricPill key={`${project.id}-${metric.value}-${metric.label}`} metric={metric} />
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ReviewIcon className="h-4 w-4 text-emerald-200" />
              {project.reviewSource}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified Client
            </span>
          </div>
          {project.rating > 0 ? (
            <div className="mb-3 flex items-center gap-3">
              <Stars rating={project.rating} />
              <span className="text-sm text-white/54">
                {project.rating.toFixed(1)} / {project.reviewCount} review
                {project.reviewCount === 1 ? "" : "s"}
              </span>
            </div>
          ) : null}
          <p className="text-base leading-7 text-white/72">&quot;{project.review}&quot;</p>
          <p className="mt-4 text-sm font-semibold text-white">{project.reviewerName}</p>
          <p className="mt-1 text-xs text-white/45">{project.reviewerRole}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.completedServices.map((service) => (
            <span
              key={`${project.id}-${service}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/66"
            >
              <Check className="h-3.5 w-3.5 text-emerald-200" />
              {service}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <ProjectActionButton
              key={`${project.id}-${action.label}`}
              label={action.label}
              href={action.href}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ClientDirectory({ projects }: { projects: ClientProject[] }) {
  return (
    <div className="mt-20 rounded-[28px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur">
      <div className="grid gap-2 px-4 py-4 text-sm text-white/42 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr_1fr_0.5fr]">
        <span>Business</span>
        <span>Industry</span>
        <span>Location</span>
        <span>Website</span>
        <span>Google Business</span>
        <span>Status</span>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <a
            key={`directory-${project.id}`}
            href={project.websiteUrl || project.googleBusinessUrl || "#"}
            target={project.websiteUrl && project.websiteUrl !== "#" ? "_blank" : undefined}
            rel={project.websiteUrl && project.websiteUrl !== "#" ? "noopener noreferrer" : undefined}
            className="group grid gap-3 rounded-3xl border border-white/0 px-4 py-4 text-sm text-white/68 transition hover:border-white/10 hover:bg-white/[0.055] md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr_1fr_0.5fr] md:items-center"
          >
            <span className="flex items-center gap-3 font-semibold text-white">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl text-xs font-bold text-black"
                style={{ backgroundColor: project.accent }}
              >
                {project.logo}
              </span>
              {project.businessName}
            </span>
            <span>{project.industry}</span>
            <span>{project.location}</span>
            <span>{project.websiteUrl && project.websiteUrl !== "#" ? "Visit Website" : "Coming Soon"}</span>
            <span>
              {project.googleBusinessUrl && project.googleBusinessUrl !== "#"
                ? "View Profile"
                : "Coming Soon"}
            </span>
            <span className="inline-flex items-center justify-between gap-2 text-white">
              {project.status}
              <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ClientSuccessShowcase() {
  const [activeFilter, setActiveFilter] = useState<ResultsFilter>("All");
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return clientProjects;
    return clientProjects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="relative overflow-hidden bg-[#050706] px-4 py-24 text-white md:py-32">
      <div className="absolute inset-0 grid-fade opacity-[0.18]" />
      <div className="absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mx-auto inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-emerald-200">
            RESULTS &amp; TESTIMONIALS
          </p>
          <h2 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
            Trusted by businesses. Proven through results.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/58">
            Explore real client websites, verified reviews, Google Business optimizations, and digital systems built by VPIFY.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
          {resultFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "border-emerald-300/50 bg-emerald-300 text-black shadow-[0_0_40px_rgba(40,213,150,0.20)]"
                  : "border-white/10 bg-white/[0.045] text-white/64 hover:border-white/18 hover:bg-white/[0.075] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div ref={statsRef} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectionStats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} active={statsInView} />
          ))}
        </div>

        <motion.div layout className="mt-14 grid gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <ClientDirectory projects={clientProjects} />

        <div className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-3xl font-semibold tracking-normal text-white">
              Worked with VPIFY? Share your experience.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Reviews help future business owners understand the quality of the work before they start.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
            <a
              href={reviewCtaLinks.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emerald-200"
            >
              Write a Google Review
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={reviewCtaLinks.websiteReview}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              Leave Website Review
            </a>
            <a
              href={reviewCtaLinks.contact}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              Contact VPIFY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
