import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Code2, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#wali-kelas", label: "Teacher" },
  { href: "#struktur", label: "Structure" },
  { href: "#anggota", label: "Members" },
  { href: "#gallery", label: "Moments" },
];

const spring = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.8 };

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.nav
        layout
        transition={spring}
        animate={{
          width: isScrolled ? "min(720px, 92vw)" : "100%",
          marginTop: isScrolled ? 16 : 0,
          borderRadius: isScrolled ? 999 : 0,
          paddingLeft: isScrolled ? 16 : 24,
          paddingRight: isScrolled ? 16 : 24,
          paddingTop: isScrolled ? 8 : 16,
          paddingBottom: isScrolled ? 8 : 16,
          borderColor: isScrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
          backgroundColor: isScrolled ? "rgba(15,23,42,0.65)" : "rgba(15,23,42,0)",
        }}
        style={{
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderWidth: 1,
          borderStyle: "solid",
        }}
        className="pointer-events-auto flex items-center justify-between"
      >
        <motion.a
          href="#home"
          layout
          transition={spring}
          className="flex items-center gap-2 font-display font-bold"
          animate={{ fontSize: isScrolled ? 15 : 18 }}
        >
          <motion.span
            layout
            transition={spring}
            animate={{ width: isScrolled ? 32 : 36, height: isScrolled ? 32 : 36 }}
            className="flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg"
          >
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </motion.span>
          <span>XI RPL D</span>
        </motion.a>

        <motion.div
          layout
          transition={spring}
          animate={{ gap: isScrolled ? 4 : 4 }}
          className="hidden items-center md:flex"
        >
          <motion.div
            layout
            transition={spring}
            animate={{ gap: isScrolled ? 0 : 4 }}
            className="flex items-center"
          >
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                layout
                transition={spring}
                animate={{
                  paddingLeft: isScrolled ? 12 : 16,
                  paddingRight: isScrolled ? 12 : 16,
                  paddingTop: isScrolled ? 6 : 8,
                  paddingBottom: isScrolled ? 6 : 8,
                  fontSize: isScrolled ? 13 : 14,
                }}
                className="rounded-full text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-1 p-3">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
