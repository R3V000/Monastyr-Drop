export const eventPresentation = {
  hero: {
    ornamentTitle: 'PREZENTACJA WYDARZENIA',
    title: 'Event Wakacyjny',
    badge: 'START: 01.07.2026 - 18:00',
    cta: 'Zobacz szczegoly wydarzenia',
    background: 'assets/summer-main-bg.jpg',
    repeatBackground: 'assets/bg-repeat.jpg'
  },
  overview:
    'Wakacyjne Wydarzenie na Monastyr2 to specjalny letni event przygotowany z mysla o graczach. Przez czas trwania wydarzenia na serwerze pojawia sie specjalne aktywnosci, unikalne dropy oraz nagrody dostepne tylko podczas eventu.',
  facts: [
    {
      label: 'Start wydarzenia',
      value: '01.07.2026'
    },
    {
      label: 'Godzina startu',
      value: '18:00'
    },
    {
      label: 'Koniec wydarzenia',
      value: '15.07.2026'
    }
  ],
  playerHighlights: [
    {
      title: 'Letnie potwory eventowe',
      text: 'Sezonowi przeciwnicy dodadza mapom lekki wakacyjny rytm i dodatkowy cel podczas codziennej gry.'
    },
    {
      title: 'Specjalne bossy i minibossy',
      text: 'Wybrane aktywnosci pozwola zmierzyc sie z mocniejszymi przeciwnikami oraz walczyc o lepsze zdobycze.'
    },
    {
      title: 'Wakacyjne przedmioty do zdobycia',
      text: 'Podczas eventu pojawia sie przedmioty przygotowane specjalnie pod letnia edycje wydarzenia.'
    },
    {
      title: 'Limitowane nagrody',
      text: 'Najciekawsze zdobycze beda zwiazane z czasem trwania wydarzenia i sezonowym charakterem eventu.'
    },
    {
      title: 'Dodatkowe aktywnosci na mapach',
      text: 'Event bedzie mozna realizowac przy normalnym expieniu, biciu potworow i aktywnej grze na serwerze.'
    }
  ],
  location: {
    kicker: 'Nowa lokacja',
    title: 'Morska Swiatynia',
    text:
      'Podczas wakacyjnego wydarzenia gracze odkryja Morska Swiatynie - klimatyczna lokacje ukryta pod powierzchnia wody, przygotowana z mysla o specjalnych aktywnosciach eventowych.',
    gallery: [
      {
        src: 'assets/morska-swiatynia/map-1.jpg',
        alt: 'Wnetrze Morskiej Swiatyni z kolumnami i posagami'
      },
      {
        src: 'assets/morska-swiatynia/map-2.jpg',
        alt: 'Korytarze Morskiej Swiatyni w niebieskim swietle'
      },
      {
        src: 'assets/morska-swiatynia/map-3.jpg',
        alt: 'Sala Morskiej Swiatyni z podwodnym klimatem'
      },
      {
        src: 'assets/morska-swiatynia/map-4.jpg',
        alt: 'Fragment lokacji Morska Swiatynia'
      }
    ],
    minimap: {
      src: 'assets/morska-swiatynia/minimap.jpg',
      alt: 'Minimapa Morskiej Swiatyni'
    }
  },
  locationDetails: {
    kicker: 'Zasady lokacji',
    title: 'Czym dokladnie jest Morska Swiatynia?',
    text:
      'Morska Swiatynia jest nowa lokacja na wydarzenie wakacyjne, na ktore mozecie sie dostac po osiagnieciu 50 poziomu.',
    entryText:
      'Wejscie bedzie dostepne u staruszka na Pustyni Yongbi znajdujacego sie w oazie.',
    image: {
      src: 'assets/morska-swiatynia/entry.jpg',
      alt: 'Staruszek w oazie na Pustyni Yongbi, przy ktorym dostepne jest wejscie do Morskiej Swiatyni'
    },
    requirements: [
      {
        label: 'Wymagany poziom',
        value: '50 poziom'
      },
      {
        label: 'Godziny otwarcia',
        value: '18:00 - 21:00'
      },
      {
        label: 'Wejscie',
        value: 'Staruszek w oazie'
      }
    ],
    warningTitle: 'Wazne!',
    warning:
      'Lokacja posiada tylko jeden channel, wydarzenie jest mocno nastawione na rywalizacje, a balans bossow, potworow oraz metinow zostal specjalnie dopasowany pod wydarzenie.',
    tunnel: {
      title: 'Kamienie Metin w tunelach',
      text:
        'W srodku tunelu do kazdej komnaty napotkacie rozne Kamienie Metin, na ktore dzialaja rozne typy obrazen.',
      warning:
        'Nie przedostaniecie sie na kolejna czesc komnaty jezeli nie pokonacie przeszkody!',
      stones: [
        {
          name: 'Kamien Metin I',
          image: 'assets/morska-swiatynia/stone-1.webp',
          alt: 'Kamien Metin podatny na obrazenia z wierzchowca',
          rule: 'Dzialaja tylko obrazenia z wierzchowca',
          description:
            'Ten kamien wymaga walki z poziomu wierzchowca. Standardowe ataki postaci i umiejetnosci nie przejda przez przeszkode.'
        },
        {
          name: 'Kamien Metin II',
          image: 'assets/morska-swiatynia/stone-2.webp',
          alt: 'Kamien Metin podatny na obrazenia z buta',
          rule: 'Dzialaja tylko obrazenia z buta',
          description:
            'Przy tym kamieniu liczy sie odpowiedni typ uderzenia z buta. Inne zrodla obrazen nie pozwola odblokowac dalszej drogi.'
        },
        {
          name: 'Kamien Metin III',
          image: 'assets/morska-swiatynia/stone-3.webp',
          alt: 'Kamien Metin podatny na obrazenia z umiejetnosci',
          rule: 'Dzialaja tylko obrazenia z umiejetnosci',
          description:
            'Ostatni typ przeszkody reaguje wylacznie na obrazenia z umiejetnosci, dlatego wymaga innego podejscia niz poprzednie kamienie.'
        }
      ]
    }
  },
  worldBoss: {
    guardian: {
      badge: 'Etap koncowy',
      title: 'Straznik komnaty',
      text:
        'Przed koncowa komnata bedzie na Was czekal jej straznik. Wejscie do ostatniej komnaty otworzy sie tylko w momencie, kiedy zostanie on pokonany.',
      image: {
        src: 'assets/morska-swiatynia/merm-boss-2.webp',
        alt: 'Straznik przed finalna komnata Morskiej Swiatyni'
      }
    },
    boss: {
      badge: 'Glowna Komnata',
      title: 'Krolowa Syren',
      lead:
        'Nie jest to zwykly World Boss - w ostatniej komnacie dodalismy specjalne mechaniki.',
      image: {
        src: 'assets/morska-swiatynia/merm-boss-1.webp',
        alt: 'Krolowa Syren, finalny World Boss wydarzenia'
      },
      callouts: [
        'Boss regeneruje sie do 100% HP',
        'Po smierci wracasz na poczatek mapy',
        'Na mapie obowiazuje tryb one vs all'
      ],
      mechanics: [
        {
          title: 'Atak na cala komnate',
          text:
            'Boss ten bedzie atakowal w calym obszarze komnaty, dlatego walka wymaga stalej czujnosci i odpowiedniego pozycjonowania.'
        },
        {
          title: 'Regeneracja do 100% HP',
          text:
            'Gdy wszyscy przeciwnicy zostana pokonani, boss regeneruje sie do 100% HP, co oznacza koniecznosc ponownego podjecia walki od pelni sil.',
          featured: true
        },
        {
          title: 'Klatwa ostatniej komnaty',
          text: 'W ostatniej komnacie dziala klatwa, ktora po smierci cofa Was do poczatku mapy.'
        },
        {
          title: 'Powrot przez cala mape',
          text:
            'Po cofnieciu musicie od nowa pokonywac przeszkody i przebijac sie z powrotem do Krolowej Syren.'
        },
        {
          title: 'One vs All',
          text:
            'W ostatniej komnacie, jak i na calej mapie, obowiazuje tryb one vs all - kazdy ma mozliwosc walki z kazdym.',
          featured: true
        },
        {
          title: 'Brak grup i sojuszy',
          text: 'Nie ma mozliwosci tworzenia grup ani sojuszy. Kazdy walczy na wlasny rachunek.'
        },
        {
          title: 'Smierc od gracza = powrot na start',
          text: 'Po smierci od innego przeciwnika rowniez powracacie na poczatek mapy.',
          featured: true
        }
      ],
      flow: ['Walczysz', 'Giniesz', 'Wracasz na start', 'Pokonujesz przeszkody', 'Wracasz do bossa']
    }
  },
  activities:
    'Event zostal zaprojektowany tak, aby aktywnosc na mapach byla dynamiczna, ale nie meczaca. Gracze beda mogli brac udzial w wydarzeniu podczas codziennej gry, zdobywajac przedmioty i walczac o najlepsze nagrody.',
  activityCards: [
    {
      title: 'Naturalny udzial',
      text: 'Wydarzenie ma dzialac w rytmie normalnej rozgrywki, bez potrzeby odrywania sie od glownego progresu.'
    },
    {
      title: 'Czytelne cele',
      text: 'Aktywnosci maja byc proste do zrozumienia, z jasnym powodem do wejscia na mapy i grania regularnie.'
    },
    {
      title: 'Letnie tempo',
      text: 'Lekki klimat eventu ma dawac dodatkowa motywacje, ale nie zamieniac gry w meczacy obowiazek.'
    }
  ],
  finalCta: {
    title: 'Widzimy sie na starcie wydarzenia!',
    text: 'Wakacyjne Wydarzenie rozpoczyna sie 01.07.2026 o godzinie 18:00. Przygotuj postac, zbierz ekipe i wejdz do gry, gdy event wystartuje.',
    badge: 'Start: 01.07.2026 - 18:00'
  }
};
