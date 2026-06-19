export const dropSimulationConfig = {
  global: {
    itemRandRange: 4000000
  },

  defaults: {
    calculationMode: "auto",
    channels: 5,
    spawnsPerChannel: 1,
    respawnMinutes: 60,
    uptimeHours: 24,
    killsPerAppearance: 1,
    spawnGroups: [],
    spawnWindows: [],
    competitionShare: 1,
    manualDailyKills: null,
    dungeonRunsPerDay: 0,
    killsPerDungeon: 1,
    mobLevel: null
  },

  itemLabels: {
    25040: "Zwój Błogosławieństwa",
    71084: "Zaczarowanie Przedmiotu",
    71085: "Wzmocnienie Przedmiotu",
    71094: "Rada Pustelnika",
    71107: "Fasolka Zen",
    50513: "Kamień Duchowy",
    51501: "Cor Draconis Surowe",
    70024: "Marmur Błogosławieństwa",
    50050: "Medal Konny",
    30156: "Dominacja"
  },

  categories: [
    {
      id: "zwoj-blogoslawienstwa",
      label: "Zwój Błogosławieństwa",
      itemVnums: [25040]
    },
    {
      id: "zmianki",
      label: "Zaczarowanie Przedmiotu",
      itemVnums: [71084]
    },
    {
      id: "rady",
      label: "Rady Pustelnika",
      itemVnums: [71094]
    },
    {
      id: "egzo",
      label: "Zwój Egzorcyzmu",
      itemVnums: [39008]
    },
    {
      id: "cor-surowe",
      label: "Cor Draconis Surowe",
      itemVnums: [51501]
    }
  ],

  mobOverrides: {
    // Type drop z regen-data.js.
    // channels = liczba kanalow serwera.
    // spawnsPerChannel = suma spotow na wszystkich mapach z regen-data.js dla danego VNUM.
    // spawnGroups liczy mieszane respawny dokladnie, np. czesc spotow co 5 min i czesc co 10 min.
    // spawnWindows liczy eventowe okna respawnu dla type drop, np:
    // spawnWindows: [{ startHour: 16, endHour: 22, respawnMinutes: 30, spots: 3, maps: 1 }]
    // Wzor: channels x maps x spots x ((endHour - startHour) x 60 / respawnMinutes).
    // competitionShare pozwala obnizyc realny supply, jesli nie wszystko jest bite.
    191: {
      calculationMode: "spawn",
      displayName: "Lykos",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 30,
      regenMaps: 3
    },
    192: {
      calculationMode: "spawn",
      displayName: "Scrofa",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 3, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    193: {
      calculationMode: "spawn",
      displayName: "Bera",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 3, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    194: {
      calculationMode: "spawn",
      displayName: "Tigris",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 3, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    491: {
      calculationMode: "spawn",
      displayName: "Mahon",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 45,
      regenMaps: 3
    },
    492: {
      calculationMode: "spawn",
      displayName: "Bo",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 45,
      regenMaps: 3
    },
    493: {
      calculationMode: "spawn",
      displayName: "Goo Pae",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    494: {
      calculationMode: "spawn",
      displayName: "Chuong",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    531: {
      calculationMode: "spawn",
      displayName: "Best. Zolnierz",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 4, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 4
    },
    532: {
      calculationMode: "spawn",
      displayName: "Best. Maniak",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 4, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 4
    },
    533: {
      calculationMode: "spawn",
      displayName: "Best. Lucznik",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 4, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 4
    },
    534: {
      calculationMode: "spawn",
      displayName: "Best. Specjalista",
      channels: 5,
      spawnsPerChannel: 5,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 5, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 4
    },
    591: {
      calculationMode: "spawn",
      displayName: "Best. Kapitan",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 30,
      spawnGroups: [{ spots: 3, respawnMinutes: 30 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 3
    },
    691: {
      calculationMode: "spawn",
      displayName: "Wodz Orkow",
      channels: 5,
      spawnsPerChannel: 2,
      respawnMinutes: 45,
      spawnGroups: [{ spots: 2, respawnMinutes: 45 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    792: {
      calculationMode: "spawn",
      displayName: "Ezot. Reinkar",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 45,
      spawnGroups: [{ spots: 1, respawnMinutes: 45 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    1304: {
      calculationMode: "spawn",
      displayName: "Zjawa",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 90,
      spawnGroups: [{ spots: 1, respawnMinutes: 90 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    1307: {
      calculationMode: "spawn",
      displayName: "Elit. Zjawa",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 120,
      spawnGroups: [{ spots: 1, respawnMinutes: 120 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    1901: {
      calculationMode: "spawn",
      displayName: "Dziewiec Ogonow",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2091: {
      calculationMode: "spawn",
      displayName: "Krolowa Pajakow",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2093: {
      calculationMode: "spawn",
      displayName: "Elit. Krolowa Pajakow",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2191: {
      calculationMode: "spawn",
      displayName: "Olbrzymi Zolw",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 45,
      spawnGroups: [{ spots: 1, respawnMinutes: 45 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2206: {
      calculationMode: "spawn",
      displayName: "Ognisty Krol",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 90,
      spawnGroups: [{ spots: 1, respawnMinutes: 90 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2207: {
      calculationMode: "spawn",
      displayName: "Elit. Ognisty Krol",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 120,
      spawnGroups: [{ spots: 1, respawnMinutes: 120 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2306: {
      calculationMode: "spawn",
      displayName: "Olbrzymi Duch Drzewa",
      channels: 5,
      spawnsPerChannel: 2,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 2, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    2492: {
      calculationMode: "spawn",
      displayName: "General Yonghan",
      channels: 5,
      spawnsPerChannel: 2,
      respawnMinutes: 240,
      spawnGroups: [{ spots: 2, respawnMinutes: 240 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    3191: {
      calculationMode: "spawn",
      displayName: "Polifem",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 360,
      spawnGroups: [{ spots: 1, respawnMinutes: 360 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    3290: {
      calculationMode: "spawn",
      displayName: "Rakszas",
      channels: 5,
      spawnsPerChannel: 2,
      respawnMinutes: 240,
      spawnGroups: [{ spots: 2, respawnMinutes: 240 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    5161: {
      calculationMode: "spawn",
      displayName: "Skalista Malpa",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnGroups: [{ spots: 1, respawnMinutes: 30 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 35,
      regenMaps: 1
    },
    5162: {
      calculationMode: "spawn",
      displayName: "Chodzaca Malpa",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnGroups: [{ spots: 1, respawnMinutes: 30 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 40,
      regenMaps: 1
    },
    5163: {
      calculationMode: "spawn",
      displayName: "Lord Malp",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 45,
      regenMaps: 1
    },
    8001: {
      calculationMode: "spawn",
      displayName: "Metin Cierpienia",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 5,
      spawnGroups: [{ spots: 9, respawnMinutes: 5 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 5,
      regenMaps: 3
    },
    8002: {
      calculationMode: "spawn",
      displayName: "Metin Walki",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 5,
      spawnGroups: [{ spots: 9, respawnMinutes: 5 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 10,
      regenMaps: 3
    },
    8003: {
      calculationMode: "spawn",
      displayName: "Metin Bitwy",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 5,
      spawnGroups: [{ spots: 9, respawnMinutes: 5 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 15,
      regenMaps: 3
    },
    8004: {
      calculationMode: "spawn",
      displayName: "Metin Chciwosci",
      channels: 5,
      spawnsPerChannel: 6,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 1, respawnMinutes: 5 }, { spots: 8, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 20,
      regenMaps: 3
    },
    8005: {
      calculationMode: "spawn",
      displayName: "Metin Czerni",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 9, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 25,
      regenMaps: 6
    },
    8006: {
      calculationMode: "spawn",
      displayName: "Metin Ciemnosci",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 10,
      spawnGroups: [{ spots: 9, respawnMinutes: 10 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 30,
      regenMaps: 3
    },
    8007: {
      calculationMode: "spawn",
      displayName: "Metin Zazdrosci",
      channels: 5,
      spawnsPerChannel: 9,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 9, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 35,
      regenMaps: 3
    },
    8008: {
      calculationMode: "spawn",
      displayName: "Metin Duszy",
      channels: 5,
      spawnsPerChannel: 6,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 6, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 40,
      regenMaps: 2
    },
    8009: {
      calculationMode: "spawn",
      displayName: "Metin Cienia",
      channels: 5,
      spawnsPerChannel: 7,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 7, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 45,
      regenMaps: 2
    },
    8010: {
      calculationMode: "spawn",
      displayName: "Metin Twardosci",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 15,
      spawnGroups: [{ spots: 3, respawnMinutes: 15 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 50,
      regenMaps: 1
    },
    8011: {
      calculationMode: "spawn",
      displayName: "Metin Diabla",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 3, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 55,
      regenMaps: 1
    },
    8012: {
      calculationMode: "spawn",
      displayName: "Metin Upadku",
      channels: 5,
      spawnsPerChannel: 7,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 7, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 60,
      regenMaps: 1
    },
    8013: {
      calculationMode: "spawn",
      displayName: "Metin Smierci",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 4, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 65,
      regenMaps: 1
    },
    8014: {
      calculationMode: "spawn",
      displayName: "Metin Morderstwa",
      channels: 5,
      spawnsPerChannel: 6,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 6, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 70,
      regenMaps: 1
    },
    8024: {
      calculationMode: "spawn",
      displayName: "Metin Pung-Ma",
      channels: 5,
      spawnsPerChannel: 6,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 6, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 75,
      regenMaps: 3
    },
    8025: {
      calculationMode: "spawn",
      displayName: "Metin Ma-An",
      channels: 5,
      spawnsPerChannel: 6,
      respawnMinutes: 20,
      spawnGroups: [{ spots: 6, respawnMinutes: 20 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 80,
      regenMaps: 3
    },
    8026: {
      calculationMode: "spawn",
      displayName: "Metin Tu-Young",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 25,
      spawnGroups: [{ spots: 3, respawnMinutes: 25 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 85,
      regenMaps: 1
    },
    8027: {
      calculationMode: "spawn",
      displayName: "Metin Jeon-Un",
      channels: 5,
      spawnsPerChannel: 3,
      respawnMinutes: 25,
      spawnGroups: [{ spots: 3, respawnMinutes: 25 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 90,
      regenMaps: 1
    },
    8051: {
      calculationMode: "spawn",
      displayName: "Metin Mroku",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 40,
      spawnGroups: [{ spots: 4, respawnMinutes: 40 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 105,
      regenMaps: 1
    },
    8053: {
      calculationMode: "spawn",
      displayName: "Metin Proznosci",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 30,
      spawnGroups: [{ spots: 4, respawnMinutes: 30 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 95,
      regenMaps: 1
    },
    8054: {
      calculationMode: "spawn",
      displayName: "Metin Gniewu",
      channels: 5,
      spawnsPerChannel: 4,
      respawnMinutes: 30,
      spawnGroups: [{ spots: 4, respawnMinutes: 30 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      mobLevel: 100,
      regenMaps: 1
    },
    29001: {
      calculationMode: "spawn",
      displayName: "Straznik Obozu",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    29002: {
      calculationMode: "spawn",
      displayName: "Kamienny Egzekutor",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    29003: {
      calculationMode: "spawn",
      displayName: "Plomienny Rozbijacz",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 60,
      spawnGroups: [{ spots: 1, respawnMinutes: 60 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    29004: {
      calculationMode: "spawn",
      displayName: "Mrozny Tropiciel",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 45,
      spawnGroups: [{ spots: 1, respawnMinutes: 45 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    39030: {
      calculationMode: "spawn",
      displayName: "Metin lotny Duszy",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnWindows: [{ startHour: 16, endHour: 22, respawnMinutes: 30, spots: 3, maps: 1 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    39031: {
      calculationMode: "spawn",
      displayName: "Metin lotny Cienia",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnWindows: [{ startHour: 16, endHour: 22, respawnMinutes: 30, spots: 3, maps: 1 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    39035: {
      calculationMode: "spawn",
      displayName: "Metin lotny Smierci",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnWindows: [{ startHour: 16, endHour: 22, respawnMinutes: 30, spots: 3, maps: 1 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },
    39038: {
      calculationMode: "spawn",
      displayName: "Metin lotny Ma-An",
      channels: 5,
      spawnsPerChannel: 1,
      respawnMinutes: 30,
      spawnWindows: [{ startHour: 16, endHour: 22, respawnMinutes: 30, spots: 4, maps: 1 }],
      killsPerAppearance: 1,
      competitionShare: 1,
      regenMaps: 1
    },

    // Type limit / dungeony: uzupelniaj realna liczbe runow calego serwera dziennie.
    693: {
      calculationMode: "dungeon",
      displayName: "Odrodzony Ork",
      dungeonRunsPerDay: 40,
      killsPerDungeon: 1,
      mobLevel: 75
    },
    2092: {
      calculationMode: "dungeon",
      displayName: "Baronowna",
      dungeonRunsPerDay: 30,
      killsPerDungeon: 1,
      mobLevel: 75
    },
    1093: {
      calculationMode: "dungeon",
      displayName: "Ripper",
      dungeonRunsPerDay: 25,
      killsPerDungeon: 1,
      mobLevel: 75
    },
    2598: {
      calculationMode: "dungeon",
      displayName: "Azrael",
      dungeonRunsPerDay: 20,
      killsPerDungeon: 1,
      mobLevel: 75
    },
    2493: {
      calculationMode: "dungeon",
      displayName: "Beran-Setaou",
      dungeonRunsPerDay: 15,
      killsPerDungeon: 1,
      mobLevel: 97
    },
    6091: {
      calculationMode: "dungeon",
      displayName: "Razador",
      dungeonRunsPerDay: 10,
      killsPerDungeon: 1,
      mobLevel: 105
    },
    3960: {
      calculationMode: "dungeon",
      displayName: "Hydra",
      dungeonRunsPerDay: 5,
      killsPerDungeon: 1,
      mobLevel: 120
    }
  }
};
