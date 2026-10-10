import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

interface Props {
  igHandle: string;
  variant?: "full" | "icon" | "handle";
  label?: string;
  className?: string;
}

export function InstagramButton({ igHandle, variant = "full", label = "Connect", className }: Props) {
  const href = `https://instagram.com/${igHandle}`;
  if (variant === "handle") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram @${igHandle}`}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 p-1.5 pr-5 text-sm font-semibold transition-colors hover:border-primary/50",
          className,
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full ig-gradient text-white">
          <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
        </span>
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">@{igHandle}</span>
      </a>
    );
  }
  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram @${igHandle}`}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full ig-gradient text-white shadow-md transition-transform hover:scale-110",
          className,
        )}
      >
        <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full ig-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] hover:shadow-xl",
        className,
      )}
    >
      <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
