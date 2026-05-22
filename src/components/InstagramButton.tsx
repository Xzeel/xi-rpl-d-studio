import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

interface Props {
  igHandle: string;
  variant?: "full" | "icon";
  label?: string;
  className?: string;
}

export function InstagramButton({ igHandle, variant = "full", label = "Connect", className }: Props) {
  const href = `https://instagram.com/${igHandle}`;
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
