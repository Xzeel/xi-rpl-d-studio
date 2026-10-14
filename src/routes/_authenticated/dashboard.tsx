import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteTask, useSaveTask, useTasks, useUpdateTask } from "@/hooks/useTasks";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Tugas — XI RPL D Digiverse" },
      { name: "description", content: "Kelola daftar tugas kelas XI RPL D." },
      { property: "og:title", content: "Dashboard Tugas — XI RPL D Digiverse" },
      { property: "og:description", content: "Kelola daftar tugas kelas XI RPL D." },
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
  const { data: tasks = [] } = useTasks();
  const save = useSaveTask();
  const update = useUpdateTask();
  const del = useDeleteTask();
  const [form, setForm] = useState<typeof empty | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
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
    <main className="dark mx-auto min-h-screen max-w-4xl bg-background px-6 py-12 text-foreground">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Beranda
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold">Daftar Tugas</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button className="rounded-full" onClick={() => setForm(empty)}>
              <Plus className="h-4 w-4" /> Tambah Tugas
            </Button>
          )}
          <Button variant="outline" className="rounded-full" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Keluar
          </Button>
        </div>
      </div>

      {!isLoading && !isAdmin ? (
        <div className="glass mt-10 rounded-2xl p-6 text-sm text-muted-foreground">
          Akun ini belum memiliki akses admin. Hubungi pengelola website untuk diberikan akses.
        </div>
      ) : (
        <div className="mt-10 space-y-3">
          {tasks.length === 0 && (
            <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">Belum ada tugas.</div>
          )}
          {tasks.map((t) => (
            <div key={t.id} className="glass flex items-start justify-between gap-4 rounded-2xl p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">{t.subject}</span>
                  <span className="text-xs text-destructive">Tenggat: {format(new Date(t.due_at), "yyyy-MM-dd HH:mm")}</span>
                </div>
                <div className="mt-2 font-semibold">{t.title}</div>
                {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Edit"
                  onClick={() => {
                    setEditingId(t.id);
                    setForm({
                      subject: t.subject,
                      title: t.title,
                      description: t.description,
                      due: toLocalInput(t.due_at),
                    });
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Hapus"
                  onClick={() => confirm(`Hapus tugas "${t.title}"?`) && del.mutate(t.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!form} onOpenChange={(v) => !v && setForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Tugas</DialogTitle>
          </DialogHeader>
          {form && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate(
                  { subject: form.subject, title: form.title, description: form.description, due_at: new Date(form.due).toISOString() },
                  { onSuccess: () => setForm(null) },
                );
              }}
            >
              <div className="space-y-2">
                <Label>Mata Pelajaran</Label>
                <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tenggat</Label>
                <Input type="datetime-local" required value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={save.isPending}>
                {save.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
