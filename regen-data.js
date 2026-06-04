(function () {
  const MAP_DEFINITIONS = [
    { id: "m1-jinno", name: "M1 Jinno", minimap: "" },
    { id: "m1-shinsoo", name: "M1 Shinsoo", minimap: "" },
    { id: "m1-chunjo", name: "M1 Chunjo", minimap: "" },
    { id: "m2-jinno", name: "M2 Jinno", minimap: "./lokacje-minimapy/M2_JINNO_MAPA.png" },
    { id: "m2-shinsoo", name: "M2 Shinsoo", minimap: "./lokacje-minimapy/M2_SHINSOO_MAPA.png" },
    { id: "m2-chunjo", name: "M2 Chunjo", minimap: "./lokacje-minimapy/M2_CHUNJO_MAPKA.png" },
    { id: "pustynia-yongbi", name: "Pustynia Yongbi", minimap: "./lokacje-minimapy/PUSTYNIA_YONGBI_MAPA.png" },
    { id: "dolina-orkow", name: "Dolina Orków", minimap: "./lokacje-minimapy/DOLINA_ORKOW_MAPA.png" },
    { id: "loch-malp", name: "Loch Małp", minimap: "" },
    { id: "swiatynia-hwang", name: "Świątynia Hwang", minimap: "./lokacje-minimapy/SWIATYNIA_HWANG_MAPA.png" },
    { id: "gora-sohan", name: "Góra Sohan", minimap: "./lokacje-minimapy/GORA_SOHAN_MAPA.png" },
    { id: "ognista-ziemia", name: "Ognista Ziemia", minimap: "./lokacje-minimapy/OGNISTA_ZIEMIA_MAPA.png" },
    { id: "wezowe-pole", name: "Wężowe Pole", minimap: "./lokacje-minimapy/WEZOWE_POLE_MAPA.png" },
    { id: "kraina-gigantow", name: "Kraina Gigantów", minimap: "./lokacje-minimapy/KRAINA_GIGANTOW_MAPA.png" },
    { id: "las-duchow", name: "Las Duchów", minimap: "./lokacje-minimapy/LAS_DUCHOW_MAPA.png" },
    { id: "czerwony-las", name: "Czerwony Las", minimap: "./lokacje-minimapy/CZERWONY_LAS_MAPA.png" },
    { id: "loch-pajakow-v1", name: "Loch Pająków V1", minimap: "" },
    { id: "loch-pajakow-v2", name: "Loch Pająków V2", minimap: "" },
    { id: "atlantyda-v1", name: "Atlantyda V1", minimap: "./lokacje-minimapy/GROTA_WYGNANCOW_V1_MAPA.png" },
    { id: "atlantyda-v2", name: "Atlantyda V2", minimap: "./lokacje-minimapy/GROTA_WYGNANCOW_V2_MAPA.png" },
    { id: "wawoz-smierci", name: "Wawóz Śmierci", minimap: "./lokacje-minimapy/WAWOZ_SMIERCI_MAPA.png" }
  ];

  const MOB_DATABASE = {
    8001: { name: "Metin Cierpienia", image: "./lokacje/cierpienia.png" },
    8002: { name: "Metin Walki", image: "./lokacje/walki.png" },
    8003: { name: "Metin Bitwy", image: "./lokacje/bitwy.png" },
    8004: { name: "Metin Chciwości", image: "./lokacje/chciwosci.png" },
    8005: { name: "Metin Czerni", image: "./lokacje/czerni.png" },
    8006: { name: "Metin Ciemności", image: "./lokacje/ciemnosci.png" },
    8007: { name: "Metin Zazdrości", image: "./lokacje/zazdrosci.png" },
    8008: { name: "Metin Duszy", image: "./lokacje/duszy.png" },
    8009: { name: "Metin Cienia", image: "./lokacje/cienia.png" },
    8010: { name: "Metin Twardości", image: "./lokacje/twardosci.png" },
    8011: { name: "Metin Diabła", image: "./lokacje/diabla.png" },
    8012: { name: "Metin Upadku", image: "./lokacje/upadku.png" },
    8013: { name: "Metin Śmierci", image: "./lokacje/smierci.png" },
    8014: { name: "Metin Morderstwa", image: "./lokacje/morderstwa.png" },
    8024: { name: "Metin Pung-Ma", image: "./lokacje/pungma.png" },
    8025: { name: "Metin Ma-An", image: "./lokacje/maan.png" },
    8026: { name: "Metin Tu-Young", image: "./lokacje/tuyoung.png" },
    8027: { name: "Metin Jeon-Un", image: "./lokacje/jeonun.png" },
    8053: { name: "Metin Próżności", image: "./lokacje/grotav1.png" },
    8054: { name: "Metin Gniewu", image: "./lokacje/grotav2.png" },
    8051: { name: "Metin Mroku", image: "./lokacje/wawoz.png" },
    494: { name: "Chuong", image: "./lokacje/Chuong.png" },
    493: { name: "Goo Pae", image: "./lokacje/Goo-Pae.png" },
    492: { name: "Bo", image: "./lokacje/Bo.png" },
    491: { name: "Mahon", image: "./lokacje/Mahon.png" },
    191: { name: "Lykos", image: "./lokacje/lykos.png" },
    192: { name: "Scrofa", image: "./lokacje/scrofa.png" },
    193: { name: "Bera", image: "./lokacje/bera.png" },
    194: { name: "Tigris", image: "./lokacje/tigris.png" },
    394: { name: "Jin-Hee", image: "./lokacje/Jin-Hee.png" },
    591: { name: "Best. Kapitan", image: "./lokacje/kapitan.png" },
    533: { name: "Best. Łucznik", image: "./lokacje/lucznik.png" },
    534: { name: "Best. Specjalista", image: "./lokacje/specjalista.png" },
    532: { name: "Best. Maniak", image: "./lokacje/maniak.png" },
    531: { name: "Best. Żołnierz", image: "./lokacje/zolnierz.png" },
    5161: { name: "Skalista Małpa", image: "./lokacje/Skalista_Małpa.png" },
    5162: { name: "Chodząca Małpa", image: "./lokacje/Chodząca_Małpa.png" },
    5163: { name: "Lord Małp", image: "./lokacje/Lord_Małp.png" },
    691: { name: "Wódz Orków", image: "./lokacje/wodz-orkow.png" },
    2191: { name: "Olbrzymi Żółw", image: "./lokacje/zolw.png" },
    1307: { name: "Elit. Zjawa", image: "./lokacje/elit-zjawa.png" },
    1304: { name: "Zjawa", image: "./lokacje/zjawa.png" },
    792: { name: "Ezot. Reinkar", image: "./lokacje/reinkar.png" },
    1192: { name: "Wróżka", image: "" },
    1901: { name: "Dziewięć Ogonów", image: "./lokacje/dziewiec.png" },
    29004: { name: "Mroźny Tropiciel", image: "./lokacje/tropiciel.png" },
    2206: { name: "Ognisty Król", image: "./lokacje/ognisty-krol.png" },
    2207: { name: "Elit. Ognisty Król", image: "./lokacje/ognisty-krol.png" },
    29003: { name: "Płomienny Rozbijacz", image: "./lokacje/plomienny-rozbijacz.png" },
    29001: { name: "Strażnik Obozu", image: "./lokacje/straznik-obozu.png" },
    2306: { name: "Olbrzymi Duch Drzewa", image: "./lokacje/drzewo.png" },
    29002: { name: "Kamienny Egzekutor", image: "./lokacje/kamienny-egzekutor.png" },
    2091: { name: "Królowa Pająków", image: "./lokacje/krolowa.png" },
    2093: { name: "Elit. Królowa Pająków", image: "./lokacje/elit-krolowa.png" },
    2492: { name: "Generał Yonghan", image: "./lokacje/general.png" },
    3191: { name: "Polifem", image: "./lokacje/polifem.png" },
    3290: { name: "Rakszas", image: "./lokacje/rakszas.png" }
  };

  function getMobInfo(mobVnum) {
    return MOB_DATABASE[mobVnum] || {
      name: "Nieznany mob",
      image: ""
    };
  }

  function regen(mobVnum, type, mapIndex, x, y, rangeX, rangeY, everyMinutes, note, startAt, regenType) {
    return {
      mobVnum,
      regenType: regenType || 1,
      mapIndex,
      x,
      y,
      rangeX,
      rangeY,
      startAt: startAt || "00:00",
      everyMinutes,
      type,
      note: note || ""
    };
  }

  const REGEN_BY_MAP = {
    "m1-jinno": [
      regen(8001, "Metiny", 41, 612, 772, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 41, 224, 710, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 41, 356, 396, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 41, 394, 948, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 41, 524, 898, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 41, 78, 916, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 41, 152, 610, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 41, 584, 432, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 41, 318, 178, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 41, 680, 380, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 41, 756, 820, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 41, 202, 912, 20, 20, 5, "", "00:00", 1),
      regen(8004, "Metiny", 41, 388, 1068, 20, 20, 5, "", "00:00", 1),
      regen(8004, "Metiny", 41, 720, 660, 20, 20, 10, "", "00:00", 1),
      regen(8004, "Metiny", 41, 116, 338, 20, 20, 10, "", "00:00", 1),
      regen(8005, "Metiny", 41, 712, 126, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 41, 676, 1178, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(191, "Bossy", 41, 649, 1170, 20, 20, 15, "", "00:00", 1),
      regen(394, "Bossy", 41, 676, 1128, 20, 20, 15, "", "00:00", 1),
      regen(192, "Bossy", 41, 174, 986, 20, 20, 10, "", "00:00", 1),
      regen(193, "Bossy", 41, 335, 149, 20, 20, 10, "", "00:00", 1),
      regen(194, "Bossy", 41, 131, 352, 20, 20, 10, "", "00:00", 1)
    ],
    "m1-shinsoo": [
      regen(8001, "Metiny", 1, 760, 190, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 1, 186, 426, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 1, 446, 602, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 1, 684, 854, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 1, 950, 238, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 1, 208, 864, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 1, 468, 962, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 1, 890, 888, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 1, 154, 688, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 1, 294, 1120, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 1, 748, 988, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 1, 352, 300, 20, 20, 5, "", "00:00", 1),
      regen(8004, "Metiny", 1, 602, 90, 20, 20, 10, "", "00:00", 1),
      regen(8004, "Metiny", 1, 102, 1080, 20, 20, 10, "", "00:00", 1),
      regen(8004, "Metiny", 1, 832, 448, 20, 20, 10, "", "00:00", 1),
      regen(8005, "Metiny", 1, 238, 180, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 1, 912, 1014, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(191, "Bossy", 1, 910, 1019, 20, 20, 15, "", "00:00", 1),
      regen(394, "Bossy", 1, 213, 184, 20, 20, 15, "", "00:00", 1),
      regen(192, "Bossy", 1, 93, 1070, 20, 20, 10, "", "00:00", 1),
      regen(193, "Bossy", 1, 610, 103, 20, 20, 10, "", "00:00", 1),
      regen(194, "Bossy", 1, 500, 1101, 20, 20, 10, "", "00:00", 1)
    ],
    "m1-chunjo": [
      regen(8001, "Metiny", 21, 362, 262, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 21, 648, 318, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 21, 440, 724, 20, 20, 5, "", "00:00", 1),
      regen(8001, "Metiny", 21, 482, 1050, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 21, 784, 436, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 21, 364, 462, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 21, 384, 924, 20, 20, 5, "", "00:00", 1),
      regen(8002, "Metiny", 21, 910, 950, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 21, 578, 206, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 21, 344, 1134, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 21, 680, 922, 20, 20, 5, "", "00:00", 1),
      regen(8003, "Metiny", 21, 262, 576, 20, 20, 5, "", "00:00", 1),
      regen(8004, "Metiny", 21, 658, 1104, 20, 20, 10, "", "00:00", 1),
      regen(8004, "Metiny", 21, 770, 98, 20, 20, 10, "", "00:00", 1),
      regen(8004, "Metiny", 21, 908, 634, 20, 20, 10, "", "00:00", 1),
      regen(8005, "Metiny", 21, 904, 1072, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 21, 336, 166, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(191, "Bossy", 21, 765, 82, 20, 20, 15, "", "00:00", 1),
      regen(394, "Bossy", 21, 356, 261, 20, 20, 15, "", "00:00", 1),
      regen(192, "Bossy", 21, 240, 1185, 20, 20, 10, "", "00:00", 1),
      regen(193, "Bossy", 21, 630, 1113, 20, 20, 10, "", "00:00", 1),
      regen(194, "Bossy", 21, 263, 598, 20, 20, 10, "", "00:00", 1)
    ],
    "m2-jinno": [
      regen(8005, "Metiny", 43, 680, 190, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 43, 708, 466, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 43, 562, 712, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 43, 284, 598, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8006, "Metiny", 43, 358, 158, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 43, 882, 660, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 43, 260, 832, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 43, 166, 420, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8007, "Metiny", 43, 198, 870, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 43, 360, 842, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 43, 672, 704, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 43, 902, 876, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(591, "Bossy", 43, 851, 824, 20, 20, 30, "Best Kapitan", "00:00", 1),
      regen(533, "Bossy", 43, 220, 604, 20, 20, 15, "", "00:00", 1),
      regen(534, "Bossy", 43, 378, 687, 20, 20, 15, "", "00:00", 1),
      regen(532, "Bossy", 43, 310, 654, 20, 20, 15, "", "00:00", 1),
      regen(531, "Bossy", 43, 686, 528, 20, 20, 15, "", "00:00", 1),
      regen(494, "Bossy", 43, 441, 135, 20, 20, 15, "", "00:00", 1),
      regen(493, "Bossy", 43, 641, 371, 20, 20, 15, "", "00:00", 1),
      regen(492, "Bossy", 43, 314, 195, 20, 20, 15, "", "00:00", 1),
      regen(491, "Bossy", 43, 624, 761, 20, 20, 15, "", "00:00", 1)
    ],
    "m2-shinsoo": [
      regen(8005, "Metiny", 3, 862, 454, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 3, 750, 192, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 3, 188, 596, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 3, 482, 894, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8006, "Metiny", 3, 482, 380, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 3, 824, 306, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 3, 786, 640, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 3, 274, 828, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8007, "Metiny", 3, 120, 122, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 3, 442, 120, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 3, 172, 276, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 3, 100, 504, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(591, "Bossy", 3, 214, 222, 20, 20, 30, "Best Kapitan", "00:00", 1),
      regen(533, "Bossy", 3, 140, 677, 20, 20, 15, "", "00:00", 1),
      regen(534, "Bossy", 3, 297, 862, 20, 20, 15, "", "00:00", 1),
      regen(532, "Bossy", 3, 671, 561, 20, 20, 15, "", "00:00", 1),
      regen(531, "Bossy", 3, 420, 426, 20, 20, 15, "", "00:00", 1),
      regen(494, "Bossy", 3, 617, 683, 20, 20, 15, "", "00:00", 1),
      regen(493, "Bossy", 3, 881, 458, 20, 20, 15, "", "00:00", 1),
      regen(492, "Bossy", 3, 788, 686, 20, 20, 15, "", "00:00", 1),
      regen(491, "Bossy", 3, 465, 367, 20, 20, 15, "", "00:00", 1)
    ],
    "m2-chunjo": [
      regen(8005, "Metiny", 23, 150, 328, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 23, 482, 180, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 23, 858, 648, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8005, "Metiny", 23, 338, 530, 20, 20, 10, "Metin Czerni (25lvl)", "00:00", 1),
      regen(8006, "Metiny", 23, 376, 112, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 23, 804, 218, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 23, 208, 704, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8006, "Metiny", 23, 592, 728, 20, 20, 10, "Metin Ciemności (30lvl)", "00:00", 1),
      regen(8007, "Metiny", 23, 268, 834, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 23, 738, 652, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 23, 744, 404, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(8007, "Metiny", 23, 578, 838, 20, 20, 15, "Metin Zazdrości (35lvl)", "00:00", 1),
      regen(591, "Bossy", 23, 860, 830, 20, 20, 30, "Best Kapitan", "00:00", 1),
      regen(533, "Bossy", 23, 273, 592, 20, 20, 15, "", "00:00", 1),
      regen(534, "Bossy", 23, 226, 682, 20, 20, 15, "", "00:00", 1),
      regen(532, "Bossy", 23, 741, 221, 20, 20, 15, "", "00:00", 1),
      regen(531, "Bossy", 23, 647, 212, 20, 20, 15, "", "00:00", 1),
      regen(494, "Bossy", 23, 496, 188, 20, 20, 15, "", "00:00", 1),
      regen(493, "Bossy", 23, 197, 408, 20, 20, 15, "", "00:00", 1),
      regen(492, "Bossy", 23, 199, 706, 20, 20, 15, "", "00:00", 1),
      regen(491, "Bossy", 23, 445, 177, 20, 20, 15, "", "00:00", 1)
    ],
    "pustynia-yongbi": [
      regen(8008, "Metiny", 63, 916, 218, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 63, 1198, 404, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 63, 180, 1188, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 63, 140, 384, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8009, "Metiny", 63, 1362, 496, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 63, 1188, 996, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 63, 612, 1030, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 63, 560, 546, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8010, "Metiny", 63, 376, 510, 20, 20, 15, "Metin Twardości (50lvl)", "00:00", 1),
      regen(8010, "Metiny", 63, 272, 736, 20, 20, 15, "Metin Twardości (50lvl)", "00:00", 1),
      regen(8010, "Metiny", 63, 834, 944, 20, 20, 15, "Metin Twardości (50lvl)", "00:00", 1),
      regen(8010, "Metiny", 63, 578, 1146, 20, 20, 15, "Metin Twardości (50lvl)", "00:00", 1),
      regen(2191, "Bossy", 63, 870, 634, 50, 50, 45, "Zolw", "00:00", 1)
    ],
    "dolina-orkow": [
      regen(8008, "Metiny", 64, 746, 158, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 64, 858, 388, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 64, 1280, 740, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 64, 1244, 1356, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8008, "Metiny", 64, 496, 1148, 20, 20, 15, "Metin Duszy (40lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 388, 486, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 1150, 462, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 726, 632, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 676, 812, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 832, 846, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(8009, "Metiny", 64, 732, 1126, 20, 20, 15, "Metin Cienia (45lvl)", "00:00", 1),
      regen(691, "Bossy", 64, 500, 340, 20, 20, 45, "Wodz Orkow", "00:00", 1),
      regen(691, "Bossy", 64, 786, 738, 120, 120, 45, "Wodz Orkow", "00:00", 1),
      regen(534, "Bossy", 64, 1092, 1064, 20, 20, 15, "", "00:00", 1),
      regen(534, "Bossy", 64, 1046, 1140, 20, 20, 15, "", "00:00", 1),
      regen(533, "Bossy", 64, 720, 1340, 20, 20, 15, "", "00:00", 1),
      regen(532, "Bossy", 64, 1390, 500, 20, 20, 15, "", "00:00", 1),
      regen(531, "Bossy", 64, 216, 738, 20, 20, 15, "", "00:00", 1)
    ],
    "loch-malp": [
      regen(5161, "Łatwy Loch Małp", 45, 594, 342, 5, 5, 30, "", "00:00", 1),
      regen(5162, "Średni Loch Małp", 109, 629, 492, 5, 5, 30, "", "00:00", 1),
      regen(5163, "Trudny Loch Małp", 110, 630, 489, 5, 5, 60, "", "00:00", 1)
    ],
    "swiatynia-hwang": [
      regen(8012, "Metiny", 65, 378, 428, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 456, 586, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 432, 814, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 808, 856, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 882, 594, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 918, 848, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 912, 310, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 914, 140, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 688, 142, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(8012, "Metiny", 65, 566, 840, 20, 20, 20, "Metin Upadku (60lvl)", "00:00", 1),
      regen(1307, "Bossy", 65, 427, 823, 60, 60, 120, "Elit. Zjawa", "00:00", 1),
      regen(1304, "Bossy", 65, 397, 453, 30, 30, 90, "Zjawa", "00:00", 1),
      regen(792, "Bossy", 65, 911, 846, 70, 70, 45, "Reinkar", "00:00", 1)
    ],
    "gora-sohan": [
      regen(8011, "Metiny", 61, 1048, 536, 20, 20, 20, "Metin Diabla (55lvl)", "00:00", 1),
      regen(8011, "Metiny", 61, 590, 844, 20, 20, 20, "Metin Diabla (55lvl)", "00:00", 1),
      regen(8011, "Metiny", 61, 200, 1080, 20, 20, 20, "Metin Diabla (55lvl)", "00:00", 1),
      regen(8011, "Metiny", 61, 514, 580, 20, 20, 20, "Metin Diabla (55lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 372, 270, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 794, 222, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 206, 1248, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 1324, 1332, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 1376, 1082, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(8013, "Metiny", 61, 1198, 800, 20, 20, 20, "Metin Smierci (65lvl)", "00:00", 1),
      regen(1901, "Bossy", 61, 765, 608, 150, 150, 60, "Dziewiec Ogonow", "00:00", 1),
      regen(29004, "Bossy", 61, 1400, 712, 50, 50, 45, "Mrozny Tropiciel", "00:00", 1),
      regen(29004, "Bossy", 61, 761, 615, 1000, 1000, 45, "Mrozny Tropiciel", "00:00", 1)
    ],
    "ognista-ziemia": [
      regen(8014, "Metiny", 62, 696, 202, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 1370, 226, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 212, 708, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 898, 538, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 434, 708, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 714, 696, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 1178, 782, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 1022, 1158, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 424, 1122, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(8014, "Metiny", 62, 602, 1392, 20, 20, 20, "Metin Morderstwa (70lvl)", "00:00", 1),
      regen(2206, "Bossy", 62, 165, 731, 120, 120, 90, "Ognisty Krol", "00:00", 1),
      regen(2207, "Bossy", 62, 1337, 1125, 100, 100, 120, "Elit. Ognisy Krol", "00:00", 1),
      regen(29003, "Bossy", 62, 912, 486, 50, 50, 60, "Plomienny Rozbijacz", "00:00", 1),
      regen(29003, "Bossy", 62, 763, 766, 1000, 1000, 60, "Plomienny Rozbijacz", "00:00", 1)
    ],
    "wezowe-pole": [
      regen(8024, "Metiny", 69, 911, 574, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 69, 682, 790, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 69, 737, 642, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 69, 475, 568, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8025, "Metiny", 69, 310, 898, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 69, 300, 650, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 69, 126, 778, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 69, 169, 541, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(29002, "Bossy", 69, 178, 842, 8, 8, 60, "Kamienny Egzekutor", "00:00", 1),
      regen(29002, "Bossy", 69, 536, 764, 350, 350, 60, "Kamienny Egzekutor", "00:00", 1)
    ],
    "kraina-gigantow": [
      regen(8024, "Metiny", 70, 263, 274, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 70, 116, 314, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 70, 369, 239, 20, 20, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8025, "Metiny", 70, 126, 195, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 70, 263, 135, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 70, 425, 145, 20, 20, 20, "Metin Ma-An (80lvl)", "00:00", 1)
    ],
    "las-duchow": [
      regen(8024, "Metiny", 67, 148, 66, 10, 10, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 67, 412, 84, 10, 10, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 67, 249, 206, 10, 10, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 67, 386, 314, 10, 10, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8024, "Metiny", 67, 68, 334, 10, 10, 20, "Metin Pung-Ma (75lvl)", "00:00", 1),
      regen(8025, "Metiny", 67, 95, 415, 10, 10, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 67, 353, 354, 10, 10, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 67, 264, 341, 10, 10, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 67, 447, 183, 10, 10, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(8025, "Metiny", 67, 228, 54, 10, 10, 20, "Metin Ma-An (80lvl)", "00:00", 1),
      regen(29001, "Bossy", 67, 221, 259, 400, 400, 60, "Straznik Obozu", "00:00", 1),
      regen(29001, "Bossy", 67, 221, 259, 400, 400, 60, "Straznik obozu", "00:00", 1)
    ],
    "czerwony-las": [
      regen(8026, "Metiny", 68, 139, 369, 20, 20, 25, "Metin Tu-Young (85lvl)", "00:00", 1),
      regen(8026, "Metiny", 68, 585, 539, 20, 20, 25, "Metin Tu-Young (85lvl)", "00:00", 1),
      regen(8026, "Metiny", 68, 167, 678, 20, 20, 25, "Metin Tu-Young (85lvl)", "00:00", 1),
      regen(8026, "Metiny", 68, 264, 610, 20, 20, 25, "Metin Tu-Young (85lvl)", "00:00", 1),
      regen(8026, "Metiny", 68, 373, 460, 20, 20, 25, "Metin Tu-Young (85lvl)", "00:00", 1),
      regen(8027, "Metiny", 68, 272, 382, 20, 20, 25, "Metin Jeon-Un (90lvl)", "00:00", 1),
      regen(8027, "Metiny", 68, 299, 81, 20, 20, 25, "Metin Jeon-Un (90lvl)", "00:00", 1),
      regen(8027, "Metiny", 68, 487, 230, 20, 20, 25, "Metin Jeon-Un (90lvl)", "00:00", 1),
      regen(8027, "Metiny", 68, 646, 285, 20, 20, 25, "Metin Jeon-Un (90lvl)", "00:00", 1),
      regen(8027, "Metiny", 68, 704, 84, 20, 20, 25, "Metin Jeon-Un (90lvl)", "00:00", 1),
      regen(2306, "Bossy", 68, 700, 88, 20, 20, 60, "Duch Drzewa", "00:00", 1),
      regen(2306, "Bossy", 68, 210, 526, 10, 10, 60, "Duch Drzewa", "00:00", 1)
    ],
    "loch-pajakow-v1": [
      regen(2091, "Bossy", 104, 389, 392, 15, 15, 60, "Krolowa Pajakow", "00:00", 1)
    ],
    "loch-pajakow-v2": [
      regen(2093, "Bossy", 71, 385, 868, 15, 15, 60, "Elit Krolowa Pajakow", "00:00", 1)
    ],
    "atlantyda-v1": [
      regen(8053, "Metiny", 72, 513, 1304, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(8053, "Metiny", 72, 1153, 326, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(8053, "Metiny", 72, 601, 900, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(8053, "Metiny", 72, 149, 1339, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(8053, "Metiny", 72, 1443, 812, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(8053, "Metiny", 72, 1165, 1305, 20, 20, 30, "Metin Grota V1 (95lvl)", "00:00", 1),
      regen(1192, "Bossy", 72, 1301, 1405, 20, 20, 720, "Wrozka", "20:00", 1)
    ],
    "atlantyda-v2": [
      regen(8054, "Metiny", 73, 1330, 270, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(8054, "Metiny", 73, 1443, 1300, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(8054, "Metiny", 73, 730, 1116, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(8054, "Metiny", 73, 148, 1300, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(8054, "Metiny", 73, 394, 739, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(8054, "Metiny", 73, 744, 346, 20, 20, 30, "Metin Grota V2 (100lvl)", "00:00", 1),
      regen(2492, "Bossy", 73, 569, 176, 20, 20, 180, "General Yonghan", "00:00", 1),
      regen(2492, "Bossy", 73, 942, 928, 20, 20, 180, "General Yonghan", "00:00", 1)
    ],
    "wawoz-smierci": [
      regen(8051, "Metiny", 25, 200, 613, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(8051, "Metiny", 25, 618, 633, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(8051, "Metiny", 25, 217, 386, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(8051, "Metiny", 25, 527, 342, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(8051, "Metiny", 25, 627, 163, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(8051, "Metiny", 25, 760, 520, 20, 20, 40, "Metin Wąwóz (105lvl)", "00:00", 1),
      regen(3191, "Bossy", 25, 886, 639, 15, 15, 360, "Polifem", "00:00", 1),
      regen(3290, "Bossy", 25, 845, 184, 15, 15, 240, "Rakszas", "00:00", 1),
      regen(3290, "Bossy", 25, 148, 623, 15, 15, 240, "Rakszas", "00:00", 1)
    ]
  };

  function parseClockToMinutes(clock) {
    const match = String(clock).match(/^(\d{2}):(\d{2})$/);

    if (!match) {
      return null;
    }

    return Number(match[1]) * 60 + Number(match[2]);
  }

  function getIntervalFromTimes(times) {
    if (times.length < 2) {
      return null;
    }

    const first = parseClockToMinutes(times[0]);
    const second = parseClockToMinutes(times[1]);

    if (first === null || second === null) {
      return null;
    }

    return second > first ? second - first : second + 1440 - first;
  }

  function parseRegenText(rawText, options) {
    const settings = options || {};
    const rows = [];
    let currentType = settings.defaultType || "Respawn";

    String(rawText).split(/\r?\n/).forEach((rawLine) => {
      const trimmed = rawLine.trim();

      if (trimmed === "") {
        return;
      }

      if (trimmed.startsWith("##")) {
        const heading = trimmed.replace(/^##\s*/, "").trim();

        if (heading && heading !== settings.mapName) {
          currentType = heading;
        }

        return;
      }

      if (!/^\d+\s+/.test(trimmed)) {
        return;
      }

      const commentMatch = trimmed.match(/\/\/\s*(.+)$/);
      const comment = commentMatch ? commentMatch[1].trim() : "";
      const cleanLine = trimmed.replace(/\s*\/\/.*$/, "");
      const parts = cleanLine.split(/\s+/);

      if (parts.length < 8) {
        return;
      }

      const scheduleValue = parts.slice(7).join(" ");
      const times = scheduleValue.match(/\b\d{2}:\d{2}\b/g) || [];
      const regenType = Number(parts[1]);
      const intervalFromTimes = getIntervalFromTimes(times);
      const intervalFromValue = regenType === 0 ? Number.parseInt(scheduleValue, 10) : null;

      rows.push({
        mobVnum: Number(parts[0]),
        regenType,
        mapIndex: Number(parts[2]),
        x: Number(parts[3]),
        y: Number(parts[4]),
        rangeX: Number(parts[5]),
        rangeY: Number(parts[6]),
        startAt: times[0] || "00:00",
        everyMinutes: intervalFromTimes || intervalFromValue,
        type: currentType,
        note: comment
      });
    });

    return rows;
  }

  window.REGEN_CONFIG = {
    maps: MAP_DEFINITIONS,
    mobDatabase: MOB_DATABASE,
    getMobInfo,
    respawnsByMap: REGEN_BY_MAP,
    parseRegenText
  };
}());
