import { urlPartailConvert } from './url.util';

describe('Url partial utils', () => {
  it('v1/user/:id will convert to /user/*', () => {
    const url = 'v1/user/12';
    const ret = urlPartailConvert(url);

    expect(ret).toEqual('v1/user/*');
  });

  it('v1/user/:id/modify will convert to v1/user/*/modify', () => {
    const url = 'v1/user/22/modify';
    const ret = urlPartailConvert(url);

    expect(ret).toEqual('v1/user/*/modify');
  });

  it('v1/user/:id?username=abc&x=c will convert to v1/user/*', () => {
    const url = 'v1/user/3?username=abc&x=c';
    const ret = urlPartailConvert(url);

    expect(ret).toEqual('v1/user/*');
  });

  it('Remove Prefix v1/user will convert to user/*', () => {
    const url = 'v1/user/51?username=abc&x=c';
    const ret = urlPartailConvert(url, 'v1');

    expect(ret).toEqual('user/*');
  });
});
