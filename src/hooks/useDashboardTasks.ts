import { useEffect, useMemo, useState } from "react";
import type { TaskRow } from "@/hooks/useTasks";

export type TaskFilter = "all" | "active" | "finished";

export function useDashboardTasks(tasks: TaskRow[]) {
  const [now, setNow] = useState(Date.now);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const active = useMemo(() => tasks.filter((task) => Date.parse(task.due_at) > now), [tasks, now]);
  const finished = useMemo(() => tasks.filter((task) => Date.parse(task.due_at) <= now), [tasks, now]);
  const filtered = useMemo(() => {
    const source = filter === "active" ? active : filter === "finished" ? finished : tasks;
    const term = search.trim().toLocaleLowerCase("id");
    return source.filter((task) => `${task.subject} ${task.title} ${task.description}`.toLocaleLowerCase("id").includes(term));
  }, [tasks, active, finished, filter, search]);

  return { now, active, finished, filtered, filter, setFilter, search, setSearch };
}