import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionHeading } from "./AboutSection";
import { MemberCard } from "@/components/MemberCard";
import { members } from "@/data/members";
import { cn } from "@/lib/utils";

const filters = ["Semua", "Laki-laki", "Perempuan"] as const;
type Filter = (typeof filters)[number];

export function AnggotaSection() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Semua");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchQuery = m.name.toLowerCase().includes(query.toLowerCase());
      const matchFilter =
        filter === "Semua" ||
        (filter === "Laki-laki" && m.gender === "L") ||
        (filter === "Perempuan" && m.gender === "P");
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  return (
    <section id="anggota" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4">
          <SectionHeading eyebrow="Members" title="Anggota Kelas" />
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground">
            {members.length} siswa total
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama..."
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  filter === f
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">Nggak ada yang cocok 😢</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
