import sponsorMie from "@/assets/gallery/sponsor-mie.webp";
import lombaHias from "@/assets/gallery/lomba-hias.webp";

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
];
