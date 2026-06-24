export const eventPresentation = {
  hero: {
    ornamentTitle: 'PREZENTACJA WYDARZENIA',
    title: 'Event wakacyjny',
    badge: 'START: 01.07.2026 - 18:00',
    cta: 'Zobacz szczegóły wydarzenia',
    background: 'assets/summer-main-bg.jpg',
    repeatBackground: 'assets/bg-repeat.jpg'
  },
  overview:
    'Wakacyjne wydarzenie na Monastyr2 to specjalny letni event przygotowany z myślą o graczach. W czasie jego trwania na serwerze pojawią się dodatkowe aktywności, unikalne dropy oraz nagrody dostępne wyłącznie podczas eventu.',
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
      text: 'Sezonowi przeciwnicy dodadzą mapom wakacyjnego klimatu i staną się dodatkowym celem podczas codziennej gry.'
    },
    {
      title: 'Specjalne bossy i minibossy',
      text: 'Wybrane aktywności pozwolą zmierzyć się z mocniejszymi przeciwnikami i powalczyć o cenniejsze zdobycze.'
    },
    {
      title: 'Wakacyjne przedmioty do zdobycia',
      text: 'Podczas eventu pojawią się przedmioty przygotowane specjalnie na letnią edycję wydarzenia.'
    },
    {
      title: 'Limitowane nagrody',
      text: 'Najciekawsze zdobycze będą powiązane z czasem trwania wydarzenia oraz jego sezonowym charakterem.'
    },
    {
      title: 'Dodatkowe aktywności na mapach',
      text: 'W wydarzeniu będzie można brać udział podczas normalnego expienia, walki z potworami i aktywnej gry na serwerze.'
    }
  ],
  location: {
    kicker: 'Nowa lokacja',
    title: 'Morska Świątynia',
    text:
      'Podczas wakacyjnego wydarzenia gracze odkryją Morską Świątynię - klimatyczną lokację ukrytą pod powierzchnią wody, przygotowaną z myślą o specjalnych aktywnościach eventowych.',
    gallery: [
      {
        src: 'assets/morska-swiatynia/map-1.jpg',
        alt: 'Wnętrze Morskiej Świątyni z kolumnami i posągami'
      },
      {
        src: 'assets/morska-swiatynia/map-2.jpg',
        alt: 'Korytarze Morskiej Świątyni w niebieskim świetle'
      },
      {
        src: 'assets/morska-swiatynia/map-3.jpg',
        alt: 'Sala Morskiej Świątyni z podwodnym klimatem'
      },
      {
        src: 'assets/morska-swiatynia/map-4.jpg',
        alt: 'Fragment lokacji Morska Świątynia'
      }
    ],
    minimap: {
      src: 'assets/morska-swiatynia/minimap.jpg',
      alt: 'Minimapa Morskiej Świątyni'
    }
  },
  locationDetails: {
    kicker: 'Zasady lokacji',
    title: 'Czym dokładnie jest Morska Świątynia?',
    text:
      'Morska Świątynia to nowa lokacja przygotowana na wydarzenie wakacyjne. Możecie się do niej dostać po osiągnięciu 50 poziomu.',
    entryText:
      'Wejście będzie dostępne u staruszka znajdującego się w oazie na Pustyni Yongbi.',
    image: {
      src: 'assets/morska-swiatynia/entry.jpg',
      alt: 'Staruszek w oazie na Pustyni Yongbi, przy którym dostępne jest wejście do Morskiej Świątyni'
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
        label: 'Wejście',
        value: 'Staruszek w oazie'
      }
    ],
    warningTitle: 'Ważne!',
    warning:
      'Lokacja będzie dostępna tylko na jednym kanale. Wydarzenie jest mocno nastawione na rywalizację, a balans bossów, potworów oraz metinów został specjalnie dopasowany do jego charakteru.',
    tunnel: {
      title: 'Kamienie Metin w tunelach',
      text:
        'W tunelach prowadzących do kolejnych komnat napotkacie Kamienie Metin, na które działają różne typy obrażeń.',
      warning:
        'Nie przedostaniecie się do kolejnej części komnaty, dopóki nie pokonacie przeszkody!',
      stones: [
        {
          name: 'Kamień Metin I',
          image: 'assets/morska-swiatynia/stone-1.webp',
          alt: 'Kamień Metin podatny na obrażenia z wierzchowca',
          rule: 'Działają tylko obrażenia z wierzchowca',
          description:
            'Ten kamień wymaga walki z poziomu wierzchowca. Standardowe ataki postaci oraz umiejętności nie pozwolą przełamać tej przeszkody.'
        },
        {
          name: 'Kamień Metin II',
          image: 'assets/morska-swiatynia/stone-2.webp',
          alt: 'Kamień Metin podatny na obrażenia zadawane pieszo',
          rule: 'Działają tylko obrażenia zadawane pieszo',
          description:
            'Przy tym kamieniu liczy się odpowiedni typ uderzenia zadawanego pieszo. Inne źródła obrażeń nie odblokują dalszej drogi.'
        },
        {
          name: 'Kamień Metin III',
          image: 'assets/morska-swiatynia/stone-3.webp',
          alt: 'Kamień Metin podatny na obrażenia z umiejętności',
          rule: 'Działają tylko obrażenia z umiejętności',
          description:
            'Ostatni typ przeszkody reaguje wyłącznie na obrażenia z umiejętności, dlatego wymaga innego podejścia niż poprzednie kamienie.'
        }
      ]
    }
  },
  worldBoss: {
    guardian: {
      badge: 'Etap końcowy',
      title: 'Strażnik komnaty',
      text:
        'Przed komnatą finałową będzie czekał na Was jej strażnik. Wejście do ostatniej komnaty otworzy się dopiero po jego pokonaniu.',
      image: {
        src: 'assets/morska-swiatynia/merm-boss-2.webp',
        alt: 'Strażnik przed finałową komnatą Morskiej Świątyni'
      }
    },
    boss: {
      badge: 'Główna komnata',
      title: 'Królowa Syren',
      lead:
        'Nie jest to zwykły World Boss - w ostatniej komnacie dodaliśmy specjalne mechaniki.',
      image: {
        src: 'assets/morska-swiatynia/merm-boss-1.webp',
        alt: 'Królowa Syren, finałowy World Boss wydarzenia'
      },
      callouts: [
        'Boss regeneruje się do 100% HP',
        'Po śmierci wracasz na początek mapy',
        'Na mapie obowiązuje tryb One vs All'
      ],
      mechanics: [
        {
          title: 'Atak na całą komnatę',
          text:
            'Boss będzie atakował w całym obszarze komnaty, dlatego walka wymaga stałej czujności i odpowiedniego pozycjonowania.'
        },
        {
          title: 'Regeneracja do 100% HP',
          text:
            'Gdy wszyscy przeciwnicy zostaną pokonani, boss zregeneruje się do 100% HP. Oznacza to konieczność ponownego podjęcia walki od pełni jego sił.',
          featured: true
        },
        {
          title: 'Klątwa ostatniej komnaty',
          text: 'W ostatniej komnacie działa klątwa, która po śmierci cofa Was na początek mapy.'
        },
        {
          title: 'Powrót przez całą mapę',
          text:
            'Po cofnięciu musicie od nowa pokonać przeszkody i przebić się z powrotem do Królowej Syren.'
        },
        {
          title: 'One vs All',
          text:
            'W ostatniej komnacie, tak jak na całej mapie, obowiązuje tryb One vs All - każdy może walczyć z każdym.',
          featured: true
        },
        {
          title: 'Brak grup i sojuszy',
          text: 'Nie ma możliwości tworzenia grup ani sojuszy. Każdy walczy na własny rachunek.'
        },
        {
          title: 'Śmierć od gracza = powrót na start',
          text: 'Po śmierci z ręki innego gracza również wracacie na początek mapy.',
          featured: true
        }
      ],
      flow: ['Walczysz', 'Giniesz', 'Wracasz na start', 'Pokonujesz przeszkody', 'Wracasz do bossa']
    }
  },
  limitedRewards: {
    kicker: 'Limitowane - unikalne przedmioty',
    title: 'Set, który trafi tylko do nielicznych',
    lead:
      'Podczas eventu z głównego World Bossa będziecie mogli zdobyć stałe elementy wyglądu. Ich liczba jest ściśle limitowana, dlatego każdy zdobyty przedmiot będzie miał wyjątkową wartość kolekcjonerską.',
    summary:
      'Do zdobycia będzie łącznie tylko 10 kostiumów, 10 fryzur oraz 10 nakładek. Po skompletowaniu całego setu ekwipunku administracja przyzna graczom unikalny przedmiot: Skrzydła Morskiej Iluzji.',
    chests: {
      kicker: 'Skrzynie Morskiej Iluzji',
      title: 'Unikalne przedmioty w specjalnych skrzyniach',
      lead:
        'Unikalne przedmioty będziecie mogli zdobyć ze specjalnych skrzyń. Zostały umieszczone właśnie w nich, ponieważ w momencie otwarcia wybrany element zostaje na stałe przypisany do postaci.',
      warningTitle: 'Ważne',
      warning:
        'Odbiór Skrzydeł Morskiej Iluzji będzie dostępny wyłącznie podczas trwania eventu wakacyjnego. Jeżeli nie zdążycie skompletować pełnego setu ekwipunku w czasie wydarzenia, nie otrzymacie skrzydeł po jego zakończeniu. Czas odbioru jest limitowany.',
      items: [
        {
          title: 'Szkat. Fryz. Morskiej Iluzji',
          text:
            'Zawiera limitowane fryzury z morskiego setu. Po otwarciu zdobyta fryzura zostaje na stałe przypisana do postaci.',
          image: {
            src: 'assets/skrzynie/skrzynia-fryzur.png',
            alt: 'Szkatułka Fryzur Morskiej Iluzji'
          }
        },
        {
          title: 'Szkat. Kost. Morskiej Iluzji',
          text:
            'Zawiera limitowane kostiumy wydarzenia. Po otwarciu kostium zostaje na stałe przypisany do postaci, dlatego każda skrzynia ma bardzo dużą wartość.',
          image: {
            src: 'assets/skrzynie/skrzynia-kostiumow.png',
            alt: 'Szkatułka Kostiumów Morskiej Iluzji'
          }
        },
        {
          title: 'Szkat. Nakl. Morskiej Iluzji',
          text:
            'Po kliknięciu skrzyni otworzy się menu, z którego możecie wybrać dowolną nakładkę z dostępnej puli. Wybrana nakładka zostanie na stałe przypisana do postaci.',
          image: {
            src: 'assets/skrzynie/skrzynia-nakladek.png',
            alt: 'Szkatułka Nakładek Morskiej Iluzji'
          }
        }
      ]
    },
    counters: [
      {
        value: '10',
        label: 'kostiumów',
        note: 'limitowane kostiumy'
      },
      {
        value: '10',
        label: 'fryzur',
        note: 'limitowane fryzury'
      },
      {
        value: '10',
        label: 'nakładek',
        note: 'unikalne nakładki na broń'
      }
    ],
    featured: {
      label: 'Nagroda za pełny set',
      title: 'Skrzydła Morskiej Iluzji',
      text:
        'Ten przedmiot nie będzie zwykłą nagrodą z puli dropu. Otrzymają go tylko osoby, które skompletują pełny set wydarzenia, dlatego będzie to jedna z najrzadszych pamiątek z eventu.',
      image: {
        src: 'assets/set-ekwipunku/wings2.jpg',
        alt: 'Skrzydła Morskiej Iluzji'
      },
      bonusesTitle: 'Przedmiot unikalny',
      bonusesHeading: 'Bonusy Skrzydeł Morskiej Iluzji',
      bonusesText:
        'Po założeniu Skrzydeł Morskiej Iluzji postać otrzyma poniższe stałe bonusy. To dodatkowo podkreśla ich wyjątkowy, kolekcjonerski charakter.',
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
          value: 'stały'
        }
      ]
    },
    items: [
      {
        title: 'Limitowane kostiumy eventowe',
        eyebrow: 'Limit: 10 kompletów',
        text: 'Kostiumy z morskiego setu będą dostępne w bardzo małej liczbie i pozostaną z graczami na stałe.',
        image: {
          src: 'assets/set-ekwipunku/costume.webp',
          alt: 'Limitowane kostiumy eventowe'
        }
      },
      {
        title: 'Nakładki na broń',
        eyebrow: 'Limit: 10 sztuk',
        text: 'Nakładki domykają wizualny komplet i będą jednym z najbardziej rozpoznawalnych elementów wakacyjnego setu.',
        image: {
          src: 'assets/set-ekwipunku/weapons.webp',
          alt: 'Limitowane nakładki na broń'
        }
      }
    ],
    rarityNote:
      'To będzie bardzo wąska pula nagród. Jeśli zależy Wam na pełnym secie, każdy drop z głównego World Bossa będzie miał znaczenie.'
  },
  finalCta: {
    title: 'Widzimy się na starcie wydarzenia!',
    text: 'Wakacyjne wydarzenie rozpoczyna się 01.07.2026 o godzinie 18:00. Przygotuj postać, zbierz ekipę i wejdź do gry, gdy event wystartuje.',
    badge: 'Start: 01.07.2026 - 18:00'
  }
};
