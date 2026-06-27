Folder na globalne ikonki itemow dla edytorow.

Docelowa forma katalogu:

assets/
  item-icons/
    50513.png
    71084.png
    25040.png
    50011.png

Zasady:

1. Nazwa pliku powinna byc VNUM-em itemu.
   Przyklad: item 50513 -> 50513.png

2. Najlepiej wrzucac ikonki jako PNG.
   Docelowo edytory beda szukaly ikonki po sciezce:
   assets/item-icons/{VNUM}.png

3. Nie tworz podfolderow dla kategorii itemow.
   Wszystkie ikonki trzymaj bezposrednio w assets/item-icons/.

4. Jezeli item ma inna ikonke niz jego VNUM, zapisz to osobno do pozniejszej mapy aliasow.
   Przyklad:
   item 70057 moze uzywac ikonki 70038.png.

5. Po podmianie item_proto.json albo dodaniu nowych ikon trzeba odpalic build,
   zeby pliki trafily do folderu out.

Docelowy przeplyw:

data/item_proto.json       - glowna baza itemow
assets/item-icons/*.png    - lokalne ikonki itemow
items.generated.js         - plik generowany automatycznie dla edytorow
