import sponsorMie from "@/assets/gallery/sponsor-mie.webp";

export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  category: "Kegiatan Sekolah" | "Momen Bareng" | "Prestasi";
  aspectRatio: "square" | "portrait" | "landscape";
  color: string; // placeholder bg
}

export const gallery: GalleryItem[] = [
  { id: 1, src: sponsorMie, caption: "Sponsor Pop Mie", category: "Momen Bareng", aspectRatio: "landscape", color: "from-blue-500 to-indigo-600" },
  { id: 2, src: "", caption: "Ngoding bareng pas jam kosong", category: "Momen Bareng", aspectRatio: "portrait", color: "from-purple-500 to-pink-600" },
  { id: 3, src: "", caption: "Juara 2 Lomba Web Design", category: "Prestasi", aspectRatio: "square", color: "from-amber-500 to-orange-600" },
  { id: 4, src: "", caption: "Class Meeting kompak banget", category: "Momen Bareng", aspectRatio: "landscape", color: "from-emerald-500 to-teal-600" },
  { id: 5, src: "", caption: "Praktikum Lab RPL", category: "Kegiatan Sekolah", aspectRatio: "portrait", color: "from-cyan-500 to-blue-600" },
  { id: 6, src: "", caption: "Makan siang di kantin", category: "Momen Bareng", aspectRatio: "square", color: "from-rose-500 to-red-600" },
  { id: 7, src: "", caption: "Workshop Laravel dari alumni", category: "Kegiatan Sekolah", aspectRatio: "landscape", color: "from-violet-500 to-purple-600" },
  { id: 8, src: "", caption: "Best Project Showcase", category: "Prestasi", aspectRatio: "portrait", color: "from-fuchsia-500 to-pink-600" },
  { id: 9, src: "", caption: "Foto kelas full team", category: "Momen Bareng", aspectRatio: "landscape", color: "from-sky-500 to-blue-700" },
  { id: 10, src: "", caption: "Outing class ke pantai", category: "Momen Bareng", aspectRatio: "square", color: "from-orange-500 to-amber-600" },
];
