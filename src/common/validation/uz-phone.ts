export const UZ_OPERATOR_CODES = ['20', '33', '50', '55', '70', '77', '88', '90', '91', '93', '94', '95', '97', '98', '99']

export const UZ_PHONE_REGEX = new RegExp(`^\\+998(${UZ_OPERATOR_CODES.join('|')})\\d{7}$`)

export const UZ_PHONE_MESSAGE = 'Phone must be an Uzbekistan mobile number in the format +998XXXXXXXXX with a valid operator code'
