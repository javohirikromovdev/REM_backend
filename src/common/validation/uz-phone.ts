// O'zbekiston mobil operatorlari kodlari (+998 XX XXX XX XX)
// 20 — OQ, 33 — Humans, 70 — Uztelecom, 50/93/94 — Ucell, 55/77/95/99 — Uzmobile, 88/97 — Mobiuz, 90/91 — Beeline, 98 — Perfectum
export const UZ_OPERATOR_CODES = ['20', '33', '50', '55', '70', '77', '88', '90', '91', '93', '94', '95', '97', '98', '99']

export const UZ_PHONE_REGEX = new RegExp(`^\\+998(${UZ_OPERATOR_CODES.join('|')})\\d{7}$`)

export const UZ_PHONE_MESSAGE = 'Phone must be an Uzbekistan mobile number in the format +998XXXXXXXXX with a valid operator code'
