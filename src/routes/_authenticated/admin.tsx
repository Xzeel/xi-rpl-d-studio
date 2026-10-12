import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteOfficer, useOfficers, useSaveOfficer, type OfficerInput, type OfficerRow } from "@/hooks/useOfficers";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — XI RPL D Digiverse" },
      { name: "description", content: "Kelola pengurus kelas XI RPL D." },
      { property: "og:title", content: "Dashboard Admin — XI RPL D Digiverse" },
      { property: "og:description", content: "Kelola pengurus kelas XI RPL D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const categories: { value: OfficerRow["category"]; label: string }[] = [
  { value: "lead", label: "Ketua" },
  { value: "vice", label: "Wakil" },
  { value: "secretary", label: "Sekretaris" },
  { value: "treasurer", label: "Bendahara" },
  { value: "section", label: "Seksi" },
];

const empty: OfficerInput = { name: "", role: "", category: "section", ig_handle: "", sort_order: 0 };

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: officers = [] } = useOfficers();
  const save = useSaveOfficer();
  const del = useDeleteOfficer();
  const [editing, setEditing] = useState<(OfficerInput & { id?: string }) | null>(null);

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data } = await (supabase as unknown as { from: (t: string) => any })
        .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
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
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Beranda
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold">Kelola Pengurus</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button className="rounded-full" onClick={() => setEditing({ ...empty, sort_order: officers.length })}>
              <Plus className="h-4 w-4" /> Tambah
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
          {officers.map((o) => (
            <div key={o.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-4">
              <div className="min-w-0">
                <div className="truncate font-semibold">{o.name}</div>
                <div className="text-xs text-muted-foreground">
                  {o.role} {o.ig_handle && `• @${o.ig_handle}`}
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setEditing(o)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Hapus"
                  onClick={() => confirm(`Hapus ${o.name}?`) && del.mutate(o.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Pengurus" : "Tambah Pengurus"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const { id, name, role, category, ig_handle, sort_order } = editing;
                save.mutate({ id, name, role, category, ig_handle, sort_order }, { onSuccess: () => setEditing(null) });
              }}
            >
              <Field label="Nama" value={editing.name} onChange={(name) => setEditing({ ...editing, name })} />
              <Field label="Jabatan" value={editing.role} onChange={(role) => setEditing({ ...editing, role })} />
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select
                  value={editing.category}
                  onValueChange={(v) => setEditing({ ...editing, category: v as OfficerRow["category"] })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Field
                label="Instagram (tanpa @)"
                required={false}
                value={editing.ig_handle}
                onChange={(ig_handle) => setEditing({ ...editing, ig_handle })}
              />
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={editing.sort_order}
                  onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                />
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

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function Field({ label, value, onChange, required = true }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input required={required} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
