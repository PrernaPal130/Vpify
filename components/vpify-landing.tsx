"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Globe2,
  MapPin,
  Menu,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactEmail, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Packages", href: "#packages" },
  { label: "Impact", href: "#results" },
];

const services = [
  {
    icon: Globe2,
    title: "Premium websites",
    copy: "Fast, refined websites built to turn visitors into enquiries.",
    signal: "Conversion-first UX",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp automation",
    copy: "Capture, qualify, and respond to leads before they go cold.",
    signal: "Lead flow design",
  },
  {
    icon: Workflow,
    title: "Business automation",
    copy: "Reduce repetitive follow-ups, reminders, forms, and handoffs.",
    signal: "Less manual work",
  },
  {
    icon: MapPin,
    title: "Local visibility",
    copy: "Improve Google Maps presence and make the business easier to find.",
    signal: "Better discovery",
  },
];

const process = [
  [
    "Audit",
    "We inspect the current website, WhatsApp journey, Google presence, and lead leaks.",
  ],
  [
    "System",
    "We map the simplest customer path from discovery to enquiry to booking.",
  ],
  [
    "Build",
    "We design, ship, and connect the website, automations, tracking, and local signals.",
  ],
  [
    "Improve",
    "We review behaviour, tighten conversion points, and keep the system useful.",
  ],
];

const packages = [
  {
    name: "Launch",
    price: "Starter system",
    desc: "For businesses that need a clean digital foundation.",
    items: [
      "Premium landing page",
      "WhatsApp CTA flow",
      "Google profile checklist",
      "Basic enquiry tracking",
    ],
  },
  {
    name: "Growth",
    price: "Most chosen",
    desc: "For teams ready to convert more local demand.",
    items: [
      "Multi-section website",
      "WhatsApp automation",
      "Local SEO setup",
      "Forms, tracking, and reporting",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom systems",
    desc: "For service businesses with operational complexity.",
    items: [
      "Advanced funnels",
      "CRM and workflow automation",
      "Campaign landing pages",
      "Ongoing optimization",
    ],
  },
];

const results = [
  ["3 sec", "designed for fast first impressions"],
  ["24/7", "lead capture through WhatsApp"],
  ["Less", "manual follow-up and admin"],
  ["More", "local discovery and trust"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  title,
  copy,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  invert?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className={cn("eyebrow", invert && "text-emerald-200")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 text-4xl font-semibold leading-[1.02] tracking-normal text-foreground md:text-6xl",
          invert && "text-white",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground",
          invert && "text-white/62",
        )}
      >
        {copy}
      </p>
    </motion.div>
  );
}

function AnchorLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/70 hover:text-foreground"
    >
      {children}
    </a>
  );
}

export function VpifyLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.25]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  function handleAuditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = {
      name: String(formData.get("name") || ""),
      businessName: String(formData.get("businessName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      businessType: String(formData.get("businessType") || ""),
      serviceRequired: String(formData.get("serviceRequired") || ""),
      message: String(formData.get("message") || ""),
    };

    const body = [
      "New VPify audit request",
      "",
      `Name: ${fields.name}`,
      `Business name: ${fields.businessName}`,
      `Email: ${fields.email}`,
      `Phone / WhatsApp: ${fields.phone || "Not provided"}`,
      `Business type: ${fields.businessType}`,
      `Service required: ${fields.serviceRequired}`,
      "",
      "Message:",
      fields.message || "Not provided",
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      "New VPify Audit Request",
    )}&body=${encodeURIComponent(body)}`;
    setFormStatus("sent");
    event.currentTarget.reset();
  }

  return (
    <main className="relative overflow-hidden">
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-4 z-40 px-4">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/35 bg-white/72 px-3 shadow-soft backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between">
            <a href="#hero" className="flex items-center gap-3 pl-2">
              <Image
                src="/new.png"
                alt="VPify logo"
                width={120}
                height={120}
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
              />
            </a>
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <AnchorLink key={item.label} href={item.href}>
                  {item.label}
                </AnchorLink>
              ))}
              <AnchorLink href="/work">Work</AnchorLink>
            </div>
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="default"
                className="hidden h-10 px-4 sm:inline-flex"
              >
                <a href="#audit">
                  Free audit
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10 lg:hidden"
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
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid gap-1 border-t border-border/70 px-1 py-3 lg:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white hover:text-foreground"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4" />
                </a>
              ))}
              <a
                href="/work"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white hover:text-foreground"
              >
                Work
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#audit"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 flex items-center justify-between rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
              >
                Book a free audit
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ) : null}
        </div>
      </nav>

      <section
        id="hero"
        className="relative min-h-screen overflow-hidden bg-[#050606] pb-16 pt-28 text-white"
      >
        <div className="absolute inset-0 grid-fade opacity-60" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute left-1/2 top-28 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-emerald-300/10 blur-3xl"
        />
        <div className="section-shell relative z-10 grid min-h-[calc(100vh-9rem)] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/72 backdrop-blur">
              <Sparkles className="h-4 w-4 text-emerald-200" />
              Premium digital systems for local growth
            </div>
            <h1 className="display max-w-5xl text-6xl font-semibold tracking-normal md:text-8xl lg:text-[7.8rem]">
              Get more customers online.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-white/62 md:text-2xl md:leading-9">
              VPify builds elegant websites, WhatsApp automations, and local
              visibility systems that help small businesses attract, convert,
              and manage demand.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <a href="#audit">
                  Book a free audit
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/12 bg-white/8 text-white hover:bg-white/14"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[29rem]"
          >
            <div className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#111414] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-white/42">Lead system</p>
                    <p className="mt-1 text-2xl font-semibold">Today</p>
                  </div>
                  <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-semibold text-black">
                    Live
                  </span>
                </div>
                <div className="space-y-3 py-5">
                  {[
                    ["Google search", "+18 discovery clicks"],
                    ["Website", "7 qualified enquiries"],
                    ["WhatsApp", "4 bookings followed up"],
                    ["Automation", "12 messages handled"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className="flex items-center justify-between rounded-2xl bg-white/[0.055] px-4 py-3"
                    >
                      <span className="text-sm text-white/58">{label}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="rounded-2xl bg-emerald-200 p-4 text-black">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Zap className="h-4 w-4" />
                    Next best action
                  </div>
                  <p className="mt-3 text-2xl font-semibold leading-tight">
                    Reply to 3 warm leads before closing time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="problem" className="py-24 md:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="The real problem"
            title="Your website is not the product. The customer flow is."
            copy="Many local businesses do good work, but lose attention between search, website visits, WhatsApp messages, and manual follow-up."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {[
              "No clear online presence",
              "Outdated first impression",
              "Leads lost on WhatsApp",
              "Manual customer communication",
            ].map((item, index) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="rounded-3xl border border-border bg-white/72 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                <span className="text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <p className="mt-9 text-xl font-semibold leading-tight">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-24 md:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title="Everything needed to turn local attention into enquiries."
            copy="VPify combines design, automation, and visibility into one calm system that works while the business is busy serving customers."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: index * 0.07 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-border bg-[#fbfaf7] p-8 shadow-soft"
                >
                  <div className="absolute right-0 top-0 h-44 w-44 translate-x-16 -translate-y-16 rounded-full bg-emerald-200/55 blur-3xl transition group-hover:bg-emerald-300/70" />
                  <div className="relative">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-foreground text-background">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
                        {service.signal}
                      </span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-normal">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-8 text-muted-foreground">
                      {service.copy}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      Design the system
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 md:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Process"
            title="A measured build process, from leak audit to live system."
            copy="The work starts with customer behaviour, then moves into design and automation. No ornamental complexity."
          />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-border md:block" />
            {process.map(([title, copy], index) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="relative mb-5 grid gap-5 rounded-3xl border border-border bg-white/78 p-6 shadow-soft backdrop-blur md:grid-cols-[4rem_1fr]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 text-lg leading-8 text-muted-foreground">
                    {copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="bg-[#0a0d0c] py-24 text-white md:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Packages"
            title="Choose the depth of system your business needs."
            copy="Each package is scoped around outcomes: trust, enquiries, follow-up speed, and visibility."
            invert
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pack, index) => (
              <motion.article
                key={pack.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className={cn(
                  "rounded-[2rem] border p-7 transition hover:-translate-y-1",
                  pack.featured
                    ? "border-emerald-200 bg-emerald-100 text-black shadow-glow"
                    : "border-white/10 bg-white/[0.055] text-white",
                )}
              >
                <p
                  className={cn(
                    "text-sm font-semibold",
                    pack.featured ? "text-emerald-900" : "text-white/55",
                  )}
                >
                  {pack.price}
                </p>
                <h3 className="mt-3 text-3xl font-semibold">{pack.name}</h3>
                <p
                  className={cn(
                    "mt-4 leading-7",
                    pack.featured ? "text-black/65" : "text-white/58",
                  )}
                >
                  {pack.desc}
                </p>
                <div className="mt-8 space-y-4">
                  {pack.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className={cn(
                    "mt-9 w-full",
                    pack.featured
                      ? "bg-black text-white hover:bg-black/88"
                      : "bg-white text-black hover:bg-white/90",
                  )}
                >
                  <a href="#audit">Book audit</a>
                </Button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="bg-white py-24 md:py-32">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Results"
            title="Designed for the moments where small businesses lose money."
            copy="The goal is a business that looks credible, responds faster, appears locally, and gives every lead a clear next step."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {results.map(([metric, label], index) => (
              <motion.div
                key={metric}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="rounded-[2rem] border border-border bg-[#fbfaf7] p-7 text-center shadow-soft"
              >
                <p className="text-5xl font-semibold tracking-normal">
                  {metric}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-border bg-white p-8 shadow-soft"
          >
            <div className="grid aspect-square place-items-center rounded-[1.5rem] bg-[#101412] text-white">
              <div className="text-center">
                <p className="text-7xl font-semibold tracking-normal">VP</p>
                <p className="mt-3 text-sm text-white/52">
                  Founder-led systems studio
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <p className="eyebrow">Founder story</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-normal md:text-6xl">
              Built for owners who need growth without digital chaos.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              VPify exists because local businesses deserve the same quality of
              digital thinking that startups use, without bloated retainers or
              confusing jargon. The work is founder-led, practical, and focused
              on creating systems that keep producing value after launch.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="audit" className="px-4 pb-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0a0d0c] px-6 py-12 text-white shadow-glow md:px-12 md:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          >
            <div className="text-center lg:text-left">
              <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-emerald-200 text-black lg:mx-0">
                <MousePointerClick className="h-5 w-5" />
              </div>
              <h2 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
                Let us find where your leads are leaking.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
                Fill the audit form and we will review your website, WhatsApp
                journey, and local visibility. You will leave with clear next
                steps.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="border-white/12 bg-white/8 text-white hover:bg-white/14"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Bot className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <form
              onSubmit={handleAuditSubmit}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 text-left backdrop-blur md:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-emerald-200"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Business name
                  <input
                    required
                    name="businessName"
                    autoComplete="organization"
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-emerald-200"
                    placeholder="Business name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-emerald-200"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Phone / WhatsApp
                  <input
                    name="phone"
                    autoComplete="tel"
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/35 focus:border-emerald-200"
                    placeholder="+91..."
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Business type
                  <select
                    required
                    name="businessType"
                    defaultValue=""
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition focus:border-emerald-200"
                  >
                    <option value="" disabled className="text-black">
                      Select type
                    </option>
                    <option className="text-black">Salon</option>
                    <option className="text-black">Clinic</option>
                    <option className="text-black">Coaching institute</option>
                    <option className="text-black">Boutique</option>
                    <option className="text-black">
                      Local service business
                    </option>
                    <option className="text-black">Other</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78">
                  Service required
                  <select
                    required
                    name="serviceRequired"
                    defaultValue=""
                    className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none transition focus:border-emerald-200"
                  >
                    <option value="" disabled className="text-black">
                      Select service
                    </option>
                    <option className="text-black">
                      Premium website development
                    </option>
                    <option className="text-black">WhatsApp automation</option>
                    <option className="text-black">
                      Business process automation
                    </option>
                    <option className="text-black">
                      Google Maps visibility
                    </option>
                    <option className="text-black">
                      Complete growth system
                    </option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-white/78 sm:col-span-2">
                  What do you want to improve?
                  <textarea
                    name="message"
                    rows={4}
                    className="resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-emerald-200"
                    placeholder="Tell us what is not working right now..."
                  />
                </label>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-5 w-full bg-white text-black hover:bg-white/90"
              >
                Submit audit request
                <ArrowRight className="h-5 w-5" />
              </Button>
              {formStatus === "sent" ? (
                <p className="mt-4 text-center text-sm text-emerald-100">
                  Your email app should open with the audit request ready to
                  send.
                </p>
              ) : (
                <p className="mt-4 text-center text-xs leading-5 text-white/45">
                  Form submissions are prepared as an email to {contactEmail}.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="section-shell flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">VPify</p>
          <p className="mt-1">Digital systems for local business growth.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#services" className="hover:text-foreground">
            Services
          </a>
          <a href="#packages" className="hover:text-foreground">
            Packages
          </a>
          <a href="/work" className="hover:text-foreground">
            Work
          </a>
          <a href="#audit" className="hover:text-foreground">
            Free audit
          </a>
          <a href={`mailto:${contactEmail}`} className="hover:text-foreground">
            {contactEmail}
          </a>
        </div>
      </footer>
    </main>
  );
}
