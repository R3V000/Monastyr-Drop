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
  limitedRewards: {
    kicker: 'Limitowane - unikalne przedmioty',
    title: 'Set, ktory trafi tylko do nielicznych',
    lead:
      'Podczas eventu z glownego World Bossa bedziecie mogli zdobyc stale elementy wygladu. Ich liczba jest scisle limitowana, dlatego kazdy zdobyty przedmiot bedzie mial wyjatkowa wartosc kolekcjonerska.',
    summary:
      'Do zdobycia bedzie lacznie tylko 10 kostiumow, 10 fryzur oraz 10 nakladek. Po skompletowaniu calego setu ekwipunku administracja przyzna tym osobom unikalny item: Skrzydla Morskiej Iluzji.',
    chests: {
      kicker: 'Skrzynie Morskiej Iluzji',
      title: 'Unikalne przedmioty w specjalnych skrzyniach',
      lead:
        'Przedmioty unikalne bedziecie mogli zdobyc ze specjalnych skrzyn. Trafily one do skrzyn dlatego, ze w momencie otwarcia wybrany element zostaje na stale przypisany do postaci.',
      warningTitle: 'Wazne',
      warning:
        'Odbior Skrzydel Morskiej Iluzji bedzie dostepny wylacznie podczas trwania eventu wakacyjnego. Jezeli gracz nie zdazy skompletowac pelnego setu ekwipunku w czasie wydarzenia, nie otrzyma skrzydel po jego zakonczeniu. Czas odbioru jest limitowany.',
      items: [
        {
          title: 'Szkat. Fryz. Morskiej Iluzji',
          text:
            'Zawiera limitowane fryzury z morskiego setu. Po otwarciu zdobyta fryzura zostaje przypisana do postaci na stale.',
          image: {
            src: 'assets/skrzynie/skrzynia-fryzur.png',
            alt: 'Szkatulka Fryzur Morskiej Iluzji'
          }
        },
        {
          title: 'Szkat. Kost. Morskiej Iluzji',
          text:
            'Zawiera stale kostiumy wydarzenia. Po otwarciu kostium zostaje na stale przypisany do postaci, dlatego kazda skrzynia ma bardzo duza wartosc.',
          image: {
            src: 'assets/skrzynie/skrzynia-kostiumow.png',
            alt: 'Szkatulka Kostiumow Morskiej Iluzji'
          }
        },
        {
          title: 'Szkat. Nakl. Morskiej Iluzji',
          text:
            'Po kliknieciu w skrzynie otworzy sie menu, z ktorego mozecie wybrac dowolna nakladke z dostepnej puli. Wybrana nakladka zostanie przypisana do postaci na stale.',
          image: {
            src: 'assets/skrzynie/skrzynia-nakladek.png',
            alt: 'Szkatulka Nakladek Morskiej Iluzji'
          }
        }
      ]
    },
    counters: [
      {
        value: '10',
        label: 'kostiumow',
        note: 'stale kostiumy z eventu'
      },
      {
        value: '10',
        label: 'fryzur',
        note: 'limitowane fryzury'
      },
      {
        value: '10',
        label: 'nakladek',
        note: 'unikalne nakladki na bron'
      }
    ],
    featured: {
      label: 'Nagroda za pelny set',
      title: 'Skrzydla Morskiej Iluzji',
      text:
        'Ten item nie bedzie zwykla nagroda z puli dropu. Otrzymaja go tylko osoby, ktore skompletuja pelny set wydarzenia, dlatego bedzie to jedna z najbardziej unikatowych pamiatek z eventu.',
      image: {
        src: 'assets/set-ekwipunku/wings2.jpg',
        alt: 'Skrzydla Morskiej Iluzji'
      },
      bonusesTitle: 'Przedmiot unikalny',
      bonusesHeading: 'Bonusy Skrzydel Morskiej Iluzji',
      bonusesText:
        'Po zalozeniu Skrzydel Morskiej Iluzji postac otrzyma ponizsze stale bonusy. To dodatkowo podkresla ich wyjatkowy, kolekcjonerski charakter.',
      bonuses: [
        {
          label: 'Silny Przeciwko Potworom',
          value: '+10%'
        },
        {
          label: 'Silny Przeciwko Ludziom',
          value: '+10%'
        },
        {
          label: 'Max. HP',
          value: '+1000'
        },
        {
          label: 'Czas',
          value: 'staly'
        }
      ]
    },
    items: [
      {
        title: 'Stale kostiumy eventowe',
        eyebrow: 'Limit: 10 kompletow',
        text: 'Kostiumy z morskiego setu beda dostepne w bardzo malej liczbie i pozostana z graczami na stale.',
        image: {
          src: 'assets/set-ekwipunku/costume.webp',
          alt: 'Limitowane kostiumy eventowe'
        }
      },
      {
        title: 'Nakladki na bron',
        eyebrow: 'Limit: 10 sztuk',
        text: 'Nakladki domykaja wizualny komplet i beda jednym z najbardziej rozpoznawalnych elementow wakacyjnego setu.',
        image: {
          src: 'assets/set-ekwipunku/weapons.webp',
          alt: 'Limitowane nakladki na bron'
        }
      }
    ],
    rarityNote:
      'To bedzie bardzo waska pula nagrod. Jesli zalezy Wam na pelnym secie, kazdy drop z glownego World Bossa bedzie mial znaczenie.'
  },
  finalCta: {
    title: 'Widzimy sie na starcie wydarzenia!',
    text: 'Wakacyjne Wydarzenie rozpoczyna sie 01.07.2026 o godzinie 18:00. Przygotuj postac, zbierz ekipe i wejdz do gry, gdy event wystartuje.',
    badge: 'Start: 01.07.2026 - 18:00'
  }
};
