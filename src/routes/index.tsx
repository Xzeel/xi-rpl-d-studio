import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WaliKelasSection } from "@/components/sections/WaliKelasSection";
import { StrukturSection } from "@/components/sections/StrukturSection";
import { AnggotaSection } from "@/components/sections/AnggotaSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XI RPL D — Rekayasa Perangkat Lunak" },
      { name: "description", content: "Website resmi kelas XI RPL D — keluarga digital yang ngoding bareng. Kenalan sama anggota, struktur kelas, dan moments seru kami." },
      { property: "og:title", content: "XI RPL D — Rekayasa Perangkat Lunak" },
      { property: "og:description", content: "Bukan sekadar kelas, tapi keluarga yang ngoding bareng." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WaliKelasSection />
        <StrukturSection />
        <AnggotaSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
