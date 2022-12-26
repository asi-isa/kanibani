import getFromLS from "./getFromLS";

interface Idable {
  id: string;
}

export default function <T extends Idable>(
  key: string,
  where?: (t: T) => boolean
) {
  function invert(where?: (t: T) => boolean) {
    if (!where) return undefined;

    return (t: T) => {
      return !where(t);
    };
  }

  const items_ = getFromLS<T>(key, invert(where));

  const items: { [key: string]: T } = {};
  items_.forEach((t) => {
    items[t.id] = t;
  });

  localStorage.setItem(key, JSON.stringify(items));
}
