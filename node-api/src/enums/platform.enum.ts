export enum PlatformEnum {
  /* no auth */
  NO_AUTH = 0,
  ADMIN_PLATFORM = 1,
  MERCHANT_PLATFORM = 2,
  COMMON_PLATFORM = 3,
}

export const PlatformMessage = {
  0: 'Guest',
  1: 'Adminstrator',
  2: 'Merchant',
  3: 'CommonUser',
};
