// export type TokenResponse = {
//     access_token: string
//     token_type: string
//     expires_in: number
//     scope: string
// }

export type CategoryResponse = {
    limit: number
    offset: number
    count: number
    total: number
    results: Category[]
}

type Category = {
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
