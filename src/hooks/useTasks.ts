import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface TaskRow {
  id: string;
  subject: string;
  title: string;
  description: string;
  due_at: string;
}

export type TaskInput = Omit<TaskRow, "id">;

const table = () => (supabase as unknown as { from: (t: string) => any }).from("tasks");

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async (): Promise<TaskRow[]> => {
      const { data, error } = await table().select("*").order("due_at");
      if (error) throw error;
      return data as TaskRow[];
    },
  });
}

export function useSaveTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TaskInput) => {
      const { error } = await table().insert(input);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tugas ditambahkan");
    },
    onError: (e: Error) => toast.error(e.message || "Gagal menyimpan"),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await table().delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tugas dihapus");
    },
    onError: (e: Error) => toast.error(e.message || "Gagal menghapus"),
  });
}
