import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, ImageIcon } from "lucide-react";
import { SectionHeading } from "./AboutSection";
import { gallery, type GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

const filters = ["Semua", "Kegiatan Sekolah", "Momen Bareng", "Prestasi"] as const;
type Filter = (typeof filters)[number];

const aspectClass: Record<GalleryItem["aspectRatio"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

function GalleryCard({ item }: { item: GalleryItem }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={cn(
        "relative mb-4 w-full cursor-pointer overflow-hidden rounded-2xl break-inside-avoid",
        aspectClass[item.aspectRatio],
      )}
    >
      {item.src ? (
        <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
      ) : (
        <div className={cn("flex h-full w-full items-center justify-center bg-gradient-to-br", item.color)}>
          <ImageIcon className="h-10 w-10 text-white/40" />
        </div>
      )}

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4"
          >
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-medium text-white">{item.caption}</p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur"
                aria-label="Like"
              >
                <Heart className="h-4 w-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function GallerySection() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const items = gallery.filter((g) => filter === "Semua" || g.category === filter);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Gallery" title="Moments" subtitle="Kenangan yang nggak bakal dilupain" />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                filter === f
                  ? "border-transparent bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((it) => (
            <GalleryCard key={it.id} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
