import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TaskCountdownSection } from "@/components/sections/TaskCountdownSection";
import { WaliKelasSection } from "@/components/sections/WaliKelasSection";
import { StrukturSection } from "@/components/sections/StrukturSection";
import { AnggotaSection } from "@/components/sections/AnggotaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BelovedPeopleSection } from "@/components/sections/BelovedPeopleSection";
import { GamesSection } from "@/components/sections/GamesSection";
import { Footer } from "@/components/Footer";
import ScrollVelocity from "@/components/shared/ScrollVelocity";
import { createLenis } from "@/lib/lenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XI RPL D — Digiverse" },
      { name: "description", content: "Website resmi kelas XI RPL D — keluarga digital yang ngoding bareng. Kenalan sama anggota, struktur kelas, dan moments seru kami." },
      { property: "og:title", content: "XI RPL D — Digiverse" },
      { property: "og:description", content: "Bukan sekadar kelas, tapi keluarga yang ngoding bareng." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { destroy } = createLenis();
    return destroy;
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <div className="relative -mt-8 mb-8 space-y-2 py-6">
          <ScrollVelocity
            texts={[
              "XI RPL D ✦ CODE · CREATE · CONNECT ✦ SMKN 8 MALANG ✦",
              "REKAYASA PERANGKAT LUNAK · 2026/2027 · KELUARGA NGODING ✦",
            ]}
            velocity={60}
            className="font-display text-5xl font-black italic text-white/25 md:text-7xl"
          />
        </div>
        <TaskCountdownSection />
        <AboutSection />
        <WaliKelasSection />
        <StrukturSection />
        <AnggotaSection />
        <GamesSection />
        <GallerySection />
        <BelovedPeopleSection />
      </main>
      <Footer />
    </div>
  );
}
