import { motion } from "motion/react";
import { members } from "@/data/members";

interface Props {
  rotation: number;
  reduced: boolean | null;
}

const fills = ["fill-primary", "fill-brand-glow", "fill-wheel-teal", "fill-wheel-violet"];

export function StudentWheel({ rotation, reduced }: Props) {
  const step = 360 / members.length;
  const point = (angle: number, radius: number) => {
    const radians = (angle - 90) * Math.PI / 180;
    return `${180 + radius * Math.cos(radians)},${180 + radius * Math.sin(radians)}`;
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 text-foreground" aria-hidden="true">
        <svg width="28" height="34" viewBox="0 0 28 34" className="fill-current"><path d="M2 2H26L14 32Z" /></svg>
      </div>
      <motion.div
        animate={{ transform: `rotate(${rotation}deg)` }}
        transition={{ duration: reduced ? 0 : 4.2, ease: [0.23, 1, 0.32, 1] }}
        className="h-full w-full rounded-full border-4 border-border shadow-[var(--shadow-glow)]"
      >
        <svg viewBox="0 0 360 360" className="h-full w-full" role="img" aria-label={`Roda undian ${members.length} siswa, nomor sesuai daftar anggota`}>
          {members.map((member, i) => (
            <g key={member.id}>
              <path d={`M180,180 L${point(i * step - step / 2, 174)} A174,174 0 0,1 ${point(i * step + step / 2, 174)} Z`}
                className={`${fills[i % fills.length]} stroke-background/30`} strokeWidth="1" />
              <text x="180" y="42" transform={`rotate(${i * step},180,180)`}
                textAnchor="middle" className="fill-primary-foreground font-display text-[11px] font-bold">{member.nis}</text>
            </g>
          ))}
          <circle cx="180" cy="180" r="38" className="fill-background stroke-border" strokeWidth="3" />
          <text x="180" y="177" textAnchor="middle" className="fill-foreground text-[12px] font-bold">XI RPL D</text>
          <text x="180" y="193" textAnchor="middle" className="fill-muted-foreground text-[8px]">DIGIVERSE</text>
        </svg>
      </motion.div>
    </div>
  );
}