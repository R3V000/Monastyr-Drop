Folder na webowe ikonki itemow dla edytorow.

Ten folder jest przygotowywany automatycznie przez build/generator.
Nie musisz tu recznie wrzucac wszystkich ikonek po VNUM-ie, jezeli masz
data/item_list.txt oraz rozpakowany katalog ikon klienta.

Docelowy przeplyw:

assets/
  icon/
    item/
      50513.tga
      71084.tga
      ...
  item-icons/
    item/
      50513.png
      71084.png
      ...

data/
  item_proto.json
  item_list.txt

Zasady:

1. data/item_proto.json zawiera itemy, nazwy i parametry.

2. data/item_list.txt zawiera mapowanie VNUM -> sciezka ikonki z klienta.
   Przyklad:
   50513 ETC icon/item/50513.tga

3. assets/icon/ powinien miec strukture z klienta.
   Przyklad:
   assets/icon/item/50513.tga

4. Generator czyta item_list.txt i tworzy wersje PNG w assets/item-icons/.
   Dzieki temu itemy, ktore dziela jedna ikonke albo maja niestandardowa
   nazwe pliku, dostaja poprawna ikonke w edytorach.

5. Jezeli dodasz nowe ikonki, item_proto.json albo item_list.txt, odpal build,
   zeby odswiezyc data/items.generated.js oraz folder out.

Fallback:

Jesli item nie wystepuje w item_list.txt, edytory sprobuja uzyc:
assets/item-icons/{VNUM}.png
