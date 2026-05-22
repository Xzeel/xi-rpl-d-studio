import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
  src?: string;
}

const palette = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-red-600",
  "from-violet-500 to-purple-600",
  "from-fuchsia-500 to-pink-600",
];

export function Avatar({ name, className, src }: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const idx = name.charCodeAt(0) % palette.length;
  if (src) {
    return <img src={src} alt={name} className={cn("object-cover", className)} />;
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br font-display font-bold text-white",
        palette[idx],
        className,
      )}
    >
      {initials}
    </div>
  );
}
