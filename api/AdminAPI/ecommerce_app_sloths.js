
import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

const projectKey = 'ecommerce_app_sloths'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'dfl2XWxHLbWwv8yU8bYwctWO',
    clientSecret: 'rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW',
  },
  scopes: ['manage_project:ecommerce_app_sloths'],
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})
client.execute({
  uri: `/${projectKey}/orders`,
  method: 'GET',
}).then(data => console.log(data.body.results))
