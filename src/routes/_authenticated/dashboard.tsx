import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ClipboardList, LayoutDashboard, Loader2, LogOut, Pencil, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteTask, useSaveTask, useTasks, useUpdateTask } from "@/hooks/useTasks";
import { useDashboardTasks, type TaskFilter } from "@/hooks/useDashboardTasks";
import { DashboardOverview } from "@/components/shared/DashboardOverview";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — XI RPL D Digiverse" },
      { name: "description", content: "Ringkasan siswa dan tugas serta pengelolaan tugas kelas XI RPL D." },
      { property: "og:title", content: "Dashboard Admin — XI RPL D Digiverse" },
      { property: "og:description", content: "Ringkasan siswa dan tugas serta pengelolaan tugas kelas XI RPL D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const empty = { subject: "", title: "", description: "", due: "" };

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: tasks = [], isLoading: tasksLoading, isError: tasksError, refetch } = useTasks();
  const overview = useDashboardTasks(tasks);
  const save = useSaveTask();
  const update = useUpdateTask();
  const del = useDeleteTask();
  const [form, setForm] = useState<typeof empty | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: isAdmin, isLoading, isError: roleError } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (error) throw error;
      return (data?.length ?? 0) > 0;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-card px-5 py-8 lg:flex">
        <Link to="/" className="font-display text-xl font-semibold tracking-normal">DIGIVERSE<span className="text-primary">.</span></Link>
        <p className="mt-1 text-xs text-muted-foreground">XI RPL D · Admin panel</p>
        <div className="mt-12 text-[10px] font-medium uppercase text-muted-foreground">Workspace</div>
        <nav aria-label="Navigasi admin" className="mt-3 space-y-2">
          <Button asChild variant="ghost" className="w-full justify-start bg-primary/10 text-primary"><Link to="/dashboard" aria-current="page"><LayoutDashboard />Dashboard</Link></Button>
          <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground"><Link to="/"><ArrowUpRight />Lihat website</Link></Button>
        </nav>
        <div className="mt-auto border-t border-border pt-5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary"><ShieldCheck className="h-4 w-4 text-primary" /></div><div className="min-w-0"><p className="text-sm font-medium">Administrator</p><p className="truncate text-xs text-muted-foreground">{user.email}</p></div></div><Button variant="ghost" className="mt-4 w-full justify-start text-muted-foreground" onClick={signOut}><LogOut />Keluar</Button></div>
      </aside>
      <main className="min-w-0 lg:ml-60">
        <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-8">
          <div><p className="text-xs text-muted-foreground">Admin panel / Overview</p><h1 className="mt-1 text-xl font-semibold tracking-normal">Dashboard</h1></div>
          <div className="flex items-center gap-2"><Button asChild variant="outline" size="sm"><Link to="/"><ArrowLeft />Beranda</Link></Button><Button variant="ghost" size="icon" className="lg:hidden" title="Keluar" aria-label="Keluar" onClick={signOut}><LogOut /></Button><div className="hidden items-center gap-2 border-l border-border pl-4 sm:flex"><ShieldCheck className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Administrator</span></div></div>
        </header>
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-8">
          {isLoading ? <div role="status" className="flex items-center gap-2 py-12 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Memuat dashboard...</div> : roleError || !isAdmin ? <p role="alert" className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">{roleError ? "Akses admin belum dapat diperiksa. Silakan muat ulang halaman." : "Akun ini belum memiliki akses admin. Hubungi pengelola website untuk diberikan akses."}</p> : <>
            <DashboardOverview activeCount={overview.active.length} finishedCount={overview.finished.length} loading={tasksLoading} error={tasksError} now={overview.now} />
            <section aria-labelledby="task-heading" className="mt-9">
              <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 id="task-heading" className="text-lg font-semibold tracking-normal">Daftar tugas</h2><p className="mt-1 text-xs text-muted-foreground">Tugas dan tenggat kelas XI RPL D</p></div><Button onClick={() => { setEditingId(null); setForm(empty); }}><Plus />Tambah Tugas</Button></div>
              <div className="my-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                <div role="group" aria-label="Filter tugas" className="flex w-fit max-w-full gap-1 rounded-lg bg-muted p-1">
                  {([{ value: "all", label: "Semua", count: tasks.length }, { value: "active", label: "Aktif", count: overview.active.length }, { value: "finished", label: "Selesai", count: overview.finished.length }] satisfies { value: TaskFilter; label: string; count: number }[]).map((tab) => <Button key={tab.value} variant="ghost" size="sm" aria-pressed={overview.filter === tab.value} onClick={() => overview.setFilter(tab.value)} className={cn("gap-2 text-muted-foreground", overview.filter === tab.value && "bg-card text-foreground")} >{tab.label}<span className="text-[10px] tabular-nums opacity-70">{tab.count}</span></Button>)}
                </div>
                <div className="relative w-full xl:w-64"><Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input aria-label="Cari tugas" placeholder="Cari tugas atau mata pelajaran..." value={overview.search} onChange={(e) => overview.setSearch(e.target.value)} className="pl-9 text-xs" /></div>
              </div>
              {tasksLoading ? <p role="status" className="py-10 text-center text-sm text-muted-foreground">Memuat tugas...</p> : tasksError ? <div role="alert" className="py-10 text-center"><p className="text-sm text-destructive">Daftar tugas belum dapat dimuat.</p><Button variant="outline" className="mt-3" onClick={() => refetch()}>Coba lagi</Button></div> : overview.filtered.length === 0 ? <div className="flex flex-col items-center rounded-lg border border-dashed border-border py-14 text-center"><ClipboardList className="h-8 w-8 text-muted-foreground" /><h3 className="mt-4 text-sm font-medium tracking-normal">{tasks.length === 0 ? "Belum ada tugas" : "Tidak ada tugas yang cocok"}</h3><p className="mt-2 text-xs text-muted-foreground">{tasks.length === 0 ? "Tugas yang ditambahkan akan tampil di sini." : "Coba kata pencarian atau status lainnya."}</p></div> : <div className="space-y-3">{overview.filtered.map((t) => {
                const finished = Date.parse(t.due_at) <= overview.now;
                return <article key={t.id} className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 sm:p-5">
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{t.subject}</span><span className={cn("inline-flex items-center gap-1 text-xs", finished ? "text-wheel-teal" : "text-wheel-violet")}>{finished && <CheckCircle2 className="h-3 w-3" />}{finished ? "Selesai" : "Aktif"}</span></div><h3 className="mt-3 break-words text-sm font-semibold tracking-normal">{t.title}</h3>{t.description && <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">{t.description}</p>}<p className="mt-3 text-xs text-muted-foreground">Tenggat: {format(new Date(t.due_at), "dd MMM yyyy · HH:mm")}</p></div>
                  <div className="flex shrink-0 gap-1"><Button size="icon" variant="ghost" aria-label="Edit" title="Edit tugas" onClick={() => { setEditingId(t.id); setForm({ subject: t.subject, title: t.title, description: t.description, due: toLocalInput(t.due_at) }); }}><Pencil /></Button><Button size="icon" variant="ghost" aria-label="Hapus" title="Hapus tugas" disabled={del.isPending} onClick={() => confirm(`Hapus tugas "${t.title}"?`) && del.mutate(t.id)}><Trash2 className="text-destructive" /></Button></div>
                </article>;
              })}</div>}
            </section>
          </>}
          <footer className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">Digiverse · XI RPL D</footer>
        </div>
      </main>

      <Dialog
        open={!!form}
        onOpenChange={(v) => {
          if (!v) {
            setForm(null);
            setEditingId(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Tugas" : "Tambah Tugas"}</DialogTitle>
            <DialogDescription>Detail tugas kelas dan tenggat pengumpulan.</DialogDescription>
          </DialogHeader>
          {form && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const payload = {
                  subject: form.subject,
                  title: form.title,
                  description: form.description,
                  due_at: new Date(form.due).toISOString(),
                };
                const onSuccess = () => {
                  setForm(null);
                  setEditingId(null);
                };
                if (editingId) update.mutate({ ...payload, id: editingId }, { onSuccess });
                else save.mutate(payload, { onSuccess });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="task-subject">Mata Pelajaran</Label>
                <Input id="task-subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-title">Judul</Label>
                <Input id="task-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Deskripsi</Label>
                <Textarea id="task-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-due">Tenggat</Label>
                <Input id="task-due" type="datetime-local" required value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
              </div>
               <Button type="submit" className="w-full" disabled={save.isPending || update.isPending}>
                {save.isPending || update.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
