"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ctaUrl = "https://discord.gg/sAvYkhYpPY";

const navItems = [
  { label: "Results", href: "#results" },
  { label: "Packages", href: "#packages" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" }
];

const stats = [
  { value: 175, suffix: "M+", label: "Contributed Views" },
  { value: 150, suffix: "K+", label: "Subscribers Influenced" },
  { value: 16, suffix: "M", label: "Highest Viewed Video" },
  { value: 5, suffix: ".0", label: "Client Rating" },
  { value: 3, suffix: "+", label: "Years on YouTube" }
];

const reasons = [
  ["High Retention", "Every edit is paced to keep viewers watching."],
  ["Creator Focused", "I edit with YouTube growth in mind, not just flashy effects."],
  ["Fast Delivery", "Quick turnaround without sacrificing quality."],
  ["Roblox Friendly", "Pay in USD or Robux."]
];

const packages = [
  {
    name: "Starter",
    usd: "$10",
    robux: "TBD Robux",
    unit: "1 Short",
    copy: "Includes captions, cuts, zooms, sound effects, and clean pacing."
  },
  {
    name: "Creator",
    usd: "$25",
    robux: "TBD Robux",
    unit: "3 Shorts",
    copy: "Best for creators who want consistent uploads.",
    featured: true
  },
  {
    name: "Growth",
    usd: "$40",
    robux: "TBD Robux",
    unit: "5 Shorts",
    copy: "Best value for creators posting multiple times per week."
  }
];

const featuredShorts = [
  {
    id: "BzlSTymTo6k",
    url: "https://www.youtube.com/shorts/BzlSTymTo6k",
    title: "Featured Short 1"
  },
  {
    id: "F5gVRL4hT24",
    url: "https://www.youtube.com/shorts/F5gVRL4hT24",
    title: "Featured Short 2"
  },
  {
    id: "GHWY8XjprR0",
    url: "https://www.youtube.com/shorts/GHWY8XjprR0",
    title: "Featured Short 3"
  }
];

const steps = [
  "Join the Discord",
  "Open a ticket",
  "Send your footage and package choice",
  "Get your edited videos"
];

const reviews = [
  "Hxvac made the video way more engaging and easy to watch.",
  "Fast, clean edits and great communication."
];

function Button({
  children,
  href,
  variant = "dark"
}: {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "light";
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center justify-center rounded-full border-2 border-black px-6 py-3 text-sm font-black uppercase tracking-wide transition ${
        variant === "dark"
          ? "bg-black text-white shadow-ink hover:shadow-none"
          : "bg-white text-black shadow-ink hover:bg-black hover:text-white hover:shadow-none"
      }`}
    >
      {children}
    </motion.a>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        className="mb-3 text-xs font-black uppercase tracking-[0.28em]"
      >
        {eyebrow}
      </motion.p>
      <span className="reveal-mask inline-block">
        <motion.h2
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-black leading-tight sm:text-5xl"
        >
          {title}
        </motion.h2>
      </span>
    </div>
  );
}

function LogoMark({ size = "large" }: { size?: "small" | "large" }) {
  const isSmall = size === "small";

  return (
    <div
      className={`relative grid place-items-center rounded-[22%] border-2 border-white bg-black text-white ${
        isSmall ? "h-full w-full" : "h-full w-full"
      }`}
      aria-hidden="true"
    >
      <div className={`${isSmall ? "text-lg" : "text-8xl"} font-display font-black italic leading-none tracking-tighter`}>
        H
      </div>
      {!isSmall ? (
        <div className="absolute bottom-[18%] h-[3px] w-[48%] -rotate-12 rounded-full bg-white" />
      ) : null}
    </div>
  );
}

function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.82, rotate: -4, opacity: 0 }}
        animate={{ scale: [0.82, 1.05, 1], rotate: [ -4, 2, 0], opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative h-36 w-36 overflow-hidden rounded-[2rem] border-2 border-black bg-black p-3 shadow-ink"
      >
        <LogoMark />
      </motion.div>
    </motion.div>
  );
}

function TiltCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [7, -7]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-7, 7]), { stiffness: 260, damping: 20 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 56;
    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(value * progress));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-2 border-black bg-white/90 px-4 py-3 shadow-softInk backdrop-blur">
        <a href="#top" className="flex items-center gap-3 font-display text-lg font-black">
          <span className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-black bg-black">
            <LogoMark size="small" />
          </span>
          Made By Hxvac
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border-2 border-black px-4 py-2 text-sm font-black md:hidden"
        >
          Menu
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-bold hover:underline">
              {item.label}
            </a>
          ))}
          <Button href={ctaUrl}>Work With Me</Button>
        </div>
      </nav>
      {open ? (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-[1.5rem] border-2 border-black bg-white p-4 shadow-ink md:hidden"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 font-black hover:bg-black hover:text-white">
              {item.label}
            </a>
          ))}
          <Button href={ctaUrl}>Work With Me</Button>
        </motion.div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32">
      <Doodles />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-5 inline-flex rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] shadow-ink"
          >
            High-retention shorts editing
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 34, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl sm:leading-[0.92] lg:text-8xl"
          >
            Made By Hxvac
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-neutral-700"
          >
            High-retention video editing for creators who want people to actually watch.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button href={ctaUrl}>Work With Me</Button>
            <Button href="#work" variant="light">See My Work</Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.84, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.9, delay: 0.65, type: "spring" }}
          className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden rounded-[2rem] border-2 border-black bg-black p-5 shadow-ink"
        >
          <LogoMark />
          <div className="absolute bottom-12 left-0 right-0 text-center font-display text-2xl font-black uppercase tracking-[0.22em] text-white sm:text-3xl">
            Hxvac
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Doodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.span animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="doodle left-[8%] top-[22%] hidden h-16 w-16 rounded-full sm:block" />
      <motion.span animate={{ y: [0, 18, 0], rotate: [0, -9, 0] }} transition={{ duration: 7, repeat: Infinity }} className="doodle right-[10%] top-[18%] hidden h-20 w-20 rounded-[1.3rem] md:block" />
      <motion.span animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="scribble bottom-[15%] left-[12%] hidden sm:block" />
      <motion.span animate={{ rotate: [8, -8, 8] }} transition={{ duration: 4.5, repeat: Infinity }} className="star-doodle bottom-[20%] right-[13%] hidden sm:block" />
    </div>
  );
}

function Results() {
  return (
    <section id="results" className="section-pad">
      <SectionTitle eyebrow="Proof in motion" title="The Results" />
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[1.5rem] border-2 border-black bg-white p-6 text-center shadow-ink"
          >
            <div className="font-display text-4xl font-black">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-neutral-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto mt-9 max-w-2xl text-center text-sm font-semibold text-neutral-600">
        Statistics represent content I've contributed to through editing.
      </p>
    </section>
  );
}

function Why() {
  return (
    <section className="section-pad bg-paper">
      <SectionTitle eyebrow="Built for creators" title="Why Creators Choose Me" />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map(([title, copy], index) => (
          <TiltCard key={title} className="h-full">
            <motion.article
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08 }}
              className="h-full rounded-[1.5rem] border-2 border-black bg-white p-6 shadow-ink"
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-black text-xl font-black text-white">
                {index + 1}
              </div>
              <h3 className="font-display text-2xl font-black">{title}</h3>
              <p className="mt-3 font-semibold leading-relaxed text-neutral-700">{copy}</p>
            </motion.article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const [currency, setCurrency] = useState<"usd" | "robux">("usd");
  return (
    <section id="packages" className="section-pad">
      <SectionTitle eyebrow="Simple packages" title="Pricing / Packages" />
      <div className="mb-10 flex justify-center">
        <div className="relative grid grid-cols-2 rounded-full border-2 border-black bg-white p-1 shadow-ink">
          <motion.span
            layout
            className={`absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-black ${currency === "robux" ? "left-[calc(50%+0.125rem)]" : "left-1"}`}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          />
          {(["usd", "robux"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCurrency(item)}
              className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black uppercase transition ${currency === item ? "text-white" : "text-black"}`}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-current text-xs leading-none">
                {item === "usd" ? "$" : "R"}
              </span>
              {item === "usd" ? "USD" : "Robux"}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {packages.map((pkg) => (
          <motion.article
            key={pkg.name}
            whileHover={{ y: -12, rotate: pkg.featured ? 0 : -1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={`relative rounded-[1.75rem] border-2 border-black bg-white p-7 shadow-ink ${pkg.featured ? "lg:-mt-5" : ""}`}
          >
            {pkg.featured ? (
              <span className="absolute -top-4 left-7 rounded-full border-2 border-black bg-black px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                Popular
              </span>
            ) : null}
            <h3 className="font-display text-3xl font-black">{pkg.name}</h3>
            <div className="mt-6 font-display text-6xl font-black">{currency === "usd" ? pkg.usd : pkg.robux}</div>
            <p className="mt-2 text-lg font-black">{pkg.unit}</p>
            <p className="mt-5 min-h-20 font-semibold leading-relaxed text-neutral-700">{pkg.copy}</p>
            <div className="mt-7">
              <Button href={ctaUrl} variant={pkg.featured ? "dark" : "light"}>Choose Package</Button>
            </div>
          </motion.article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-semibold text-neutral-600">
        Full video creation or heavier edits may cost more depending on complexity.
      </p>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="section-pad bg-paper">
      <SectionTitle eyebrow="Shorts that move" title="Featured Work" />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {featuredShorts.map((short, index) => (
          <motion.article
            key={short.id}
            initial={{ opacity: 0, x: index === 0 ? -60 : index === 2 ? 60 : 0, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ scale: 1.04, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
            viewport={{ once: true, amount: 0.35 }}
            className="group rounded-[2rem] border-2 border-black bg-white p-3 shadow-ink"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border-2 border-black bg-black">
              <iframe
                title={short.title}
                src={`https://www.youtube.com/embed/${short.id}?autoplay=1&mute=1&loop=1&playlist=${short.id}&controls=0&playsinline=1&modestbranding=1&rel=0`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="pointer-events-none h-full w-full scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center">
                <span className="rounded-full border-2 border-white bg-black/70 px-4 py-2 text-sm font-black uppercase tracking-wider text-white backdrop-blur">
                  Short {index + 1}
                </span>
              </div>
            </div>
            <a
              href={short.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full justify-center rounded-full border-2 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-wide transition hover:bg-black hover:text-white"
            >
              Watch on YouTube
            </a>
          </motion.article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="https://www.youtube.com/shorts/BzlSTymTo6k" variant="light">View More Work</Button>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section-pad">
      <SectionTitle eyebrow="Start fast" title="How It Works" />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.article
            key={step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.07 }}
            className="relative rounded-[1.5rem] border-2 border-black bg-white p-6 shadow-ink"
          >
            <div className="mb-8 font-display text-6xl font-black leading-none">0{index + 1}</div>
            <h3 className="text-xl font-black">{step}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section-pad bg-paper">
      <SectionTitle eyebrow="Client words" title="Reviews" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <TiltCard key={review}>
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.5rem] border-2 border-black bg-white p-7 shadow-ink"
            >
              <div aria-label="5 stars" className="mb-5 text-2xl tracking-widest">5/5</div>
              <p className="text-xl font-black leading-relaxed">"{review}"</p>
            </motion.article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <footer className="px-5 py-16">
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-2 border-black bg-black px-6 py-16 text-center text-white shadow-softInk"
      >
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em]">Ready when you are</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
          Your next viral Short could start here.
        </h2>
        <div className="mt-9">
          <motion.a
            href={ctaUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.94 }}
            className="inline-flex rounded-full border-2 border-white bg-white px-8 py-4 text-sm font-black uppercase tracking-wide text-black shadow-[8px_8px_0_rgba(255,255,255,0.28)]"
          >
            Work With Me
          </motion.a>
        </div>
        <p className="mt-10 text-sm font-semibold text-white/70">Made By Hxvac (c) 2026</p>
      </motion.section>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main>
        <Hero />
        <Results />
        <Why />
        <Pricing />
        <FeaturedWork />
        <HowItWorks />
        <Reviews />
        <FinalCta />
      </main>
    </>
  );
}
