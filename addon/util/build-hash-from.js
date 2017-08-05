export default function buildHashFrom(object) {
  return Object.keys(object).reduce((acc, key) => {
    const value = object[key];
    const pair = `${key}=${value}`;

    if (acc) {
      return `${acc},${pair}`;
    } else {
      return pair;
    }
  }, '');
}
