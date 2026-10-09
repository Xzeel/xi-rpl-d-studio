import { CircleDot, Shuffle, Sparkles, Trophy, Pause, Play, Users } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentWheel } from "@/components/shared/StudentWheel";
import { SectionHeading } from "./AboutSection";
import { useStudentDraw } from "@/hooks/useStudentDraw";
import { cn } from "@/lib/utils";

export function GamesSection() {
  const game = useStudentDraw();
  return (
    <section id="games" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Let's Play" title="Siapa yang beruntung?" />
        <p className="mt-4 text-center text-sm text-muted-foreground">Pilihan acak sesuai dengan data yang tersedia</p>
        <div className="glass mt-10 overflow-hidden rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 sm:px-8">
            <Tabs value={game.mode} onValueChange={game.changeMode}>
              <TabsList className="h-auto flex-wrap gap-1">
                <TabsTrigger value="wheel" disabled={game.busy} className="gap-2 !transition-none"><CircleDot className="h-4 w-4" />Spin Wheel</TabsTrigger>
                <TabsTrigger value="pick" disabled={game.busy} className="gap-2 !transition-none"><Shuffle className="h-4 w-4" />Pick Acak Siswa</TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-4 w-4" />{game.total} siswa</span>
          </div>
          <div className="grid lg:grid-cols-2" aria-busy={game.busy}>
            <div className="flex min-w-0 flex-col items-center justify-center gap-7 p-6 sm:p-10" role="tabpanel" aria-label={game.mode === "wheel" ? "Spin Wheel" : "Pick Acak Siswa"}>
              {game.mode === "wheel" ? <StudentWheel rotation={game.rotation} reduced={game.reduced} /> : (
                <div className="flex aspect-square w-full max-w-[360px] flex-col items-center justify-center gap-5 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-5 text-center">
                  {game.preview ? <Avatar name={game.preview.name} src={game.preview.avatarUrl} className="h-36 w-28 rounded-2xl" /> : <Shuffle className="h-20 w-20 text-primary" />}
                  <span className="min-h-12 text-xl font-bold">{game.preview?.name ?? "Pick Acak Siswa"}</span>
                </div>
              )}
              <Button size="lg" disabled={game.busy || game.total === 0} onClick={game.draw} className="h-12 w-full max-w-[360px] rounded-full bg-gradient-to-r from-primary to-accent font-bold shadow-[var(--shadow-glow)]">
                <Shuffle className={cn(game.busy && !game.reduced && "animate-spin")} />{game.busy ? "Mengacak..." : "Acak Sekarang!"}
              </Button>
            </div>
            <div className="relative flex min-h-[390px] min-w-0 flex-col items-center justify-center border-t border-border bg-surface/40 p-6 text-center lg:border-l lg:border-t-0 sm:p-10">
              <div role="status" aria-live="polite" aria-atomic="true" className="w-full">
                {game.winner ? (
                  <div className="flex flex-col items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-semibold text-brand-glow"><Trophy className="h-4 w-4" />Siswa Terpilih!</span>
                    <div className={cn("relative", game.celebrating && "winner-celebration")}>
                      <span className="winner-halo absolute -inset-3 rounded-2xl border border-primary/60" aria-hidden="true" />
                      <Avatar name={game.winner.name} src={game.winner.avatarUrl} className="relative h-44 w-36 rounded-2xl border-2 border-primary/40" />
                    </div>
                    <div className="mt-3 w-full">
                      <h3 className={cn("break-words font-display text-2xl font-bold sm:text-3xl", game.celebrating && "winner-name")}>{game.winner.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">No. {game.winner.nis} · XI RPL D</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Sparkles className="h-12 w-12 text-primary/60" />
                    <h3 className="text-xl font-bold">{game.busy ? "Siapa yang terpilih?" : "Giliran siapa, ya?"}</h3>
                    <p className="text-sm text-muted-foreground">{game.busy ? "Menunggu hasil undian…" : "XI RPL D · Semua siswa punya peluang yang sama"}</p>
                  </div>
                )}
              </div>
              {game.winner && <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-muted-foreground" onClick={() => game.setCelebrating(!game.celebrating)} aria-label={game.celebrating ? "Jeda animasi" : "Lanjutkan animasi"} title={game.celebrating ? "Jeda animasi" : "Lanjutkan animasi"}>{game.celebrating ? <Pause /> : <Play />}</Button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}