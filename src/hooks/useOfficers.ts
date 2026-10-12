import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ketua, wakil, officers as staticOfficers, type Officer } from "@/data/officers";

export interface OfficerRow {
  id: string;
  name: string;
  role: string;
  category: Officer["category"];
  ig_handle: string;
  sort_order: number;
}

export type OfficerInput = Omit<OfficerRow, "id">;

const fallback: OfficerRow[] = [ketua, wakil, ...staticOfficers].map((o, i) => ({
  id: `static-${i}`,
  name: o.name,
  role: o.role,
  category: o.category,
  ig_handle: o.igHandle,
  sort_order: i,
}));

// The officers table is not yet in generated types, so use an untyped handle.
const table = () => (supabase as unknown as { from: (t: string) => any }).from("officers");

export function useOfficers() {
  return useQuery({
    queryKey: ["officers"],
    queryFn: async (): Promise<OfficerRow[]> => {
      const { data, error } = await table().select("*").order("sort_order");
      if (error) throw error;
      return data as OfficerRow[];
    },
    placeholderData: fallback,
  });
}

export function useSaveOfficer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: OfficerInput & { id?: string }) => {
      const q = id ? table().update(input).eq("id", id) : table().insert(input);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["officers"] });
      toast.success("Pengurus disimpan");
    },
    onError: (e: Error) => toast.error(e.message || "Gagal menyimpan"),
  });
}

export function useDeleteOfficer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await table().delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["officers"] });
      toast.success("Pengurus dihapus");
    },
    onError: (e: Error) => toast.error(e.message || "Gagal menghapus"),
  });
}
