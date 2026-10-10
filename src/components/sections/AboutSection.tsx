import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle2, Users, User, UserRound } from "lucide-react";
import { members } from "@/data/members";
import { InstagramButton } from "@/components/InstagramButton";

const classIgHandle = "astarplderise_";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}</span>;
}

const keunggulan = [
  "Solid satu sama lain, no toxic vibes",
  "Aktif di lomba IT dan event sekolah",
  "Skill ngoding di atas rata-rata",
  "Saling bantu ngerjain project",
  "Selalu bawa nama baik jurusan RPL",
];

export function AboutSection() {
  const total = members.length;
  const laki = members.filter((m) => m.gender === "L").length;
  const perempuan = members.filter((m) => m.gender === "P").length;

  const stats = [
    { icon: Users, label: "Total Siswa", value: total, color: "text-primary" },
    { icon: User, label: "Laki-laki", value: laki, color: "text-blue-400" },
    { icon: UserRound, label: "Perempuan", value: perempuan, color: "text-pink-400" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About Us" title="Kenalan dulu sama kami" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="glass rounded-2xl p-6"
            >
              <s.icon className={`h-6 w-6 ${s.color}`} />
              <div className="mt-4 font-display text-4xl font-bold">
                <Counter to={s.value} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Tempat tumbuh bareng, gagal bareng, dan menang bareng.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              XI RPL D bukan cuma sekumpulan siswa yang kebetulan satu kelas. Kami keluarga digital
              yang setiap hari belajar logika, ngoprek bug sampai larut, dan saling support pas
              project deadline mepet. Dari hari pertama sampai sekarang, kami percaya: belajar
              ngoding paling seru kalau dilakuin bareng-bareng.
            </p>
            <div className="mt-6">
              <InstagramButton igHandle={classIgHandle} variant="handle" />
            </div>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-3"
          >
            {keunggulan.map((k) => (
              <motion.li
                key={k}
                variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                className="glass flex items-center gap-3 rounded-xl p-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">{k}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
        <span className="h-px w-8 bg-accent" />
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
