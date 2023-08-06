import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

const projectKey = 'ecommerce_app_sloths'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'xwqO1nzfmYl_5H7Fs9zftimW',
    clientSecret: 'rGYBHhNA_Tod_6_liNo1HFko2H3rsLlI',
  },
  scopes: ['create_anonymous_token:ecommerce_app_sloths manage_my_business_units:ecommerce_app_sloths manage_my_quote_requests:ecommerce_app_sloths view_categories:ecommerce_app_sloths manage_my_shopping_lists:ecommerce_app_sloths manage_my_payments:ecommerce_app_sloths manage_my_profile:ecommerce_app_sloths view_published_products:ecommerce_app_sloths manage_my_orders:ecommerce_app_sloths manage_my_quotes:ecommerce_app_sloths'],
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

client.execute({
  uri: `/${projectKey}/categories`,
  method: 'GET',
}).then(data => console.log(data.body.results))
