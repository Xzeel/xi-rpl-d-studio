export interface Officer {
  name: string;
  role: string;
  category: "lead" | "vice" | "secretary" | "treasurer" | "section";
  igHandle: string;
}

export const ketua: Officer = { name: "Fadhil Dwi Nugroho", role: "Ketua Kelas", category: "lead", igHandle: "dfadhil14" };
export const wakil: Officer = { name: "Akbar Ramadhan Yasid", role: "Wakil Ketua", category: "vice", igHandle: "akbarramadhanyasid" };

export const officers: Officer[] = [
  { name: "Adinda Nabila P.S", role: "Sekretaris 1", category: "secretary", igHandle: "0nyndaa_" },
  { name: "Navissa Naora Nadzillin", role: "Sekretaris 2", category: "secretary", igHandle: "navissa_naura" },
  { name: "Satria Moreno Prasetya", role: "Bendahara 1", category: "treasurer", igHandle: "morenrenno" },
  { name: "Navisya Salfa Saifunisa", role: "Bendahara 2", category: "treasurer", igHandle: "napiezzz" },
  { name: "Audy Valencia", role: "Sie Kebersihan 1", category: "section", igHandle: "ccciaaw_" },
  { name: "Galih Ajeng Ayuningtyas", role: "Sie Kebersihan 2", category: "section", igHandle: "xxaj3ngqq._" },
];
