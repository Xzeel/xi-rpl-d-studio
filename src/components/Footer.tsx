import { Code2 } from "lucide-react";

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
        <p className="flex flex-wrap items-center justify-center gap-y-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} XI RPL D</span>
          <span aria-hidden="true" className="mx-6 select-none font-bold text-primary/70 sm:mx-10">
            •
          </span>
          <span>
            Made with <span className="text-primary">♥</span> by{" "}
            <a
              href="https://xzeelarcadia.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              XzeelArcadia
            </a>
          </span>
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
