"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  Moon,
  Search,
  Sparkles,
  SunMedium,
  Wand2,
} from "lucide-react";
import {
  showcaseCategories,
  totalCategoryCount,
  totalComponentCount,
} from "@/components/vpify-showcase-config";

const categoryOrder = showcaseCategories.map((category) => category.slug);

export function VpifyShowcase() {
  const [activeCategory, setActiveCategory] = useState(
    showcaseCategories[0]?.slug ?? "",
  );
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return showcaseCategories.filter((category) => {
      if (!query) return true;

      const haystack = [
        category.label,
        category.description,
        ...category.components.flatMap((component) => [
          component.name,
          component.description,
          component.info.category,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search]);

  useEffect(() => {
    if (
      !filteredCategories.some(
        (category) => category.slug === activeCategory,
      ) &&
      filteredCategories[0]
    ) {
      setActiveCategory(filteredCategories[0].slug);
    }
  }, [activeCategory, filteredCategories]);

  useEffect(() => {
    if (!selectedComponents.length && filteredCategories[0]) {
      const firstCategory = filteredCategories[0];
      setSelectedComponents(
        firstCategory.components.map((component) => component.name),
      );
    }
  }, [filteredCategories, selectedComponents.length]);

  const visibleCategory =
    filteredCategories.find((category) => category.slug === activeCategory) ??
    filteredCategories[0];

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    const target = sectionRefs.current[slug];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleSelection = (componentName: string) => {
    setSelectedComponents((current) =>
      current.includes(componentName)
        ? current.filter((name) => name !== componentName)
        : [...current, componentName],
    );
  };

  const categoryCountLabel = `${totalCategoryCount} Categories`;
  const componentCountLabel = `${totalComponentCount} Components`;
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#060816] text-white" : "bg-[#f7f4eb] text-[#111111]"}`}
    >
      <div
        className={`mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:px-8 lg:py-8`}
      >
        <aside className="hidden w-72 shrink-0 lg:block">
          <div
            className={`sticky top-6 rounded-[28px] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] ${isDark ? "border-white/10 bg-white/8" : "border-black/10 bg-white/80"}`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] opacity-70">
              <LayoutGrid className="h-4 w-4" />
              Categories
            </div>
            <div className="mt-5 space-y-2">
              {showcaseCategories.map((category) => {
                const isActive = category.slug === activeCategory;
                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleSelectCategory(category.slug)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${isActive ? (isDark ? "bg-sky-500 text-white" : "bg-[#111111] text-white") : isDark ? "bg-white/5 text-white/80 hover:bg-white/10" : "bg-black/5 text-[#111111]/70 hover:bg-black/10"}`}
                  >
                    <span>{category.label}</span>
                    <span className="text-xs opacity-70">
                      {category.components.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <div
            className={`rounded-[32px] border p-6 shadow-[0_24px_90px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10 ${isDark ? "border-white/10 bg-[#0b1120]/90" : "border-black/10 bg-white/85"}`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${isDark ? "border-sky-400/25 bg-sky-500/10 text-sky-300" : "border-[#111111]/10 bg-[#111111]/5 text-[#111111]/70"}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Internal design reference
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  VPIFY Component Library
                </h1>
                <p
                  className={`mt-4 max-w-2xl text-lg leading-8 ${isDark ? "text-white/70" : "text-[#111111]/70"}`}
                >
                  Browse, compare, and preview every reusable component in the
                  VPIFY design system before building a client website.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:items-end">
                <label
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${isDark ? "border-white/10 bg-white/5 text-white placeholder:text-white/35" : "border-black/10 bg-[#f3efe6] text-[#111111] placeholder:text-[#111111]/35"}`}
                >
                  <Search className="h-4 w-4" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search components"
                    className="w-44 bg-transparent text-sm outline-none sm:w-56"
                  />
                </label>
                <div
                  className={`flex items-center gap-2 rounded-2xl border p-1 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-[#f3efe6]"}`}
                >
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`rounded-xl p-2 transition ${theme === "light" ? (isDark ? "bg-white/10 text-white" : "bg-[#111111] text-white") : isDark ? "text-white/70" : "text-[#111111]/60"}`}
                  >
                    <SunMedium className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`rounded-xl p-2 transition ${theme === "dark" ? "bg-sky-500 text-white" : isDark ? "text-white/70" : "text-[#111111]/60"}`}
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-b border-dashed pb-6">
              {filteredCategories.map((category) => {
                const active = category.slug === activeCategory;
                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleSelectCategory(category.slug)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${active ? (isDark ? "border-sky-500 bg-sky-500 text-white shadow-[0_12px_35px_rgba(14,165,233,0.25)]" : "border-[#111111] bg-[#111111] text-white") : isDark ? "border-white/10 bg-transparent text-white/70 hover:border-sky-400/40 hover:text-white" : "border-black/10 bg-white text-[#111111]/70 hover:border-[#111111]/20 hover:text-[#111111]"}`}
                  >
                    {category.label}
                  </button>
                );
              })}
              {!filteredCategories.length && (
                <div
                  className={`rounded-full border px-4 py-2 text-sm ${isDark ? "border-white/10 text-white/60" : "border-black/10 text-[#111111]/60"}`}
                >
                  No matching categories
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_0.65fr]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`rounded-full px-3 py-1 text-sm font-medium ${isDark ? "bg-white/5 text-white/70" : "bg-[#111111]/5 text-[#111111]/70"}`}
                  >
                    {componentCountLabel}
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-sm font-medium ${isDark ? "bg-white/5 text-white/70" : "bg-[#111111]/5 text-[#111111]/70"}`}
                  >
                    {categoryCountLabel}
                  </div>
                </div>

                {filteredCategories.map((category) => (
                  <section
                    key={category.slug}
                    ref={(element) => {
                      sectionRefs.current[category.slug] = element;
                    }}
                    id={category.slug}
                    className={`rounded-[28px] border p-4 sm:p-6 ${isDark ? "border-white/10 bg-[#0b1224]/80" : "border-black/10 bg-[#fcfaf6]"}`}
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p
                          className={`text-sm font-semibold uppercase tracking-[0.24em] ${isDark ? "text-sky-300" : "text-[#111111]/60"}`}
                        >
                          {category.label}
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                          {category.description}
                        </h2>
                      </div>
                      <div
                        className={`rounded-full px-3 py-1 text-sm ${isDark ? "bg-white/5 text-white/70" : "bg-[#111111]/5 text-[#111111]/70"}`}
                      >
                        {category.components.length} variants
                      </div>
                    </div>

                    <div className="space-y-6">
                      {category.components.map((component) => {
                        const PreviewComponent = component.component;
                        const isSelected = selectedComponents.includes(
                          component.name,
                        );

                        return (
                          <article
                            key={component.name}
                            className={`rounded-[24px] border p-4 sm:p-6 ${isDark ? "border-white/10 bg-[#0f172d]" : "border-black/10 bg-white"}`}
                          >
                            <div
                              className={`sticky top-4 z-10 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 backdrop-blur ${isDark ? "border-white/10 bg-[#0f172d]/90" : "border-black/10 bg-white/90"}`}
                            >
                              <div>
                                <p
                                  className={`text-sm font-semibold uppercase tracking-[0.24em] ${isDark ? "text-sky-300" : "text-[#111111]/60"}`}
                                >
                                  {component.name}
                                </p>
                                <p
                                  className={`text-sm ${isDark ? "text-white/70" : "text-[#111111]/70"}`}
                                >
                                  {component.description}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleSelection(component.name)
                                }
                                className={`rounded-full px-3 py-2 text-sm font-medium transition ${isSelected ? (isDark ? "bg-sky-500 text-white" : "bg-[#111111] text-white") : isDark ? "bg-white/5 text-white/70 hover:bg-white/10" : "bg-[#111111]/5 text-[#111111]/70 hover:bg-[#111111]/10"}`}
                              >
                                {isSelected ? "Selected" : "Select"}
                              </button>
                            </div>

                            <div
                              className={`overflow-hidden rounded-[20px] border ${isDark ? "border-white/10 bg-[#111827]" : "border-black/10 bg-[#fcfaf6]"}`}
                            >
                              <PreviewComponent
                                {...(component.props as Record<
                                  string,
                                  unknown
                                >)}
                                theme={theme}
                              />
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              <button
                                type="button"
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10" : "border-black/10 bg-white text-[#111111]/70 hover:bg-[#111111]/5"}`}
                              >
                                Copy import
                              </button>
                              <button
                                type="button"
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10" : "border-black/10 bg-white text-[#111111]/70 hover:bg-[#111111]/5"}`}
                              >
                                View source
                              </button>
                              <button
                                type="button"
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isDark ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10" : "border-black/10 bg-white text-[#111111]/70 hover:bg-[#111111]/5"}`}
                              >
                                Use component
                              </button>
                            </div>

                            <div
                              className={`mt-5 grid gap-3 rounded-[20px] border p-4 text-sm sm:grid-cols-2 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-[#f8f4ec]"}`}
                            >
                              <div>
                                <p
                                  className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-[#111111]/45"}`}
                                >
                                  Category
                                </p>
                                <p className="mt-1 font-semibold">
                                  {component.info.category}
                                </p>
                              </div>
                              <div>
                                <p
                                  className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-[#111111]/45"}`}
                                >
                                  Best for
                                </p>
                                <p className="mt-1 font-semibold">
                                  {component.info.bestFor.join(", ")}
                                </p>
                              </div>
                              <div>
                                <p
                                  className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-[#111111]/45"}`}
                                >
                                  Responsive
                                </p>
                                <p className="mt-1 font-semibold">
                                  {component.info.responsive}
                                </p>
                              </div>
                              <div>
                                <p
                                  className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-[#111111]/45"}`}
                                >
                                  Animation
                                </p>
                                <p className="mt-1 font-semibold">
                                  {component.info.animation}
                                </p>
                              </div>
                              <div>
                                <p
                                  className={`text-xs uppercase tracking-[0.24em] ${isDark ? "text-white/45" : "text-[#111111]/45"}`}
                                >
                                  Theme
                                </p>
                                <p className="mt-1 font-semibold">
                                  {component.info.theme}
                                </p>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              <aside className="lg:sticky lg:top-6 lg:self-start">
                <div
                  className={`rounded-[28px] border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] ${isDark ? "border-white/10 bg-white/8" : "border-black/10 bg-white/80"}`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] opacity-70">
                    <Wand2 className="h-4 w-4" />
                    Selected components
                  </div>
                  <div className="mt-4 space-y-2">
                    {filteredCategories
                      .flatMap((category) => category.components)
                      .filter((component) =>
                        selectedComponents.includes(component.name),
                      ).length === 0 ? (
                      <p
                        className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-white/10 bg-white/5 text-white/70" : "border-black/10 bg-[#f8f4ec] text-[#111111]/70"}`}
                      >
                        Select components to compare them here.
                      </p>
                    ) : (
                      filteredCategories
                        .flatMap((category) => category.components)
                        .filter((component) =>
                          selectedComponents.includes(component.name),
                        )
                        .map((component) => (
                          <div
                            key={component.name}
                            className={`rounded-2xl border px-4 py-3 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-[#f8f4ec]"}`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold">
                                {component.name}
                              </span>
                              <span
                                className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.24em] ${isDark ? "bg-sky-500/10 text-sky-300" : "bg-[#111111]/5 text-[#111111]/70"}`}
                              >
                                {component.info.category}
                              </span>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  <div
                    className={`mt-5 rounded-[20px] border p-4 text-sm ${isDark ? "border-white/10 bg-white/5 text-white/70" : "border-black/10 bg-[#f8f4ec] text-[#111111]/70"}`}
                  >
                    <p className="font-semibold">Fast workflow</p>
                    <p className="mt-2 leading-7">
                      Use this page as your internal reference board while
                      building new landing pages and client-ready systems.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
