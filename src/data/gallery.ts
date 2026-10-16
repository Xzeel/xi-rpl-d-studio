import sponsorMie from "@/assets/gallery/sponsor-mie.webp";
import lombaHias from "@/assets/gallery/lomba-hias.webp";
import juara2Hias from "@/assets/gallery/juara-2-hias-kelas.webp";
import peakDayAgustusan from "@/assets/gallery/peak-day-agustusan.webp";
import peakDayAgustusan2 from "@/assets/gallery/peak-day-agustusan-2.webp";
import lombaVoliSarung from "@/assets/gallery/voli-sarung.webp";
import lombaHias2 from "@/assets/gallery/lomba-hias-2.webp";
import lombaHias3 from "@/assets/gallery/lomba-hias-3.webp";

export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  category: "Kegiatan Sekolah" | "Momen Bareng" | "Prestasi";
  aspectRatio: "square" | "portrait" | "landscape";
  color: string;
}

export const gallery: GalleryItem[] = [
  { id: 1, src: sponsorMie, caption: "Sponsor Pop Mie", category: "Momen Bareng", aspectRatio: "landscape", color: "from-blue-500 to-indigo-600" },
  { id: 2, src: lombaHias, caption: "Lomba Hias Kelas Agustusan", category: "Momen Bareng", aspectRatio: "portrait", color: "from-purple-500 to-pink-600" },
  { id: 3, src: juara2Hias, caption: "Juara 2 Lomba Hias Kelas", category: "Momen Bareng", aspectRatio: "landscape", color: "from-purple-500 to-pink-600" },
  { id: 4, src: peakDayAgustusan, caption: "Peak Day Agustusan #1", category: "Momen Bareng", aspectRatio: "landscape", color: "from-purple-500 to-pink-600" },
  { id: 5, src: peakDayAgustusan2, caption: "Peak Day Agustusan #2", category: "Momen Bareng", aspectRatio: "portrait", color: "from-purple-500 to-pink-600" },
  { id: 6, src: lombaVoliSarung, caption: "Lomba Voli Sarung", category: "Kegiatan Sekolah", aspectRatio: "portrait", color: "from-purple-500 to-pink-600" },
  { id: 7, src: lombaHias2, caption: "Peak Day Agustusan #2", category: "Kegiatan Sekolah", aspectRatio: "landscape", color: "from-purple-500 to-pink-600" },
  { id: 8, src: lombaHias3, caption: "Peak Day Agustusan #2", category: "Kegiatan Sekolah", aspectRatio: "landscape", color: "from-purple-500 to-pink-600" },
];
