export interface Member {
  id: number;
  name: string;
  nis: string;
  gender: "L" | "P";
  igHandle: string;
  avatarUrl?: string;
}

// TODO: replace with real data
export const members: Member[] = [
  { id: 1, name: "Adit Pratama Nugroho", nis: "2401", gender: "L", igHandle: "adit.png" },
  { id: 2, name: "Bagas Wicaksono", nis: "2402", gender: "L", igHandle: "bagaswcks" },
  { id: 3, name: "Citra Ayu Lestari", nis: "2403", gender: "P", igHandle: "citraayuu" },
  { id: 4, name: "Dimas Aryasatya", nis: "2404", gender: "L", igHandle: "dimasarya_" },
  { id: 5, name: "Elina Rahmadhani", nis: "2405", gender: "P", igHandle: "elinarhmdn" },
  { id: 6, name: "Faisal Hidayat", nis: "2406", gender: "L", igHandle: "faisal.hyt" },
  { id: 7, name: "Gita Permata Sari", nis: "2407", gender: "P", igHandle: "gitapermata" },
  { id: 8, name: "Hafiz Ramadhan", nis: "2408", gender: "L", igHandle: "hafizrmdn" },
  { id: 9, name: "Indah Cahyani", nis: "2409", gender: "P", igHandle: "indah.cy" },
  { id: 10, name: "Joko Susanto", nis: "2410", gender: "L", igHandle: "jokosnt" },
  { id: 11, name: "Kirana Maharani", nis: "2411", gender: "P", igHandle: "kiranamhr" },
  { id: 12, name: "Lutfi Maulana", nis: "2412", gender: "L", igHandle: "lutfi.mln" },
];
