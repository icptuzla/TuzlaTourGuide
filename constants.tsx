import { Language, TranslationSet, Location, LocationData } from "./types";
import en from './locales/en.json';
import bs from './locales/bs.json';
import de from './locales/de.json';
import tr from './locales/tr.json';


export const TUZLA_CENTER: [number, number] = [44.5388, 18.6750];

const LOCATIONS_RAW: Location[] = [
  {
    id: '1',
    name: {
      en: 'Pannonian Lakes',
      bs: 'Panonska jezera',
      de: 'Panonische Seen',
      tr: 'Pannonian Gölleri',
    },
    description: {
      en: 'The only salt lakes in Europe located in the city center. A unique complex of three lakes with medicinal properties.',
      bs: 'Jedina slana jezera u Evropi u centru grada. Jedinstven kompleks tri jezera sa ljekovitim svojstvima.',
      de: 'Die einzigen Salzseen in Europa direkt im Stadtzentrum. Einzigartiger Komplex aus drei Seen mit heilender Wirkung.',
      tr: 'Şehir merkezinde bulunan Avrupa\'nın tek tuz gölleri. Tıbbi özelliklere sahip üç gölden oluşan eşsiz bir kompleks.',
    },
    image: '/assets/Gallery/Pannonica-ljeto.webp',
    coordinates: [44.5385, 18.6767],
    category: 'nature',
    qrCode: 'Pannonian Lakes',
    discount: '10%',
  },
  {
    id: '2',
    name: {
      en: 'Old Town (Carsija)',
      bs: 'Stari grad (Carsija)',
      de: 'Altstadt (Carsija)',
      tr: 'Eski Şehir (Çarşı)',
    },
    description: {
      en: 'The historic heart of Tuzla with Ottoman architecture, cafes, and Freedom Square.',
      bs: 'Historijsko srce Tuzle sa otomanskom arhitekturom, kaficima i Trgom slobode.',
      de: 'Das historische Herz von Tuzla mit osmanischer Architektur, Cafes und dem Freiheitsplatz.',
      tr: 'Osmanlı mimarisi, kafeler ve Özgürlük Meydanı ile Tuzla\'nın tarihi kalbi.',
    },
    image: '/assets/Gallery/Square.webp',
    coordinates: [44.5391, 18.6750],
    category: 'culture',
    qrCode: 'Old Town',
    discount: '10%',
  },
  {
    id: '3',
    name: {
      en: 'Salt Square',
      bs: 'Trg soli',
      de: 'Salzplatz',
      tr: 'Tuz Meydanı',
    },
    description: {
      en: 'A square celebrating Tuzla s 2,500-year salt history with a replica salt well.',
      bs: 'Trg posvecen tuzlanskoj 2.500 godina dugoj historiji proizvodnje soli, sa replikom bunara za so.',
      de: 'Ein Platz, der Tuzlas 2.500-jahrige Geschichte der Salzgewinnung feiert, inklusive einer Replik eines Salzbrunnens.',
      tr: 'Tuzla\'nın 2.500 yıllık tuz tarihini bir tuz kuyusu kopyasıyla kutlayan bir meydan.',
    },
    image: '/assets/Gallery/SaltSquare.webp',
    coordinates: [44.5388, 18.6732],
    category: 'culture',
    qrCode: 'Salt Square',
    discount: 5,
  },
  {
    id: '4',
    name: {
      en: 'Ilincica Hill',
      bs: 'Brdo Ilincica',
      de: 'Ilincica Hugel',
      tr: 'İlinçica Tepesi',
    },
    description: {
      en: 'A popular recreational area offering a panoramic view of the city, perfect for hiking and picnics.',
      bs: 'Popularno izletiste sa panoramskim pogledom na grad, savrseno za planinarenje i piknike.',
      de: 'Ein beliebtes Naherholungsgebiet mit Panoramablick uber die Stadt, perfekt zum Wandern und Picknicken.',
      tr: 'Şehrin panoramik manzarasını sunan, yürüyüş ve piknik için mükemmel popüler bir dinlenme alanı.',
    },
    image: '/assets/Gallery/Ilincica.webp',
    coordinates: [44.5300, 18.6800],
    category: 'nature',
    qrCode: 'Ilincica Hill',
    discount: 'Health 100%',
  },
  {
    id: '5',
    name: {
      en: 'Tuzlanka Mall',
      bs: 'RK Tuzlanka',
      de: 'Tuzlanka Einkaufszentrum',
      tr: 'Tuzlanka Alışveriş Merkezi',
    },
    description: {
      en: 'One of the city s main shopping destinations with a variety of international and local brands.',
      bs: 'Jedna od glavnih shopping destinacija u gradu sa raznim medjunarodnim i lokalnim brendovima.',
      de: 'Eines der wichtigsten Einkaufsziele der Stadt mit vielen internationalen und lokalen Marken.',
      tr: 'Çeşitli uluslararası ve yerel markaların bulunduğu şehrin ana alışveriş noktalarından biri.',
    },
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400',
    coordinates: [44.5381, 18.6650],
    category: 'shopping',
    qrCode: 'Tuzlanka Mall',
    discount: 10,
  },
  {
    id: 'mesa_selimovic',
    name: {
      en: 'Mesa Selimovic Statue',
      bs: 'Kip Meše Selimovića',
      de: 'Mesa-Selimovic-Statue',
      tr: 'Meşa Selimoviç Heykeli',
    },
    description: {
      en: 'Statue of the famous writer Mesa Selimovic.',
      bs: 'Kip poznatog pisca Meše Selimovica.',
      de: 'Statue des beruehmten Schriftstellers Mesa Selimovic.',
      tr: 'Ünlü yazar Meşa Selimoviç\'in heykeli.',
    },
    image: '/assets/Gallery/mesaselimovic.webp',
    coordinates: [44.5370993, 18.6781216],
    category: 'culture',
    qrCode: 'Mesa Selimovic',
    discount: 'Audio Reward',
  }
];

const BINGO_STORE_RAW = {
  name: 'Bingo Supermarket',
  address: 'Mitra Trifunovica Uce 2, Tuzla',
  rating: '100%',
  hours: {
    en: { monSat: '08:00 - 20:30', sun: 'Closed' },
    bs: { monSat: '08:00 - 20:30', sun: 'Zatvoreno' },
    de: { monSat: '08:00 - 20:30', sun: 'Geschlossen' },
    tr: { monSat: '08:00 - 20:30', sun: 'Kapalı' },
  },
  items: [
    { name: 'Fresh Fruit', price: 'Varies', image: '/assets/Gallery/Fruit.webp' },
    { name: 'Quality Meat', price: 'Varies', image: '/assets/Gallery/Meat.webp' },
    { name: 'Charcuterie', price: 'Varies', image: '/assets/Gallery/Charcuterie.webp' },
    { name: 'Vegetables & Herbs', price: 'Varies', image: '/assets/Gallery/Vegetables___Herbs.webp' },
  ],
};

const TRANSLATIONS_RAW: Record<Language, TranslationSet> = {
  en: en as TranslationSet,
  bs: bs as TranslationSet,
  de: de as TranslationSet,
  tr: tr as TranslationSet,
};


const RESTAURANTS_RAW = [
  {
    name: 'Taco Bell',
    address: 'Univerzitetska 16 (Tuzlanka Mall)',
    type: { en: 'Mexican Fast Food', bs: 'Meksicka brza hrana', de: 'Mexikanisches Fast Food', tr: 'Meksika Fast Food' },
    price: '9-18 KM',
    image: '/assets/Gallery/tacobellqr.jpeg',
  },
  {
    name: 'Pekara Hukic',
    address: 'Gradska 59, Tuzla',
    type: { en: 'Traditional Bakery & Pizza', bs: 'Tradicionalna pekara i pizza', de: 'Traditionelle Backerei & Pizza', tr: 'Geleneksel Fırın ve Pizza' },
    price: '3-17 KM',
    image: '/assets/Gallery/Food/hukic.webp',
  },
  {
    name: 'Palacinkara kod Bagija',
    address: 'Patriotske lige 10, Tuzla',
    type: { en: 'Famous Sweet & Sushi Pancakes', bs: 'Poznate slatke i sushi palacinke', de: 'Legendare suse Pfannkuchen & Pancake-Sushi', tr: 'Ünlü Tatlı ve Suşi Krepleri' },
    price: '3-9 KM',
    image: '/assets/Gallery/bagi.webp',
  },
  {
    name: 'Libero Caffe',
    address: 'Armije Republike BiH 17, Tuzla',
    type: { en: 'Vibrant Social Hub & Italian Food', bs: 'Popularni caffe i italijanska hrana', de: 'Vibranter Social Hub & italienisches Essen', tr: 'Canlı Sosyal Merkez ve İtalyan Yemekleri' },
    price: '7-15 KM',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Choco Loco',
    address: 'Solni trg / Prekinute mladosti 10, Tuzla',
    type: { en: 'Rich Cakes & Turkish Lokma', bs: 'Bogati kolaci i turske lokme', de: 'Kuchen & Lokma', tr: 'Zengin Pastalar ve Türk Lokması' },
    price: '3-7 KM',
    image: '/assets/Gallery/chocoloco.webp',
  },
  {
    name: 'Nota Bene Pizzeria',
    address: 'I inzinjerske brigade, Tuzla',
    type: { en: 'Quality Italian Pizza & Breakfast', bs: 'Kvalitetna italijanska pizza i dorucak', de: 'Italienische Pizza & Fruhstuck', tr: 'Kaliteli İtalyan Pizzası ve Kahvaltı' },
    price: '6-10 KM',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
  },
];

export const TUZLA_DINING_DATA: LocationData[] = [
  {
    name: 'Taco Bell Tuzla',
    rating: 4.3,
    user_ratings_total: 189,
    address: 'Univerzitetska 16, Tuzla',
    latitude: 44.538497,
    longitude: 18.664660,
    category: 'Fast Food',
    type: 'Dining',
    image: '/assets/Gallery/Food/taco.webp',
  },
  {
    name: 'Pekara Hukic',
    rating: 4.6,
    user_ratings_total: 410,
    address: 'ZAVNOBiH-a 7, Tuzla',
    latitude: 44.539990,
    longitude: 18.673059,
    category: 'Bakery',
    type: 'Dining',
    image: '/assets/Gallery/Food/hukic.webp',
  },
  {
    name: 'Libero Caffe',
    rating: 4.5,
    user_ratings_total: 278,
    address: 'Armije Republike Bosne i Hercegovine 17, Tuzla',
    latitude: 44.542283,
    longitude: 18.693450,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/bosna.webp',
  },
  {
    name: 'Nota Bene Pizzeria',
    rating: 4.8,
    user_ratings_total: 320,
    address: 'I inzinjerske brigade bb, Tuzla',
    latitude: 44.534160,
    longitude: 18.698330,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/envie.webp',
  },
  {
    name: 'Mozaik',
    rating: 4.7,
    user_ratings_total: 493,
    address: 'Turalibegova 2, Tuzla',
    latitude: 44.537233,
    longitude: 18.674936,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/mozaik.webp',
  },
  {
    name: 'Pizza Trkacica',
    rating: 4.9,
    user_ratings_total: 211,
    address: 'Setaliste Slana Banja, Tuzla',
    latitude: 44.525767,
    longitude: 18.696539,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/pizza.webp',
  },
  {
    name: 'Fast Food King',
    rating: 4.9,
    user_ratings_total: 257,
    address: 'GMMW+9R6 Trzni Centar, Tuzla',
    latitude: 44.53721,
    longitude: 18.67817,
    category: 'Fast Food',
    type: 'Dining',
    image: '/assets/Gallery/Food/smashbosbur.webp',
  },
  {
    name: 'Sezam Tennis',
    rating: 4.9,
    user_ratings_total: 59,
    address: 'Nesiba Malkica 20, Tuzla',
    latitude: 44.538717,
    longitude: 18.676906,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/foodprime.webp',
  },
  {
    name: 'Pizzeria La Linea',
    rating: 4.9,
    user_ratings_total: 47,
    address: 'Stupine B2, Tuzla',
    latitude: 44.531200,
    longitude: 18.688800,
    category: 'Restaurant',
    type: 'Dining',
    image: '/assets/Gallery/Food/cevapibrajlovic.webp',
  },
];

export const ALL_TUZLA_VENUES = TUZLA_DINING_DATA;

export const LOCATIONS = LOCATIONS_RAW;
export const BINGO_STORE = BINGO_STORE_RAW;
export const TRANSLATIONS: Record<Language, TranslationSet> = TRANSLATIONS_RAW;
export const RESTAURANTS = RESTAURANTS_RAW;
