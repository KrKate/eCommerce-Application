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
      clientId: "dfl2XWxHLbWwv8yU8bYwctWO",
      clientSecret: "rsHEEwEvL3-cpCElTgirDd7Pep8HjTwW",
    },
    scopes: ['manage_project:ecommerce_app_sloths'],
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