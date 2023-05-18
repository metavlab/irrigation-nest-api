import { RequestMethod } from '@nestjs/common';

export const buildResourceNo = (
  url: string,
  method: RequestMethod | number,
): string => {
  return `${method}-${url}`;
};

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

/**
 *
 * @param path
 * @param baseUrl
 * @param options
 * @returns string
 */
export const composeUrl = (
  path: string,
  baseUrl = '',
  options?: { appPrefix?: string; registPrefix?: string },
): string => {
  const parts: string[] = [];
  const { appPrefix, registPrefix } = options || {};
  if (appPrefix && appPrefix.trim()) {
    parts.push(appPrefix.trim());
  }
  if (registPrefix && registPrefix.trim()) {
    parts.push(registPrefix.trim());
  }
  if (baseUrl && baseUrl.trim()) {
    parts.push(baseUrl.trim());
  }
  parts.push(path.trim());
  const url = parts
    .join('/')
    .replace('//', '/')
    .replace(/(.*)?\/$/, '$1');
  return url;
};
