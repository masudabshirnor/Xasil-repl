export const SOMALIA_LOCATIONS = {
  Muqdisho: [
    "Abdiaziz",
    "Bondhere",
    "Daynile",
    "Dharkenley",
    "Hamar Jajab",
    "Hamar Weyne",
    "Hodan",
    "Howlwadaag",
    "Heliwaa",
    "Kaxda",
    "Karaan",
    "Shangaani",
    "Shibis",
    "Waberi",
    "Wadajir",
    "Warta Nabadda",
    "Yaaqshiid",
  ],

  Hargeysa: [
    "26 June",
    "Axmed Dhagax",
    "Gacan Libaax",
    "Ibraahim Koodbuur",
    "Maxamuud Haybe",
    "Maxamed Mooge",
  ],

  Burco: [
    "October",
    "Sheekh Bashiir",
    "Maxamed Cali",
    "Hodan",
  ],

  Boosaaso: [
    "Biyo Kulule",
    "New Boosaaso",
    "Raf iyo Raaxo",
    "Wadajir",
  ],

  Garoowe: [
    "Hantiwadaag",
    "Horseed",
    "Wadajir",
    "Waaberi",
  ],

  Kismaayo: [
    "Calanley",
    "Farjano",
    "Faanoole",
    "Shaqaalaha",
  ],

  Baydhabo: [
    "Bardaale Area",
    "Horseed",
    "Isha",
    "Wadajir",
  ],
};

export const CITIES = Object.keys(SOMALIA_LOCATIONS);

export const getDistrictsByCity = (city) => {
  return SOMALIA_LOCATIONS[city] || [];
};