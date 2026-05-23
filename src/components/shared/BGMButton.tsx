import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useBGM } from "@/hooks/useBGM";

interface BGMButtonProps {
  className?: string;
}

export function BGMButton({ className = "" }: BGMButtonProps) {
  // TODO: replace with actual BGM file at public/audio/bgm.mp3
  const { isPlaying, toggle } = useBGM("/audio/bgm.mp3");

  return (
    <button
      onClick={toggle}
      title={isPlaying ? "Pause background music" : "Play background music"}
      aria-label={isPlaying ? "Pause BGM" : "Play BGM"}
      className={`flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-foreground/90 transition-colors hover:bg-white/10 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.span
            key="playing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="flex h-4 items-end gap-[2px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-sm bg-accent"
                  animate={{ height: ["30%", "100%", "30%"] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
            <span className="hidden sm:inline">BGM</span>
          </motion.span>
        ) : (
          <motion.span
            key="paused"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <span className="hidden sm:inline">BGM</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default BGMButton;
// Volume2 imported for tree-shaking safety in case future use
void Volume2;
