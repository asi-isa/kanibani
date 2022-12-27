interface Idable {
  id: string;
}

export function updateLS<T extends Idable>(key: string, item: T) {
  const previousItems = JSON.parse(localStorage.getItem(key) ?? "{}");

  const items = {
    ...previousItems,
    [item.id]: item,
  };

  localStorage.setItem(key, JSON.stringify(items));
}

// export function updateLS<T extends Idable>(key: string, items: T[]) {
//   let items_ = JSON.parse(localStorage.getItem(key) ?? "{}");

//   items.forEach((item) => {
//     items_ = {
//       ...items_,
//       [item.id]: item,
//     };
//   });

//   localStorage.setItem(key, JSON.stringify(items_));
// }
