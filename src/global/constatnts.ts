export enum EmailError {
  REQUIRED = 'Email is required',
  FORMAT = 'Email address must be properly formatted (e.g., user@example.com).',
  WHITESPACE = 'Email address must not contain leading or trailing whitespace.',
  DOMAIN = 'Email address must contain a domain name (e.g., example.com).',
  SYMBOL = "Email address must contain an '@' symbol separating local part and domain name.",
  LATIN = 'The email address can only contain Latin characters.'
}

export enum PasswordError {
  REQUIRED = `Password is required`,
  LENGTH = 'Password must contain at least 8 characters.',
  UPPERCASE = 'Password must contain at least one uppercase letter.',
  LOWERCASE = 'Password must contain at least one lowercase letter.',
  DIGIT = 'Password must contain at least one digit.',
  SPECIAL_CHARACTER = 'Password must contain at least one special character.',
  WHITESPACE = 'Password must not contain leading or trailing whitespace.'
}

export enum StaticErrors {
  ONLY_LETTERS = 'Must contain at least one character and no special characters or numbers',
  AGE = 'You must be at least 13 years old.',
  POSTAL_CODE = 'Must follow the format for the country',
  STREET = 'Must contain at least one character',
  EMAIL_USED = 'This e-mail address is already registered in the system.'
}

export enum Countries {
  Belarus = 'Belarus',
  Italy = 'Italy',
  France = 'France',
  Germany = 'Germany',
  Kazakhstan = 'Kazakhstan',
  Poland = 'Poland',
  Russia = 'Russia',
  Spain = 'Spain',
  UnitedKingdom = 'United Kingdom'
}

export enum CountryCodes {
  Belarus = 'BY',
  Italy = 'IT',
  France = 'FR',
  Germany = 'DE',
  Kazakhstan = 'KZ',
  Poland = 'PL',
  Russia = 'RU',
  Spain = 'ES',
  UnitedKingdom = 'GB'
}

export enum CustomerUpdateActions {
  changeEmail = 'changeEmail',
  setFirstName = 'setFirstName',
  setLastName = 'setLastName',
  setMiddleName = 'setMiddleName',
  setTitle = 'setTitle',
  setSalutation = 'setSalutation',
  addAddress = 'addAddress',
  changeAddress = 'changeAddress',
  removeAddress = 'removeAddress',
  setDefaultShippingAddress = 'setDefaultShippingAddress',
  addShippingAddressId = 'addShippingAddressId',
  removeShippingAddressId = 'removeShippingAddressId',
  addBillingAddressId = 'addBillingAddressId',
  removeBillingAddressId = 'removeBillingAddressId',
  setCustomerGroup = 'setCustomerGroup',
  setCustomerNumber = 'setCustomerNumber',
  setExternalId = 'setExternalId',
  setCompanyName = 'setCompanyName',
  setDateOfBirth = 'setDateOfBirth',
  setVatId = 'setVatId',
  setCustomType = 'setCustomType',
  setCustomField = 'setCustomField',
  setAddressCustomType = 'setAddressCustomType',
  setAddressCustomField = 'setAddressCustomField',
  setLocale = 'setLocale',
  setKey = 'setKey',
  setStores = 'setStores'
}

export enum Salutations {
  None = '',
  Mr = 'Mr.',
  Mrs = 'Mrs.',
  Ms = 'Ms.',
  Miss = 'Miss',
  Dr = 'Dr.',
  Sr = 'Sr.',
  Fr = 'Fr.',
  Rev = 'Rev.',
  Pastor = 'Pastor',
  Judge = 'Judge',
  Rabbi = 'Rabbi',
  Mayor = 'Mayor',
  Dear = 'Dear',
  Comrade = 'Comrade',
  Khaleesi = 'Khaleesi'
}

export const userProfileLeftSideFields = [
  ['firstName', 'First name'],
  ['middleName', 'Middle name'],
  ['lastName', 'Last name'],
  ['dateOfBirth', 'Date of birth'],
  ['companyName', 'Company name'],
  ['email', 'E-mail'],
  ['customerNumber', 'Phone number']
]
