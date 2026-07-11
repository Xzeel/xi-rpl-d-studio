export interface Member {
  id: number;
  name: string;
  nis: string;
  gender: "L" | "P";
  igHandle: string;
  avatarUrl: string;
}

import abiWaqqashImg from '@/assets/students/abi.webp';
import miftaImg from '@/assets/students/mifta.webp';
import adindaNabilaImg from '@/assets/students/dinda.webp';
import naufalImg from '@/assets/students/naufal.webp';
import aisyahSafaImg from '@/assets/students/safa.webp';
import akbarImg from '@/assets/students/akbar.webp';
import anisaAsaputriImg from '@/assets/students/asa.webp';
import audyImg from '@/assets/students/cia.webp';
import auliaPutriImg from '@/assets/students/rani.webp';
import bintangImg from '@/assets/students/bintang.webp';
import esyaGalihImg from '@/assets/students/esya.webp';
import fadhilImg from '@/assets/students/fadhil.webp';
import galihAjengImg from '@/assets/students/ajeng.webp';
import gendisDivaImg from '@/assets/students/diva.webp';
import gendisGadisImg from '@/assets/students/gadis.webp';
import nanaImg from '@/assets/students/nana.webp';
import izzaNurImg from '@/assets/students/izza.webp';
import rainerImg from '@/assets/students/rainer.webp';
import kakaSatriaImg from '@/assets/students/kaka.webp';
import kenImg from '@/assets/students/ken.webp';
import raihanImg from '@/assets/students/raihan.webp';
import fafaImg from '@/assets/students/fafa.webp';
import irgyImg from '@/assets/students/irgy.webp';
import shulthanImg from '@/assets/students/shulthan.webp';
import navissaNaoraImg from '@/assets/students/navissa.webp';
import navisyaSalfaImg from '@/assets/students/navisya.webp';
import nesyaPutriImg from '@/assets/students/nesya.webp';
import khojiImg from '@/assets/students/rahma.webp';
import salmaDinahImg from '@/assets/students/salma.webp';
import morenoImg from '@/assets/students/moreno.webp';
import serliImg from '@/assets/students/serli.webp';
import widiImg from '@/assets/students/widi.webp';
import yesicaImg from '@/assets/students/yesica.webp';
import farisImg from '@/assets/students/faris.webp';

// TODO: replace with real data
export const members: Member[] = [
  { id: 1, name: "Abi Waqqash", nis: "01", gender: "L", igHandle: "yoiki_4b111", avatarUrl: abiWaqqashImg },
  { id: 2, name: "Achmad Miftakhul Haq", nis: "02", gender: "L", igHandle: "achmadmifta__", avatarUrl: miftaImg },
  { id: 3, name: "Adinda Nabila P.S", nis: "03", gender: "P", igHandle: "0nyndaa_", avatarUrl: adindaNabilaImg },
  { id: 4, name: "Ahnaf Naufal Prawira", nis: "04", gender: "L", igHandle: "rennnfl", avatarUrl: naufalImg },
  { id: 5, name: "Aisyah Safa Azahrah", nis: "05", gender: "P", igHandle: "aisyhsafaa__", avatarUrl: aisyahSafaImg },
  { id: 6, name: "Akbar Ramadhan Yasid", nis: "06", gender: "L", igHandle: "akbarramadhanyasid", avatarUrl: akbarImg },
  { id: 7, name: "Anisa Asaputri W.K", nis: "07", gender: "P", igHandle: "asaasax_", avatarUrl: anisaAsaputriImg },
  { id: 8, name: "Audy Valencia", nis: "08", gender: "P", igHandle: "ccciaaw_", avatarUrl: audyImg },
  { id: 9, name: "Aulia Putri Maharani", nis: "09", gender: "P", igHandle: "_rrrannzy", avatarUrl: auliaPutriImg },
  { id: 10, name: "Bintang Sholikhul Khakim", nis: "10", gender: "L", igHandle: "bintang.2.20429", avatarUrl: bintangImg },
  { id: 11, name: "Esya Galih Pratama", nis: "11", gender: "L", igHandle: "", avatarUrl: esyaGalihImg },
  { id: 12, name: "Fadhil Dwi Nugroho", nis: "12", gender: "L", igHandle: "dfadhil14", avatarUrl: fadhilImg },
  { id: 13, name: "Galih Ajeng Ayuningtyas", nis: "13", gender: "P", igHandle: "xxaj3ngqq._", avatarUrl: galihAjengImg },
  { id: 14, name: "Gendis Diva Azuhra", nis: "14", gender: "P", igHandle: "ndieessy", avatarUrl: gendisDivaImg },
  { id: 15, name: "Gendis Gadis Galuh", nis: "15", gender: "P", igHandle: "louvendyc", avatarUrl: gendisGadisImg },
  { id: 16, name: "Indhana Zulfa", nis: "16", gender: "P", igHandle: "nnaalf._", avatarUrl: nanaImg },
  { id: 17, name: "Izza Nur R.K", nis: "17", gender: "P", igHandle: "xcszaaaaaa", avatarUrl: izzaNurImg },
  { id: 18, name: "Johansyach Rainer Kusworo", nis: "18", gender: "L", igHandle: "r0scoff", avatarUrl: rainerImg },
  { id: 19, name: "Kaka Satria Pamungkas", nis: "19", gender: "L", igHandle: "_kk4kaa", avatarUrl: kakaSatriaImg },
  { id: 20, name: "Ken Abimanyu K", nis: "20", gender: "L", igHandle: "kennzs10", avatarUrl: kenImg },
  { id: 21, name: "Moch Raihan Fadillah", nis: "21", gender: "L", igHandle: "xzeelarcadia.id", avatarUrl: raihanImg },
  { id: 22, name: "Muhammad Fafa F.F", nis: "22", gender: "L", igHandle: "", avatarUrl: fafaImg },
  { id: 23, name: "Muhammad Irgy Farezi", nis: "23", gender: "L", igHandle: "giifareziii", avatarUrl: irgyImg },
  { id: 24, name: "Muhammad Shulthan A.G", nis: "24", gender: "L", igHandle: "", avatarUrl: shulthanImg },
  { id: 25, name: "Navissa Naora Nadzillin", nis: "25", gender: "P", igHandle: "navissa_naura", avatarUrl: navissaNaoraImg },
  { id: 26, name: "Navisya Salfa Saifunisa", nis: "26", gender: "P", igHandle: "napiezzz", avatarUrl: navisyaSalfaImg },
  { id: 27, name: "Nesya Putri Anggraini", nis: "27", gender: "P", igHandle: "sccnesyaaa1901", avatarUrl: nesyaPutriImg },
  { id: 28, name: "Ramadhani Hakhimah Z.K", nis: "28", gender: "P", igHandle: "_zzzrhma", avatarUrl: khojiImg },
  { id: 29, name: "Salma Dinah Herfinza", nis: "29", gender: "P", igHandle: "caciprtmrf", avatarUrl: salmaDinahImg },
  { id: 30, name: "Satria Moreno Prasetya", nis: "30", gender: "L", igHandle: "morenrenno", avatarUrl: morenoImg },
  { id: 31, name: "Serli Aprilia Maulida", nis: "31", gender: "P", igHandle: "serliaaprilia_", avatarUrl: serliImg },
  { id: 32, name: "Widi Heri Waluyo", nis: "32", gender: "L", igHandle: "widiheri_", avatarUrl: widiImg },
  { id: 33, name: "Yesica Gianita W.P", nis: "33", gender: "P", igHandle: "fluebluuuu", avatarUrl: yesicaImg },
  { id: 34, name: "Zakrianda Putra Faristo", nis: "34", gender: "L", igHandle: "zakrndp", avatarUrl: farisImg },
];
