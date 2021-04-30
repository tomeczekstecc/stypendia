import { isObject } from 'class-validator';

export const mapTabs = (submit, tabNr) => {
  let arr = [];
  for (const [key, value] of Object.entries(submit)) {
    if (
      (key.slice(0, 5) === 'isTab' && value) ||
      (key.slice(-5) === '_desc' && value)
    ) {
      for (const [key2, value2] of Object.entries(submit)) {
        if (key.slice(2, 7).toLowerCase() === key2.slice(0, 5)) {
          arr.push({ name: `${key}`, value: value2 });
        }
      }
    }
    if (
      (key.slice(0, 7) === 'isTab1a' && value) ||
      (key.slice(0, 7) === 'isTab2a' && value) ||
      (key.slice(0, 7) === 'isTab1i' && value) ||
      (key.slice(0, 7) === 'isTab2i' && value)
    ) {
      arr.push(arr.push({ name: `${key}`, value }));
    }
  }

  const filteredArr = arr.filter((item) => isObject(item));

  const valuedArr = filteredArr.map((item) => {
    for (const obj of results) {
      if (obj.name === item.name) {
        return (item = {
          ...item,
          value: item.value === true ? null : item.value,
          description: obj.value,
        });
      }
    }
  });

  return valuedArr.filter((i) => i.name.slice(5, 6) === tabNr);
};

const results = [
  {
    name: 'isTab1a',
    value:
      'Udział w konkursie przedmiotowym /olimpiadzie przedmiotowej i uzyskanie tytułu laureata lub finalisty.',
  },
  {
    name: 'isTab1b',
    value: 'Wykonanie pracy badawczej o tematyce:',
  },
  {
    name: 'isTab1c',
    value: 'Przygotowanie referatu / prezentacji na temat:',
  },
  {
    name: 'isTab1d',
    value: 'Przygotowanie publikacji na temat:',
  },
  {
    name: 'isTab1e',
    value: 'Przygotowanie wystawy z zakresu: ',
  },
  {
    name: 'isTab1f',
    value:
      'Stworzenie filmu o tematyce dotyczącej wybranego przedmiotu kierunkowego:',
  },
  {
    name: 'isTab1g',
    value: 'Stworzenie programu komputerowego / aplikacji dotyczących:',
  },
  {
    name: 'isTab1h',
    value: 'Uzyskanie certyfikatu językowego na poziomie:',
  },
  {
    name: 'isTab1i',
    value:
      'Otrzymanie oceny co najmniej bardzo dobrej na koniec roku szkolnego 2020/2021.',
  },
  {
    name: 'isTab1j',
    value: 'Stworzenie własnej strony internetowej dotyczącej:',
  },
  {
    name: 'isTab1j',
    value: 'Stworzenie własnej strony internetowej dotyczącej:',
  },

  {
    name: 'isTab1k',
    value: 'Inny:',
  },

  {
    name: 'isTab2a',
    value:
      'Udział w konkursie przedmiotowym /olimpiadzie przedmiotowej i uzyskanie tytułu laureata lub finalisty.',
  },
  {
    name: 'isTab2b',
    value: 'Wykonanie pracy badawczej o tematyce:',
  },
  {
    name: 'isTab2c',
    value: 'Przygotowanie referatu / prezentacji na temat:',
  },
  {
    name: 'isTab2d',
    value: 'Przygotowanie publikacji na temat:',
  },
  {
    name: 'isTab2e',
    value: 'Przygotowanie wystawy z zakresu: ',
  },
  {
    name: 'isTab2f',
    value:
      'Stworzenie filmu o tematyce dotyczącej wybranego przedmiotu kierunkowego:',
  },
  {
    name: 'isTab2g',
    value: 'Stworzenie programu komputerowego / aplikacji dotyczących:',
  },
  {
    name: 'isTab2h',
    value: 'Uzyskanie certyfikatu językowego na poziomie:',
  },
  {
    name: 'isTab2i',
    value:
      'Otrzymanie oceny co najmniej bardzo dobrej na koniec roku szkolnego 2020/2021.',
  },
  {
    name: 'isTab2j',
    value: 'Stworzenie własnej strony internetowej dotyczącej:',
  },
  {
    name: 'isTab2j',
    value: 'Stworzenie własnej strony internetowej dotyczącej:',
  },

  {
    name: 'isTab2k',
    value: 'Inny:',
  },
];
