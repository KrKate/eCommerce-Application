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
