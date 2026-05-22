import { motion } from "motion/react";
import { SectionHeading } from "./AboutSection";
import { Avatar } from "@/components/Avatar";
import { InstagramButton } from "@/components/InstagramButton";
import { teacher } from "@/data/teacher";
import { Quote } from "lucide-react";

export function WaliKelasSection() {
  return (
    <section id="wali-kelas" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Wali Kelas" title="Sosok di balik XI RPL D" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass mt-12 overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 blur-2xl" />
              <Avatar
                name={teacher.name}
                src={teacher.avatarUrl || undefined}
                className="relative h-36 w-36 rounded-full border-4 border-white/10 text-3xl"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-accent">
                Wali Kelas XI RPL D
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold">{teacher.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{teacher.subject}</p>

              <div className="mt-5 flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-left">
                <Quote className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm italic text-muted-foreground">{teacher.bio}</p>
              </div>

              <div className="mt-6 flex justify-center sm:justify-start">
                <InstagramButton igHandle={teacher.igHandle} label={`@${teacher.igHandle}`} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
