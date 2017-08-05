export default function parseHashParamsFrom(url) {
  const parser = document.createElement('a');
  parser.href = url;

  let { hash } = parser;
  hash = hash.substr(1);

  return hash
    .split(',')
    .map(pair => pair.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}
