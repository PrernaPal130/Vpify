import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/contact";

const testimonials = [
  {
    quote:
      "VPify gave our business a premium online presence and made WhatsApp enquiries easier to handle. The whole customer journey feels clearer now.",
    name: "Aarav Mehta",
    business: "Salon owner"
  },
  {
    quote:
      "We were getting messages but losing track of follow-ups. VPify helped us create a simple system that makes every enquiry feel managed.",
    name: "Nisha Kapoor",
    business: "Coaching institute founder"
  },
  {
    quote:
      "The website finally explains what we do without feeling cluttered. Patients can find us, trust us, and contact us faster.",
    name: "Dr. Rohan Shah",
    business: "Clinic director"
  },
  {
    quote:
      "Our old site looked dated. VPify made the brand feel modern and added the right calls-to-action for local customers.",
    name: "Meera Arora",
    business: "Boutique owner"
  },
  {
    quote:
      "The work felt very practical. No jargon, just a better website, better WhatsApp flow, and clearer next steps for leads.",
    name: "Kabir Sethi",
    business: "Service business owner"
  },
  {
    quote:
      "The biggest change was confidence. We now have a digital system we can send customers to without apologizing for it.",
    name: "Priya Malhotra",
    business: "Wellness studio founder"
  }
];

const outcomes = [
  "Cleaner first impression",
  "Faster WhatsApp response path",
  "Better enquiry clarity",
  "More confidence sharing the business online"
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-foreground">
      <section className="relative overflow-hidden bg-[#060706] px-4 pb-20 pt-8 text-white md:pb-28">
        <div className="absolute inset-0 grid-fade opacity-50" />
        <div className="section-shell relative z-10">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-bold text-black">
                V
              </span>
              <span className="text-sm font-semibold">VPify</span>
            </Link>
            <Button asChild variant="secondary" className="border-white/12 bg-white/8 text-white hover:bg-white/14">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </nav>

          <div className="mx-auto max-w-4xl py-20 text-center md:py-28">
            <p className="eyebrow text-emerald-200">Testimonials</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
              Quiet systems. Visible business growth.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Stories from local businesses using sharper websites, WhatsApp flows, and digital systems to turn attention into real enquiries.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/#audit">
                  Book a free audit
                  <ArrowRight className="h-5 w-5" />
                </Link>
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
          </div>
        </div>
      </section>

      <section className="section-shell py-20 md:py-28">
        <div className="mb-10 grid gap-4 md:grid-cols-4">
          {outcomes.map((outcome) => (
            <div key={outcome} className="rounded-3xl border border-border bg-white p-5 shadow-soft">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              <p className="mt-5 text-sm font-semibold leading-6">{outcome}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group rounded-[2rem] border border-border bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1"
            >
              <Quote className="h-7 w-7 text-emerald-700" />
              <p className="mt-7 text-lg leading-8 text-foreground/82">“{item.quote}”</p>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.business}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#0a0d0c] px-6 py-16 text-center text-white shadow-glow md:px-12 md:py-20">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.02] tracking-normal md:text-6xl">
            Want a customer journey worth talking about?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/62">
            Start with a free audit of your website, WhatsApp flow, and local visibility.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/#audit">Book a free audit</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="border-white/12 bg-white/8 text-white hover:bg-white/14">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
