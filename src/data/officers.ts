export interface Officer {
  name: string;
  role: string;
  category: "lead" | "vice" | "secretary" | "treasurer" | "section";
  igHandle: string;
}

// TODO: replace with real data
export const ketua: Officer = { name: "Adit Pratama Nugroho", role: "Ketua Kelas", category: "lead", igHandle: "adit.png" };
export const wakil: Officer = { name: "Citra Ayu Lestari", role: "Wakil Ketua", category: "vice", igHandle: "citraayuu" };

export const officers: Officer[] = [
  { name: "Elina Rahmadhani", role: "Sekretaris 1", category: "secretary", igHandle: "elinarhmdn" },
  { name: "Gita Permata Sari", role: "Sekretaris 2", category: "secretary", igHandle: "gitapermata" },
  { name: "Indah Cahyani", role: "Bendahara 1", category: "treasurer", igHandle: "indah.cy" },
  { name: "Kirana Maharani", role: "Bendahara 2", category: "treasurer", igHandle: "kiranamhr" },
  { name: "Bagas Wicaksono", role: "Sie Kebersihan", category: "section", igHandle: "bagaswcks" },
  { name: "Dimas Aryasatya", role: "Sie Keamanan", category: "section", igHandle: "dimasarya_" },
  { name: "Faisal Hidayat", role: "Sie Humas", category: "section", igHandle: "faisal.hyt" },
];
