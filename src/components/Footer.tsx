import { Code2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="border-t border-border pt-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </span>
          XI RPL DIGIVERSE
        </div>
        <div className="flex gap-3">
          {/* TODO: ganti dengan IG kelas */}
          <a
            href="https://instagram.com/astarplderise_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full ig-gradient text-white"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} XI RPL D · Made with ♥ by XzeelArcadia
        </p>
      </div>
      <div
        aria-hidden="true"
        className="mt-16 h-[8.5vw] overflow-hidden px-2 text-primary sm:mt-24 sm:px-4"
      >
        <svg
          viewBox="0 0 1000 180"
          className="block h-auto w-full overflow-visible font-display font-black"
          focusable="false"
        >
          <text
            x="0"
            y="150"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-current text-[180px] tracking-normal"
          >
            DIGIVERSE
          </text>
        </svg>
      </div>
    </footer>
  );
}
