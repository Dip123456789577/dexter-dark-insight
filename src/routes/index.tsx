import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

import heroPortrait from "@/assets/hero-portrait.jpg";
import bloodSlide from "@/assets/blood-slide.jpg";
import miamiNight from "@/assets/miami-night.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import gal4 from "@/assets/gallery-4.jpg";

import photoMichael from "@/assets/michael-c-hall.png";
import photoJennifer from "@/assets/jennifer-carpenter.png";
import photoJames from "@/assets/james-remar.png";
import photoDavid from "@/assets/david-zayas.png";
import photoJulie from "@/assets/julie-benz.png";
import photoCSLee from "@/assets/c-s-lee.png";
import photoDesmond from "@/assets/desmond-harrington.png";
import photoLuna from "@/assets/luna-lauren-velez.png";

export const Route = createFileRoute("/")({
  component: DexterPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const CAST = [
  {
    actor: "Michael C. Hall",
    role: "Dexter Morgan",
    bio: "Miami Metro's mild-mannered blood-spatter analyst — and a serial killer bound by Harry's Code.",
    code: "SUBJECT-01",
    image: photoMichael,
    demoReel: "R6_qsTCBns8",
  },
  {
    actor: "Jennifer Carpenter",
    role: "Debra Morgan",
    bio: "Fierce, foul-mouthed homicide detective. Dexter's sister — and his sharpest blind spot.",
    code: "DET-02",
    image: photoJennifer,
    demoReel: "QplvibD-Xjo",
  },
  {
    actor: "James Remar",
    role: "Harry Morgan",
    bio: "Dexter's adoptive father and the architect of the Code. A ghost that refuses to stay buried.",
    code: "MENTOR-03",
    image: photoJames,
    demoReel: "dQw4w9WgXcQ",
  },
  {
    actor: "David Zayas",
    role: "Angel Batista",
    bio: "A warm, sincere homicide sergeant who sees the man Dexter pretends to be.",
    code: "SGT-04",
    image: photoDavid,
    demoReel: "dQw4w9WgXcQ",
  },
  {
    actor: "Julie Benz",
    role: "Rita Bennett",
    bio: "The bruised angel Dexter chose as camouflage — until the mask slipped.",
    code: "CIV-05",
    image: photoJulie,
    demoReel: "dQw4w9WgXcQ",
  },
  {
    actor: "C. S. Lee",
    role: "Vince Masuka",
    bio: "Forensic specialist. Filthy jokes, keen eyes, and just enough obliviousness to keep Dexter safe.",
    code: "FOR-06",
    image: photoCSLee,
    demoReel: "dQw4w9WgXcQ",
  },
  {
    actor: "Desmond Harrington",
    role: "Joey Quinn",
    bio: "A detective whose ambition circles Dexter's orbit like a shark scenting blood.",
    code: "DET-07",
    image: photoDesmond,
    demoReel: "dQw4w9WgXcQ",
  },
  {
    actor: "Luna Lauren Vélez",
    role: "María LaGuerta",
    bio: "The Lieutenant who tied all the loose ends — and paid the price for tying them too tight.",
    code: "LT-08",
    image: photoLuna,
    demoReel: "dQw4w9WgXcQ",
  },
];

const SEASONS = [
  {
    n: "S01",
    title: "The Ice Truck Killer",
    year: "2006",
    episodes: 12,
    summary:
      "A mirror image of Dexter emerges, leaving bloodless bodies across Miami and forcing him to confront his repressed origin.",
    highlights: ["Introducing the Code", "Brian Moser", "Rita & the kids"],
  },
  {
    n: "S02",
    title: "The Bay Harbor Butcher",
    year: "2007",
    episodes: 12,
    summary:
      "Dexter's underwater graveyard is discovered, launching a manhunt led by the relentless Special Agent Frank Lundy.",
    highlights: ["Lila West", "The task force", "Rita's ultimatum"],
  },
  {
    n: "S04",
    title: "The Trinity Killer",
    year: "2009",
    episodes: 12,
    summary:
      "Arthur Mitchell — a family man with a decades-long killing cycle — becomes Dexter's mentor and greatest adversary.",
    highlights: ["John Lithgow as Arthur", "The bathtub", "The finale that broke television"],
  },
  {
    n: "S05",
    title: "The Barrel Girl Gang",
    year: "2010",
    episodes: 12,
    summary:
      "Grieving and adrift, Dexter finds a kindred survivor in Lumen Pierce and hunts the men who tortured her.",
    highlights: ["Lumen", "Cole & Boyd", "Jordan Chase"],
  },
  {
    n: "S07",
    title: "Truth Revealed",
    year: "2012",
    episodes: 12,
    summary:
      "Debra witnesses her brother's true nature — shattering her world and pulling her into the heart of his darkness.",
    highlights: ["The church", "Isaak Sirko", "Hannah McKay"],
  },
  {
    n: "NB",
    title: "New Blood — Iron Lake",
    year: "2021",
    episodes: 10,
    summary:
      "Ten years after the finale, Dexter lives as Jim Lindsay in upstate New York — until his past finds him again.",
    highlights: ["Harrison returns", "Kurt Caldwell", "The frozen woods"],
  },
];

const REVIEWS = [
  {
    quote:
      "One of the most complex character studies in television history. A hauntingly beautiful dance with darkness that refuses to let go.",
    source: "The Hollywood Reporter",
  },
  {
    quote:
      "Michael C. Hall delivers a career-defining performance — surgical, seductive, and quietly devastating.",
    source: "Variety",
  },
  {
    quote:
      "Dexter dared to make us root for a monster. Nearly two decades later, we still are.",
    source: "The New York Times",
  },
  {
    quote:
      "Season four remains an unshakable high-water mark for prestige television suspense.",
    source: "Rolling Stone",
  },
];

const AWARDS = [
  { year: "2008", title: "Golden Globe — Best Actor, Drama", who: "Michael C. Hall" },
  { year: "2010", title: "Screen Actors Guild — Outstanding Actor", who: "Michael C. Hall" },
  { year: "2009", title: "Peabody Award", who: "Dexter" },
  { year: "2010", title: "Emmy — Outstanding Guest Actor", who: "John Lithgow" },
  { year: "2007–13", title: "24 Primetime Emmy Nominations", who: "Series-wide" },
];

const FAQ = [
  {
    q: "Where can I stream Dexter?",
    a: "The original series and Dexter: New Blood stream on Paramount+ with Showtime in most regions. Availability varies by territory.",
  },
  {
    q: "Do I need to watch the original series before New Blood?",
    a: "Yes. New Blood is a direct continuation of the finale and assumes familiarity with the core cast, the Code, and the events of season eight.",
  },
  {
    q: "How many seasons are there?",
    a: "Eight seasons of the original Dexter (2006–2013), followed by the ten-episode limited series Dexter: New Blood (2021).",
  },
  {
    q: "Is Dexter based on a book?",
    a: "The series is adapted from Jeff Lindsay's novel Darkly Dreaming Dexter and the subsequent Dexter novel series.",
  },
];

const STATS = [
  { label: "IMDb Rating", value: 8.6, max: 10, unit: "" },
  { label: "Rotten Tomatoes", value: 71, max: 100, unit: "%" },
  { label: "Google Users", value: 93, max: 100, unit: "%" },
];

/* ------------------------------------------------------------------ */
/* Utility hooks & components                                          */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-crimson/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
      {children}
    </span>
  );
}

function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.28em] text-primary/80 ${className}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Loader                                                              */
/* ------------------------------------------------------------------ */

function ForensicLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"scan" | "glitch" | "done">("scan");

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setProgress(t * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("glitch");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onDone, 400);
        }, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Radial pulse */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-crimson/40"
            style={{
              animation: `pulse-ring 3s ease-out ${i * 1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {/* Fingerprint / DNA SVG */}
        <div className={`mx-auto mb-8 h-32 w-32 ${phase === "glitch" ? "glitch" : ""}`}>
          <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
            <defs>
              <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* fingerprint spirals */}
            {[8, 14, 20, 26, 32, 38, 44].map((r, i) => (
              <motion.circle
                key={r}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="url(#lg)"
                strokeWidth="1.2"
                strokeDasharray={`${r * 2} ${r * 4}`}
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{
                  pathLength: { duration: 1.4, delay: i * 0.05 },
                  rotate: { duration: 20 - i * 2, repeat: Infinity, ease: "linear" },
                }}
                style={{ transformOrigin: "50px 50px" }}
              />
            ))}
            {/* crosshair */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.5" />
          </svg>
        </div>

        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/70">
          Case File #0821 · Miami Metro Homicide
        </div>
        <div className="font-display text-2xl font-bold tracking-[0.3em] text-on-surface">
          {phase === "glitch" ? "ACCESS GRANTED" : "SCANNING EVIDENCE"}
        </div>

        <div className="mx-auto mt-8 h-[2px] w-full max-w-xs overflow-hidden bg-outline-variant/40">
          <div
            className="h-full bg-gradient-to-r from-crimson via-primary to-crimson"
            style={{ width: `${progress}%`, transition: "width 60ms linear" }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-on-surface-variant">
          <span>DNA · PRINT · SPATTER</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

      {/* blood drip */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-[2px] -translate-x-1/2 bg-crimson"
        style={{ animation: "blood-drip 2.6s ease-in infinite" }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Cursor                                                              */
/* ------------------------------------------------------------------ */

function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 md:block"
      style={{ x: sx, y: sy }}
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,oklch(0.42_0.19_27/0.28)_0%,transparent_60%)]" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Floating particles                                                  */
/* ------------------------------------------------------------------ */

function Particles({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((i) => {
        const size = 1 + Math.random() * 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = 8 + Math.random() * 12;
        const delay = Math.random() * -20;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: `float-particle ${dur}s ease-in-out ${delay}s infinite`,
              boxShadow: "0 0 6px currentColor",
            }}
          />
        );
      })}
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

const NAV = [
  { href: "#story", label: "Story" },
  { href: "#trailer", label: "Trailer" },
  { href: "#cast", label: "Cast" },
  { href: "#seasons", label: "Seasons" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
];

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-500 md:px-16 ${
        scrolled
          ? "bg-background/70 py-3 backdrop-blur-xl border-b border-outline-variant/40"
          : "py-6"
      }`}
    >
      <a href="#top" className="font-display text-2xl font-extrabold tracking-tighter text-primary text-glow md:text-3xl">
        DEXTER
      </a>
      <div className="hidden items-center gap-8 md:flex">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant transition-colors hover:text-primary"
          >
            {n.label}
          </a>
        ))}
      </div>
      <a
        href="#trailer"
        className="group relative overflow-hidden bg-crimson px-6 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white transition-all hover:bg-primary-glow"
      >
        <span className="relative z-10">Watch Now</span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary-glow to-crimson transition-transform duration-500 group-hover:translate-x-0" />
      </a>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(smx, (v) => v * -20);
  const bgY = useTransform(smy, (v) => v * -20);
  const titleRotY = useTransform(smx, (v) => v * 6);
  const titleRotX = useTransform(smy, (v) => v * -4);
  const glowX = useTransform(smx, (v) => `${50 + v * 20}%`);
  const glowY = useTransform(smy, (v) => `${70 + v * 15}%`);
  const glowBg = useTransform(
    [glowX, glowY] as const,
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, oklch(0.42 0.19 27 / 0.5), transparent 55%)`
  );

  // live "vitals" ticker
  const [ts, setTs] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTs(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // typing effect for tagline
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const tagline = "Dark · Calculated · Unforgettable";
  
  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < tagline.length) {
        setTypedText(tagline.slice(0, i + 1));
        i++;
        setTimeout(type, 50 + Math.random() * 50);
      }
    };
    const timer = setTimeout(type, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursor);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // magnetic button effect
  const magneticBtn = useRef<HTMLAnchorElement>(null);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const magneticSpringX = useSpring(magneticX, { stiffness: 150, damping: 15 });
  const magneticSpringY = useSpring(magneticY, { stiffness: 150, damping: 15 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magneticBtn.current) return;
    const rect = magneticBtn.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magneticX.set(e.clientX - centerX);
    magneticY.set(e.clientY - centerY);
  };

  const handleMagneticLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen w-full overflow-hidden [perspective:1400px]"
    >
      {/* Background image with slow zoom + mouse parallax */}
      <motion.div className="absolute inset-0" style={{ scale, x: bgX, y: bgY }}>
        <img
          src={miamiNight}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full scale-110 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <motion.div className="absolute inset-0" style={{ background: glowBg }} />
      </motion.div>

      {/* Diagonal grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.78 0.13 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.13 25) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Particles count={50} />

      {/* Side rail — left */}
      <div className="pointer-events-none absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60 md:flex">
        <div className="rotate-180 [writing-mode:vertical-rl]">MIAMI · METRO · HOMICIDE</div>
      </div>
      {/* Side rail — right (live vitals) */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70 md:flex">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
          <span>REC · LIVE</span>
        </div>
        <div>UTC {ts}</div>
        <div>25.7617° N</div>
        <div>80.1918° W</div>
      </div>

      {/* fog layer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        {/* subtle glow effect behind content */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10 bg-gradient-radial from-primary/10 via-transparent to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <SectionTag>Case File #0821 · Miami Metro</SectionTag>
        </motion.div>

        <motion.h1
          style={{ rotateX: titleRotX, rotateY: titleRotY, transformStyle: "preserve-3d" }}
          className="mt-6 font-display text-[20vw] font-black leading-[0.85] tracking-[-0.04em] text-primary text-glow will-change-transform sm:text-[18vw] md:text-[13rem] lg:text-[15rem]"
        >
          {"DEXTER".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.06, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, color: "oklch(0.65 0.20 25)", scale: 1.05 }}
              className="inline-block cursor-default"
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-4 font-display text-xs font-semibold uppercase text-on-surface sm:text-sm md:text-xl"
        >
          {typedText}
          <motion.span
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className="inline-block w-0.5 h-current bg-primary ml-1"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.3em] text-on-surface-variant sm:text-[10px]"
        >
          {["Crime Drama", "2006 – 2021", "8 Seasons + New Blood", "55 min", "TV-MA"].map((t, i, arr) => (
            <motion.span
              key={t}
              whileHover={{ color: "oklch(0.78 0.13 25)", scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 cursor-default"
            >
              <span>{t}</span>
              {i < arr.length - 1 && <span className="h-1 w-1 rounded-full bg-primary/40" />}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <motion.a
            ref={magneticBtn}
            href="#trailer"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            style={{ x: magneticSpringX, y: magneticSpringY }}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-crimson px-10 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-all hover:bg-primary-glow crimson-glow sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary-glow via-primary to-crimson transition-transform duration-500 group-hover:translate-x-0" />
            <motion.svg 
              width="12" 
              height="14" 
              viewBox="0 0 12 14" 
              fill="currentColor" 
              className="relative z-10"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <polygon points="0,0 12,7 0,14" />
            </motion.svg>
            <span className="relative z-10">Watch Trailer</span>
          </motion.a>
          <motion.a
            href="#cast"
            whileHover={{ scale: 1.05, borderColor: "oklch(0.78 0.13 25 / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel w-full px-10 py-4 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-on-surface transition-all hover:border-primary/40 hover:text-primary sm:w-auto"
          >
            Explore Characters
          </motion.a>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.2, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/70 transition-colors hover:text-primary"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.a>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section id="story" className="relative grain px-6 py-32 md:px-16 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <SectionTag>Profile #01 · Dexter Morgan</SectionTag>
          <h2 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-on-surface md:text-7xl">
            A monster
            <br />
            with a <span className="text-primary text-glow">code.</span>
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-on-surface-variant">
            By day, he's a blood-spatter analyst for Miami Metro. By night, he's a serial
            killer who hunts only the guilty. Governed by Harry's Code — a rigid set of
            rules designed to keep the Dark Passenger contained and directed toward
            justice — Dexter is the perfect predator hiding in plain sight.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { k: "Blood Type", v: "AB−" },
              { k: "Kill Count", v: "Classified" },
              { k: "Weapon", v: "Blade + Plastic" },
              { k: "Coordinates", v: "25.7617° N" },
            ].map((s) => (
              <div key={s.k} className="glass-panel relative overflow-hidden p-6">
                <div className="scanline" />
                <MonoLabel>{s.k}</MonoLabel>
                <p className="mt-2 font-display text-2xl font-bold text-on-surface">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-crimson/20 blur-3xl" />
          <div className="glass-panel relative aspect-[4/5] overflow-hidden p-2">
            <img src={heroPortrait} alt="Silhouetted figure under crimson neon" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute right-6 top-6 text-right font-mono text-[10px] uppercase leading-tight text-primary">
              <div>CASE: 0821-X</div>
              <div>LOC: MIAMI, FL</div>
              <div>STATUS: ACTIVE</div>
            </div>
            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase leading-tight text-primary/80">
              <div>DEXTER MORGAN</div>
              <div>BLOOD-SPATTER ANALYST</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trailer                                                             */
/* ------------------------------------------------------------------ */

function Trailer() {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="trailer" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionTag>Evidence Reel · Theater Mode</SectionTag>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
              The Official Trailer
            </h2>
          </div>
          <p className="max-w-md text-on-surface-variant">
            Ambient blur. Cinematic controls. Press play — the room dims around you.
          </p>
        </div>

        <div className="relative">
          {/* ambient blur behind */}
          <div className="absolute -inset-8 bg-crimson/25 blur-[80px]" />

          <div className="glass-panel relative aspect-video overflow-hidden">
            <AnimatePresence mode="wait">
              {!playing ? (
                <motion.button
                  key="poster"
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  exit={{ opacity: 0 }}
                >
                  <img src={bloodSlide} alt="Blood-spatter analysis" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <motion.div
                      className="flex h-24 w-24 items-center justify-center border border-primary/60 bg-background/60 backdrop-blur"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg width="24" height="28" viewBox="0 0 12 14" fill="currentColor" className="text-primary">
                        <polygon points="0,0 12,7 0,14" />
                      </svg>
                    </motion.div>
                    <div className="text-center">
                      <MonoLabel>Duration · 02:14</MonoLabel>
                      <div className="mt-2 font-display text-xl font-bold uppercase tracking-widest text-on-surface">
                        Play Official Trailer
                      </div>
                    </div>
                  </div>
                </motion.button>
              ) : (
                <motion.iframe
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src="https://www.youtube-nocookie.com/embed/Bw8ZdQpVtdU?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                  title="Dexter: Original Sin — Official Trailer"
                  className="absolute inset-0 h-full w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}

            </AnimatePresence>
            <div className="scanline" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">
            <span>SHOWTIME · Original Series</span>
            <span>4K · Dolby Atmos</span>
            <span>Rated TV-MA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cast                                                                */
/* ------------------------------------------------------------------ */

function CastCard({ actor, role, bio, code, image, index, demoReel, onPlayReel }: (typeof CAST)[number] & { index: number; onPlayReel?: (actor: string, videoId: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 8 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group glass-panel relative overflow-hidden border-white/5 transition-all duration-500 hover:border-primary/50 hover:crimson-glow"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-low">
        {/* actual photo */}
        <img
          src={image}
          alt={actor}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
        />
        {/* dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* forensic overlay */}
        <div className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/80">
          {code}
        </div>
        <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-primary/80">
          #{String(index + 1).padStart(2, "0")}
        </div>
        <div className="scanline" />

        {/* Hover Play Button Overlay */}
        {demoReel && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onPlayReel?.(actor, demoReel);
              }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-background/90 text-primary transition-colors cursor-pointer hover:bg-primary hover:text-white crimson-glow"
              title={`Play ${actor} Demo Reel`}
            >
              <svg width="16" height="18" viewBox="0 0 12 14" fill="currentColor" className="ml-0.5">
                <polygon points="0,0 12,7 0,14" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>

      <div className="relative p-6">
        <MonoLabel>{actor}</MonoLabel>
        <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-on-surface">
          {role}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          {bio}
        </p>
        {demoReel && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayReel?.(actor, demoReel);
            }}
            className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary hover:text-white transition-all border border-primary/30 hover:border-primary/80 bg-primary/5 hover:bg-primary/20 px-3 py-1.5 rounded cursor-pointer group/btn"
          >
            <svg 
              width="8" 
              height="10" 
              viewBox="0 0 12 14" 
              fill="currentColor"
              className="group-hover/btn:translate-x-[1px] transition-transform"
            >
              <polygon points="0,0 12,7 0,14" />
            </svg>
            Play Demo Reel
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Cast() {
  const [activeReel, setActiveReel] = useState<{ actor: string; videoId: string } | null>(null);

  return (
    <section id="cast" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionTag>Core Suspects</SectionTag>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
              The people around
              <br />
              the <span className="text-primary text-glow">predator.</span>
            </h2>
          </div>
          <p className="max-w-sm text-on-surface-variant">
            Eight lives orbiting the same lie. Hover a card to open the file.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAST.map((c, i) => (
            <CastCard 
              key={c.actor} 
              {...c} 
              index={i} 
              onPlayReel={(actor, videoId) => setActiveReel({ actor, videoId })} 
            />
          ))}
        </div>
      </div>

      {/* Cinematic Demo Reel Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-panel relative w-full max-w-4xl overflow-hidden bg-background border-primary/30 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* modal header */}
              <div className="flex items-center justify-between border-b border-outline-variant p-4 font-mono">
                <div className="flex items-center gap-2 text-primary">
                  <span className="h-2 w-2 bg-primary crimson-glow animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.25em]">Evidence Reel // {activeReel.actor}</span>
                </div>
                <button
                  onClick={() => setActiveReel(null)}
                  className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest cursor-pointer font-bold"
                >
                  [ Close ]
                </button>
              </div>

              {/* video container */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeReel.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={`${activeReel.actor} Demo Reel`}
                  className="absolute inset-0 h-full w-full border-0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
                <div className="scanline pointer-events-none" />
              </div>

              {/* forensic case file footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 font-mono text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/80 bg-surface-low/50">
                <span>FILE REF: DEXTER-REEL-{activeReel.actor.replace(/\s+/g, "-").toUpperCase()}</span>
                <span>SECURE HOST: YOUTUBE-NO-COOKIE</span>
                <span>STATUS: CLASSIFIED EVIDENCE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seasons                                                             */
/* ------------------------------------------------------------------ */

function Seasons() {
  const [open, setOpen] = useState(0);
  return (
    <section id="seasons" className="relative bg-surface-low px-6 py-32 md:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionTag>The Blood Trail</SectionTag>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
          Chronology of the code.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          {/* Rail */}
          <div className="space-y-2">
            {SEASONS.map((s, i) => (
              <button
                key={s.n}
                onClick={() => setOpen(i)}
                className={`group relative flex w-full items-center gap-4 border-l-2 p-4 text-left transition-all ${
                  open === i
                    ? "border-primary bg-surface-high/50"
                    : "border-outline-variant/40 hover:border-primary/60 hover:bg-surface-high/30"
                }`}
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.25em] ${
                    open === i ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {s.n}
                </span>
                <div className="flex-1">
                  <div className="font-display text-sm font-bold uppercase tracking-wide text-on-surface">
                    {s.title}
                  </div>
                  <div className="font-mono text-[9px] text-on-surface-variant">
                    {s.year} · {s.episodes} EP
                  </div>
                </div>
                {open === i && <span className="h-2 w-2 bg-primary crimson-glow" />}
              </button>
            ))}
          </div>

          {/* Detail */}
          <motion.div
            key={open}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel relative overflow-hidden p-10"
          >
            <div className="scanline" />
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              <span>{SEASONS[open].n}</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>{SEASONS[open].year}</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>{SEASONS[open].episodes} Episodes</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-extrabold uppercase text-on-surface md:text-5xl">
              {SEASONS[open].title}
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {SEASONS[open].summary}
            </p>
            <div className="mt-8">
              <MonoLabel>Notable Threads</MonoLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {SEASONS[open].highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-outline-variant px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Relationship Map                                                    */
/* ------------------------------------------------------------------ */

const NODES = [
  { id: "dex", label: "Dexter", role: "Subject", x: 50, y: 50, main: true },
  { id: "deb", label: "Debra", role: "Sister · Detective", x: 20, y: 22 },
  { id: "harry", label: "Harry", role: "Mentor · Ghost", x: 82, y: 22 },
  { id: "rita", label: "Rita", role: "Cover · Anchor", x: 15, y: 78 },
  { id: "trinity", label: "Trinity", role: "Adversary", x: 85, y: 78 },
  { id: "metro", label: "Miami Metro", role: "Employer", x: 50, y: 90 },
];

function RelationshipMap() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionTag>Network Analysis</SectionTag>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Network of lies.
          </h2>
        </div>

        <div className="glass-panel relative mt-16 aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,oklch(0.42_0.19_27/0.6)_0%,transparent_60%)]" />
          {/* radar rings */}
          {[1, 2, 3, 4].map((r) => (
            <div
              key={r}
              className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
              style={{ width: `${r * 22}%` }}
            />
          ))}

          <svg className="absolute inset-0 h-full w-full">
            {NODES.filter((n) => !n.main).map((n) => (
              <line
                key={n.id}
                x1="50%"
                y1="50%"
                x2={`${n.x}%`}
                y2={`${n.y}%`}
                stroke={hover === n.id ? "oklch(0.78 0.13 25)" : "oklch(0.78 0.13 25 / 0.25)"}
                strokeWidth="1"
                strokeDasharray="4 4"
                style={{ transition: "stroke 0.3s" }}
              />
            ))}
          </svg>

          {NODES.map((n) => (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={`flex flex-col items-center justify-center rounded-full text-center transition-all ${
                  n.main
                    ? "h-32 w-32 border-2 border-primary bg-background crimson-glow"
                    : "h-24 w-24 glass-panel border border-outline-variant hover:border-primary"
                }`}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                  {n.role.split(" · ")[0]}
                </span>
                <span className="mt-1 font-display text-sm font-bold uppercase text-on-surface">
                  {n.label}
                </span>
              </div>
              {hover === n.id && !n.main && (
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border border-primary/40 bg-background/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-primary backdrop-blur">
                  {n.role}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ratings                                                             */
/* ------------------------------------------------------------------ */

function RatingRing({ label, value, max, unit }: (typeof STATS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = useCountUp(value, inView);
  const pct = value / max;
  const C = 2 * Math.PI * 70;
  const offset = C * (1 - (inView ? pct : 0));
  return (
    <div ref={ref} className="flex flex-col items-center gap-6 text-center">
      <div className="relative h-44 w-44">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" stroke="oklch(0.30 0.03 25)" strokeWidth="4" fill="none" />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="oklch(0.42 0.19 27)"
            strokeWidth="4"
            strokeLinecap="square"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)", filter: "drop-shadow(0 0 12px oklch(0.42 0.19 27 / 0.6))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-extrabold text-on-surface">
            {max === 10 ? n.toFixed(1) : Math.round(n)}
            {unit}
          </span>
        </div>
      </div>
      <div>
        <div className="font-display text-lg font-bold text-on-surface">{label}</div>
        <MonoLabel className="mt-1 block">Verified rating</MonoLabel>
      </div>
    </div>
  );
}

function Ratings() {
  return (
    <section className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <SectionTag>Verdict Dashboard</SectionTag>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Measured in <span className="text-primary text-glow">blood</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {STATS.map((s) => (
            <RatingRing key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

const GALLERY = [
  { src: gal1, w: 3, h: 4, label: "Evidence · 01" },
  { src: gal2, w: 4, h: 3, label: "Kill Room · 02" },
  { src: bloodSlide, w: 16, h: 9, label: "Slide Analysis · 03" },
  { src: gal4, w: 3, h: 4, label: "Slide Case · 04" },
  { src: gal3, w: 1, h: 1, label: "Bay Harbor · 05" },
  { src: miamiNight, w: 16, h: 9, label: "Miami Night · 06" },
];

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative bg-surface-low px-6 py-32 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionTag>Evidence Archive</SectionTag>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
              The visual case file.
            </h2>
          </div>
          <p className="max-w-sm text-on-surface-variant">
            A collection of frames, artifacts, and forensic imagery. Click to enlarge.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(g.src)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative block w-full overflow-hidden glass-panel"
              style={{ aspectRatio: `${g.w}/${g.h}` }}
            >
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                {g.label}
              </div>
              <div className="scanline opacity-0 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 border border-outline-variant px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:border-primary"
            >
              Close ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews carousel                                                    */
/* ------------------------------------------------------------------ */

function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % REVIEWS.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="reviews" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <SectionTag>Critical Verdict</SectionTag>
        <div className="glass-panel relative mt-10 overflow-hidden p-12 md:p-20">
          <div className="scanline" />
          <div className="absolute left-8 top-8 font-display text-6xl leading-none text-primary/30">
            &ldquo;
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-2xl italic leading-snug text-on-surface md:text-3xl">
                {REVIEWS[i].quote}
              </p>
              <div className="mt-10 flex flex-col items-center">
                <div className="h-[1px] w-12 bg-primary" />
                <MonoLabel className="mt-4">{REVIEWS[i].source}</MonoLabel>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {REVIEWS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-[2px] transition-all ${i === k ? "w-10 bg-primary" : "w-4 bg-outline-variant"}`}
              aria-label={`Review ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Awards timeline                                                     */
/* ------------------------------------------------------------------ */

function Awards() {
  return (
    <section className="relative bg-surface-low px-6 py-32 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <SectionTag>Trophy Cabinet</SectionTag>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Honors & recognition.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`relative mb-12 flex items-center gap-6 ${
                i % 2 === 0 ? "md:justify-end md:pr-[52%]" : "md:pl-[52%]"
              }`}
            >
              <div className="glass-panel relative w-full p-6 md:w-auto md:min-w-[360px]">
                <div className="scanline" />
                <MonoLabel>{a.year}</MonoLabel>
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-on-surface">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-on-surface-variant">{a.who}</p>
              </div>
              <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary bg-background md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <SectionTag>Case Inquiries</SectionTag>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Frequently asked.
          </h2>
        </div>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <div key={f.q} className="border border-outline-variant/50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-surface-high/40"
              >
                <span className="font-display text-lg font-semibold text-on-surface">{f.q}</span>
                <span
                  className={`font-mono text-2xl text-primary transition-transform ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-on-surface-variant">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel relative overflow-hidden p-10 md:p-16">
          <div className="scanline" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 bg-crimson/30 blur-3xl" />
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <SectionTag>Classified Access</SectionTag>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                Join the case file.
              </h2>
              <p className="mt-4 text-on-surface-variant">
                Encrypted dispatches, exclusive stills, and behind-the-glass featurettes.
                Delivered to your inbox — never to your doorstep.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="agent@miamimetro.gov"
                  className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-4 font-mono text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full overflow-hidden bg-crimson px-8 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white transition-all hover:bg-primary-glow crimson-glow"
              >
                {sent ? "Access granted ✓" : "Submit clearance"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative border-t border-outline-variant bg-surface-low px-6 py-16 md:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-4xl font-extrabold tracking-tighter text-primary text-glow">DEXTER</div>
          <p className="mt-4 max-w-sm text-sm text-on-surface-variant">
            A cinematic promotional experience. Original concept design and frontend
            engineering — this fan project is unaffiliated with Showtime Networks or
            Paramount Global.
          </p>
        </div>
        <div>
          <MonoLabel>Explore</MonoLabel>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-on-surface-variant hover:text-primary">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <MonoLabel>Follow</MonoLabel>
          <ul className="mt-4 space-y-2 text-sm">
            {["Twitter / X", "Instagram", "YouTube", "Letterboxd"].map((s) => (
              <li key={s}>
                <a href="#" className="text-on-surface-variant hover:text-primary">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-outline-variant/60 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant md:flex-row">
        <div>© 2026 · Portfolio project · Not affiliated with Showtime</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Terms</a>
          <a href="#" className="hover:text-primary">Disclaimer</a>
        </div>
      </div>
      <div className="mt-8 text-center font-mono text-[9px] uppercase tracking-[0.4em] text-primary/40">
        Analytical precision required.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function DexterPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <ForensicLoader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-background font-body text-on-surface">
        <CursorGlow />
        <TopNav />
        <main>
          <Hero />
          <Story />
          <Trailer />
          <Cast />
          <Seasons />
          <RelationshipMap />
          <Ratings />
          <Gallery />
          <Reviews />
          <Awards />
          <FAQSection />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}
