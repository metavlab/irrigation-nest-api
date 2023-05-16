export const urlPartailConvert = (url: string, prefix?: string): string => {
  if (!url) return url;
  const _url = url.indexOf('?') > 0 ? url.substring(0, url.indexOf('?')) : url;
  const parts = _url.split(/\//);
  let newParts = parts.map((s) => (/^\d+$/.test(s) ? '*' : s));
  if (prefix) {
    newParts = newParts.filter((v) => v !== prefix);
  }
  return newParts.join('/');
};
