import { CalendarDays, CheckCircle2, ClipboardList, GraduationCap, Users } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { members } from "@/data/members";

interface DashboardOverviewProps {
  activeCount: number;
  finishedCount: number;
  loading: boolean;
  error: boolean;
  now: number;
}

export function DashboardOverview({ activeCount, finishedCount, loading, error, now }: DashboardOverviewProps) {
  const stats = [
    { label: "Total siswa", value: members.length, detail: "Anggota kelas XI RPL D", icon: Users, color: "text-primary", surface: "bg-primary/10" },
    { label: "Tugas aktif", value: activeCount, detail: "Tenggat belum berlalu", icon: ClipboardList, color: "text-wheel-violet", surface: "bg-wheel-violet/10" },
    { label: "Tugas selesai", value: finishedCount, detail: "Tenggat sudah berlalu", icon: CheckCircle2, color: "text-wheel-teal", surface: "bg-wheel-teal/10" },
  ];

  return (
    <>
      <section className="relative overflow-hidden rounded-lg border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> XI RPL D · DIGIVERSE</div>
          <h2 className="font-display text-2xl font-semibold tracking-normal sm:text-3xl">Selamat datang kembali, Admin!</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Semangat untuk hari ini. Yuk, pastikan semua tugas kelas tetap tertata.</p>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-4 w-4" />{format(now, "EEEE, d MMMM yyyy", { locale: id })}</div>
        </div>
        <GraduationCap aria-hidden="true" className="absolute right-8 top-8 hidden h-32 w-32 -rotate-12 text-primary/15 xl:block" strokeWidth={1} />
      </section>
      <section aria-label="Ringkasan kelas" className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <article key={stat.label} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{stat.label}</p><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.surface}`}><stat.icon className={`h-5 w-5 ${stat.color}`} /></div></div>
            <p className="mt-3 text-3xl font-semibold tabular-nums">{index > 0 && (loading || error) ? "—" : stat.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
          </article>
        ))}
      </section>
    </>
  );
}