import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTasks } from "@/hooks/useTasks";

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TaskCountdownSection() {
  const { data: tasks = [], isLoading } = useTasks();
  const now = useNow();
  const upcoming = tasks.filter((t) => new Date(t.due_at).getTime() > now);
  const next = upcoming[0];
  const diff = next ? Math.max(0, new Date(next.due_at).getTime() - now) : 0;
  const units = [
    { label: "Hari", value: Math.floor(diff / 86400000) },
    { label: "Jam", value: Math.floor(diff / 3600000) % 24 },
    { label: "Menit", value: Math.floor(diff / 60000) % 60 },
    { label: "Detik", value: Math.floor(diff / 1000) % 60 },
  ];

  return (
    <section className="relative px-6 pb-8">
      <div className="glass mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <span className="inline-block rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-destructive">
            Tenggat Terdekat
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            {isLoading ? "Memuat..." : next ? `Tugas ${next.subject}` : "Tidak ada tugas aktif"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{next ? next.title : "Santai dulu, belum ada tenggat."}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 rounded-full">
                <ClipboardList className="h-4 w-4" /> Lihat Semua Tugas
              </Button>
            </DialogTrigger>
            <DialogContent className="dark max-h-[85vh] overflow-y-auto bg-background text-foreground sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Tugas XI RPL D</DialogTitle>
                <DialogDescription>Semua tugas yang masih harus dikerjakan.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                {upcoming.length === 0 && <p className="text-sm text-muted-foreground">Belum ada tugas.</p>}
                {upcoming.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md bg-primary/15 px-2 py-1 text-xs font-medium text-primary">{t.subject}</span>
                      <span className="rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                        Tenggat: {format(new Date(t.due_at), "yyyy-MM-dd")}
                      </span>
                    </div>
                    <div className="mt-3 font-semibold">{t.title}</div>
                    {t.description && <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((u) => (
            <div key={u.label} className="flex w-16 flex-col items-center rounded-2xl bg-secondary py-3 sm:w-20">
              <span className="font-display text-2xl font-bold tabular-nums sm:text-3xl">{String(u.value).padStart(2, "0")}</span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
