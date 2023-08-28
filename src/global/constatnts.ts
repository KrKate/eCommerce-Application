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
  BY = 'Belarus',
  IT = 'Italy',
  FR = 'France',
  DE = 'Germany',
  KZ = 'Kazakhstan',
  PL = 'Poland',
  RU = 'Russia',
  ES = 'Spain',
  GB = 'UnitedKingdom'
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

export const contactDetails = [
  ['title', 'Title'],
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['company', 'Company'],
  ['department', 'Department'],
  ['phone', 'Phone'],
  ['mobile', 'Mobile'],
  ['email', 'E-mail'],
  ['fax', 'Fax']
]

export const addressDetails = [
  ['streetName', 'Street name'],
  ['streetNumber', 'Street number'],
  ['postalCode', 'Postal code'],
  ['city', 'City'],
  ['region', 'Region'],
  ['state', 'State'],
  ['company', 'Company'],
  ['building', 'Building'],
  ['apartment', 'Apartment'],
  ['pOBox', 'PO Box'],
  ['additionalAddressInfo', 'Additional address info'],
  ['additionalStreetInfo', 'Additional street info']
]
