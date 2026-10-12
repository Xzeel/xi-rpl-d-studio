import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Code2, ShieldCheck } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";
import { BGMButton } from "@/components/shared/BGMButton";

const spring = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.8 };

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.nav
        layout
        transition={spring}
        animate={{
          width: isScrolled ? "min(860px, 96vw)" : "100%",
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
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
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
          <span>DIGIVERSE</span>
        </motion.a>

        <div className="flex items-center gap-2">
          <BGMButton />
          <Link
            to="/admin"
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
