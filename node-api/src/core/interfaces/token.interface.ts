export interface ITokenBase {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  sub: string;
}

export type IAccessBase = {
  id: number;
};

export type JwtAccessPayload = {
  username: string;
  version: string;
  platform: number;
} & IAccessBase;
