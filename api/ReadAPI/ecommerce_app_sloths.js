import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'

const projectKey = 'ecommerce_app_sloths'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: '3PC_jnfDjaDN8aPsER5hJSj1',
    clientSecret: 'jUPIhXUYss0qZJMb2OhwXcFTGQPpLAQK',
  },
  scopes: ['view_states:ecommerce_app_sloths view_customers:ecommerce_app_sloths view_types:ecommerce_app_sloths view_categories:ecommerce_app_sloths view_stores:ecommerce_app_sloths view_payments:ecommerce_app_sloths view_shipping_methods:ecommerce_app_sloths view_quotes:ecommerce_app_sloths view_quote_requests:ecommerce_app_sloths view_published_products:ecommerce_app_sloths view_standalone_prices:ecommerce_app_sloths view_business_units:ecommerce_app_sloths view_orders:ecommerce_app_sloths view_product_selections:ecommerce_app_sloths view_staged_quotes:ecommerce_app_sloths view_shopping_lists:ecommerce_app_sloths view_order_edits:ecommerce_app_sloths view_associate_roles:ecommerce_app_sloths view_audit_log:ecommerce_app_sloths view_discount_codes:ecommerce_app_sloths view_customer_groups:ecommerce_app_sloths view_project_settings:ecommerce_app_sloths view_connectors_deployments:ecommerce_app_sloths view_connectors:ecommerce_app_sloths view_tax_categories:ecommerce_app_sloths view_cart_discounts:ecommerce_app_sloths view_attribute_groups:ecommerce_app_sloths view_messages:ecommerce_app_sloths view_key_value_documents:ecommerce_app_sloths view_products:ecommerce_app_sloths view_import_containers:ecommerce_app_sloths'],
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})
client.execute({
  uri: `/${projectKey}/products`,
  method: 'GET',
}).then(data => console.log(data.body.results))
