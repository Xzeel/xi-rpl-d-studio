import { motion } from "motion/react";
import { SectionHeading } from "./AboutSection";
import { Avatar } from "@/components/Avatar";
import { InstagramButton } from "@/components/InstagramButton";
import { ketua, wakil, officers, type Officer } from "@/data/officers";
import { cn } from "@/lib/utils";

const categoryColors: Record<Officer["category"], string> = {
  lead: "bg-gradient-to-r from-primary to-accent text-primary-foreground",
  vice: "bg-accent/20 text-accent",
  secretary: "bg-emerald-500/20 text-emerald-300",
  treasurer: "bg-amber-500/20 text-amber-300",
  section: "bg-pink-500/20 text-pink-300",
};

function RoleCard({ officer, highlight = false, delay = 0 }: { officer: Officer; highlight?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass relative flex flex-col items-center rounded-2xl p-5 text-center",
        highlight && "ring-2 ring-primary/50 shadow-[var(--shadow-glow)]",
      )}
    >
      <Avatar name={officer.name} className={cn("rounded-full", highlight ? "h-20 w-20 text-xl" : "h-16 w-16")} />
      <div className="mt-3 font-display text-sm font-bold leading-tight">{officer.name}</div>
      <span className={cn("mt-2 rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide", categoryColors[officer.category])}>
        {officer.role}
      </span>
      <div className="mt-3">
        <InstagramButton igHandle={officer.igHandle} variant="icon" />
      </div>
    </motion.div>
  );
}

function Connector({ className }: { className?: string }) {
  return <div className={cn("mx-auto w-px bg-gradient-to-b from-white/20 to-transparent", className)} />;
}

export function StrukturSection() {
  return (
    <section id="struktur" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Organisasi" title="Struktur Kelas" />

        <div className="mt-16 flex flex-col items-center">
          {/* Ketua */}
          <div className="w-full max-w-xs">
            <RoleCard officer={ketua} highlight />
          </div>

          <Connector className="h-10" />

          {/* Wakil */}
          <div className="w-full max-w-xs">
            <RoleCard officer={wakil} delay={0.1} />
          </div>

          <Connector className="h-10" />

          {/* Horizontal bar */}
          <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mt-10 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {officers.map((o, i) => (
              <RoleCard key={o.name} officer={o} delay={0.05 * i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
