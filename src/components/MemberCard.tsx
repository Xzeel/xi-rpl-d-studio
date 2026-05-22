import { motion } from "motion/react";
import { Avatar } from "@/components/Avatar";
import { InstagramButton } from "@/components/InstagramButton";
import type { Member } from "@/data/members";

export function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="glass group flex flex-col items-center rounded-2xl p-5 text-center transition-shadow hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative">
        <Avatar name={member.name} src={member.avatarUrl} className="h-24 w-24 rounded-full text-xl" />
        <span className="absolute -right-1 -top-1 rounded-full border-2 border-background bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          {member.nis}
        </span>
      </div>
      <h4 className="mt-4 font-display text-sm font-bold leading-tight">{member.name}</h4>
      <span className="mt-1.5 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
        {member.gender === "L" ? "Laki-laki" : "Perempuan"}
      </span>
      <div className="mt-4">
        <InstagramButton igHandle={member.igHandle} />
      </div>
    </motion.div>
  );
}
