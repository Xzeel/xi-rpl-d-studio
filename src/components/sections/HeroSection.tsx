import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const symbols = ["<", "/", ">", "{", "}", ";", "()", "[]", "=>"];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Floating code symbols */}
      {symbols.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute font-display text-4xl font-bold text-white/5 md:text-6xl"
          style={{
            top: `${(i * 11 + 10) % 80}%`,
            left: `${(i * 17 + 5) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {s}
        </motion.span>
      ))}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Tahun Ajaran 2024/2025
        </motion.div>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
          className="font-display text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="text-gradient">XI RPL D</span>
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-6 text-base font-medium text-foreground/90 sm:text-lg"
        >
          Rekayasa Perangkat Lunak — SMKN [Nama Sekolah]
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          Bukan sekadar kelas, tapi keluarga yang ngoding bareng.
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#anggota"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
          >
            Kenalan Yuk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/10"
          >
            Lihat Gallery
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
