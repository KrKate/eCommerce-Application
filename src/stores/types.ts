export type Customer = {
  customer: CustomerInfo
}

export type CustomerInfo = {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: ModificationType
  createdBy: ModificationType
  customerNumber: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  title: string
  salutation: string
  dateOfBirth: string
  companyName: string
  password: string
  addresses: CustomerAddress[]
  defaultShippingAddressId: string
  defaultBillingAddressId: string
  shippingAddressIds: string[]
  billingAddressIds: string[]
  isEmailVerified: boolean
  customerGroup: CustomerGroup
  stores: []
  authenticationMode: string
}

export type CustomerGroup = {
  typeId: string
  id: string
}

export type CustomerAddress = {
  id: string
  key: string
  externalId: string
  country: string
  title: string
  salutation: string
  firstName: string
  lastName: string
  streetName: string
  streetNumber: string
  additionalStreetInfo: string
  postalCode: string
  city: string
  region: string
  state: string
  company: string
  department: string
  building: string
  apartment: string
  pOBox: string
  phone: string
  mobile: string
  email: string
  fax: string
  additionalAddressInfo: string
}

export type ModificationType = {
  isPlatformClient: boolean
  user: {
    typeId: string
    id: string
  }
}

export type TokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export type CategoryResponse = {
  limit: number
  offset: number
  count: number
  total: number
  results: Category[]
}

export type Category = {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: ModificationType
  createdBy: ModificationType
  key: string
  name: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  description: {
    'en-US': string
  }
  ancestors: []
  orderHint: string
  externalId: string
  assets: []
}

export type PasswordFlowResponse = {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
}

export type SiteCookie = {
  firstName: string
  lastName: string
  email: string
  id: string
  accessToken: string
  refreshToken: string
}

export type UserRegistrationInfo = {
  email: string
  firstName: string
  lastName: string
  password: string
  dateOfBirth: string
}
