import type { CustomerUpdateActions } from '@/global/constatnts'
import { CountryCodes, Salutations } from '@/global/constatnts'

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
  country: keyof CountryCodes
  title: string
  salutation: Salutations
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

type AncestorsType = {
  typeId: string
  id: string
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
    ru: string
  }
  slug: {
    'en-US': string
    ru: string
  }
  description: {
    'en-US': string
  }
  ancestors: AncestorsType[]
  parent: AncestorsType[]
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

export type UpdateUserInfoDTO = {
  version: number
  actions: ActionsDTO[]
}

export type ActionsDTO = {
  action: CustomerUpdateActions
  email?: string
  firstName?: string
  lastName?: string
  middleName?: string
  title?: string
  salutation?: string
  address?: Partial<CustomerAddress>
  addressId?: string
  customerNumber?: string
  externalId?: string
  companyName?: string
  dateOfBirth?: string
  vatId?: string
}

export type ChangePasswordDTO = {
  id: string
  version: number
  currentPassword: string
  newPassword: string
}

type ProductCategory = {
  id: string
  typeId: string
}

export type Product = {
  id: string
  version: number
  productType: ProductCategory
  masterData: {
    current: {
      categories: ProductCategory[]
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
                type?: string
                currencyCode?: string
                centAmount?: number
                fractionDigits?: number
              }
              discount?: {
                typeId?: string
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
          },
          {
            dimensions?: {
              h?: number
              w?: number
            }
            url?: string
          },
          {
            dimensions?: {
              h?: number
              w?: number
            }
            url?: string
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
  taxCategory: {
    id: string
    typeId: string
  }
  createdAt: string
  lastModifiedAt: string
}

export type ProductProjections = {
  id: string
  version: number
  productType: ProductCategory
  name: {
    'en-US': string
    ru: string
  }
  description: {
    'en-US': string
    ru: string
  }
  categories: ProductCategory[]
  categoryOrderHints: {}
  slug: {
    'en-US': string
    ru: string
  }
  metaTitle: {
    'en-US': string
    ru: string
  }
  metaDescription: {
    'en-US': string
    ru: string
  }
  masterVariant: {
    id: number
    sku: string
    key: string
    prices: [
      {
        id: string
        value: {
          type: string
          currencyCode: string
          centAmount: number
          fractionDigits: number
        }
        discounted?: {
          value?: {
            type?: string
            currencyCode?: string
            centAmount?: number
            fractionDigits?: number
          }
          discount?: {
            typeId?: string
            id?: string
          }
        }
      }
    ]
    images: [
      {
        url: string
        label: string
        dimensions: {
          w: number
          h: number
        }
      }
    ]
    attributes: []
    assets: []
  }
  variants: []
  searchKeywords: {}
  hasStagedChanges: boolean
  published: boolean
  key: string
  taxCategory: ProductCategory
  priceMode: string
  createdAt: string
  lastModifiedAt: string
}

export type ProductResponse = {
  limit: number
  offset: number
  count: number
  total: number
  results: Product[] | ProductProjections[]
}

export type Cart = {
  type: string,
  id: string,
  version: number,
  createdAt: string,
  lastModifiedAt: string,
  lastModifiedBy: {
    isPlatformClient: boolean
  },
  createdBy: {
    isPlatformClient: boolean
  },
  lineItems: [],
  cartState: string,
  totalPrice: {
    type: string,
    currencyCode: string,
    centAmount: number,
    fractionDigits: number
  },
  shippingMode: string,
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: string,
  taxMode: string,
  taxRoundingMode: string,
  taxCalculationMode: string,
  refusedGifts: [],
  origin: string,
  itemShippingAddresses: []
}

export type LineItem = {
action: string,
productId: string,
variantId: number,
quantity: number,
supplyChannel: {
  typeId: number,
  id: string
},
// distributionChannel: {
//   typeId: string,
//   id: number
// },
externalTaxRate: {
  name: string,
  amount: number,
  country: string,
  state: string
},
// shippingDetails: {
//   targets: [
//     {
//       addressKey: string,
//       quantity: number
//     }
//   ]
// }
}

export type ChannelResponse = {
limit: number,
offset: number,
count: number,
total: number,
results: Channel[]
}

export type CartResponse = {
limit: number,
offset: number,
count: number,
total: number,
results: Cart[]
}


export type Channel = {
  results: [
    {
      id: string,
      key: string,
      version: number,
      roles: [string],
      createdAt: string,
      lastModifiedAt: string
    },
    {
      id: string,
      key: string,
      version: number,
      roles: [string],
      createdAt: string,
      lastModifiedAt: string
    }
  ]
}
