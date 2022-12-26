export default function <T>(name: string, where?: (t: T) => boolean) {
  const asString = localStorage.getItem(name);
  const asObj = JSON.parse(asString || "{}");

  const asArray: T[] = [];
  for (let key in asObj) {
    const column = asObj[key];
    asArray.push(column);
  }

  if (where) {
    return asArray.filter(where);
  }

  return asArray;
}
