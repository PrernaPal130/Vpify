"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { websiteTemplates, comingSoonIndustries } from "./vpify-templates-config";

const cardHover = {
  rest: { y: 0, boxShadow: "0 8px 30px rgba(2,6,23,0.08)", scale: 1 },
  hover: { y: -8, boxShadow: "0 20px 50px rgba(2,6,23,0.12)", scale: 1.01 },
};

export function VpifyTemplates() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-12 text-center">
          <p className="eyebrow">Industry-Specific Website Templates</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Explore professionally designed websites tailored for different industries. Every template is responsive, SEO-ready, fast, and fully customizable to match your business.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {websiteTemplates.map((t) => (
            <motion.article
              key={t.id}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(2,6,23,0.06)]"
            >
              <div className="overflow-hidden">
                <div className="relative h-[360px] w-full bg-gray-100">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(min-width:1280px) 1280px, 100vw"
                    className="object-cover object-center rounded-t-[24px]"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold">{t.category}</span>
                  <span className="text-sm text-muted-foreground">{t.id}</span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {t.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3">
                  <Button asChild size="default" className="inline-flex items-center">
                    <Link href={t.url}>
                      View Live Demo
                      <span className="ml-2">→</span>
                    </Link>
                  </Button>

                  <Button asChild variant="secondary" size="default" className="inline-flex items-center">
                    <Link href="#audit">Use This Design</Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold">More Industries Coming Soon</h3>
          <p className="mt-2 text-sm text-muted-foreground">We&apos;re actively building templates for more industries. Check back soon or request your industry.</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {comingSoonIndustries.map((name) => (
              <div key={name} className="rounded-lg border border-border bg-gray-100/60 p-4 text-center opacity-80">
                <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-white text-muted-foreground">
                  <Tag className="h-5 w-5" />
                </div>
                <div className="font-semibold">{name}</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/40 px-2 py-1 text-xs font-medium">Coming Soon</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[20px] border p-8 text-center">
          <h3 className="text-2xl font-semibold">Don&apos;t See Your Industry?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">Every business is unique. We create fully custom websites tailored to your brand, goals and customers.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#audit">Request Custom Website</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="#audit">Schedule Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VpifyTemplates;
