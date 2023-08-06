import fetch from 'node-fetch';
  import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
  } from '@commercetools/sdk-client-v2';

  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerce_app_sloths',
    credentials: {
      clientId: "xwqO1nzfmYl_5H7Fs9zftimW",
      clientSecret: "rGYBHhNA_Tod_6_liNo1HFko2H3rsLlI",
    },
    scopes: ['create_anonymous_token:ecommerce_app_sloths manage_my_business_units:ecommerce_app_sloths manage_my_quote_requests:ecommerce_app_sloths view_categories:ecommerce_app_sloths manage_my_shopping_lists:ecommerce_app_sloths manage_my_payments:ecommerce_app_sloths manage_my_profile:ecommerce_app_sloths view_published_products:ecommerce_app_sloths manage_my_orders:ecommerce_app_sloths manage_my_quotes:ecommerce_app_sloths'],
    fetch,
  };

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  // Export the ClientBuilder
  export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
