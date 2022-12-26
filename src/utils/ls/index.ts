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
