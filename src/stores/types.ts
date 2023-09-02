export type Customer = {
  customer: {
    id: string
    version: number
    versionModifiedAt: string
    lastMessageSequenceNumber: number
    createdAt: string
    lastModifiedAt: string
    lastModifiedBy: {
      isPlatformClient: boolean
      user: {
        typeId: string
        id: string
      }
    }
    createdBy: {
      isPlatformClient: boolean
      user: {
        typeId: string
        id: string
      }
    }
    email: string
    firstName: string
    lastName: string
    middleName: string
    title: string
    salutation: string
    password: string
    addresses: []
    shippingAddressIds: []
    billingAddressIds: []
    isEmailVerified: boolean
    customerGroup: {
      typeId: string
      id: string
    }
    stores: []
    authenticationMode: string
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
  lastModifiedBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
  createdBy: {
    isPlatformClient: boolean
    user: {
      typeId: string
      id: string
    }
  }
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
}

export type Product = {
  id: string
  version: number
  masterData: {
    current: {
      categories: [
        {
          id: string
          typeId: string
        }
      ]
      description: {
        'en-US': string
      }
      masterVariant: {
        attributes: []
        id: number
        images: [
          {
            dimensions: {
              h: number
              w: number
            }
            url: string
          }
        ]
        prices: [
          {
            value: {
              type: string
              fractionDigits: number
              centAmount: number
              currencyCode: string
            }
            id: string
            discounted?: {
              value?: {
                  type?: string,
                  currencyCode?: string,
                  centAmount?: number,
                  fractionDigits?: number
              },
              discount?: {
                  typeId?: string,
                  id?: string
              }
          }
          }
        ]
        sku: string
      }
      name: {
        'en-US': string
      }
      slug: {
        'en-US': string
      }
      variants: []
      searchKeywords: {}
    }
    hasStagedChanges: boolean
    published: boolean
    staged: {
      categories: [
        {
          id: string
          typeId: string
        }
      ]
      description: {
        'en-US': string
      }
      masterVariant: {
        key: string
        attributes: []
        id: number
        images: [
          {
            dimensions: {
              h: number
              w: number
            }
            url: string
          }
        ]
        prices: [
          {
            value: {
              type: string
              fractionDigits: number
              centAmount: number
              currencyCode: string
            }
            id: string
          }
        ]
        sku: string
      }
      name: {
        'en-US': string
      }
      slug: {
        'en-US': string
      }
      variants: []
      searchKeywords: {}
    }
  }
  productType: {
    id: string
    typeId: string
  }
  taxCategory: {
    id: string
    typeId: string
  }
  createdAt: string
  lastModifiedAt: string
}

export type ProductResponse = {
  limit: number
  offset: number
  count: number
  total: number
  results: Product[]
}
