"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_client_1 = require("@commercetools/sdk-client");
var sdk_middleware_auth_1 = require("@commercetools/sdk-middleware-auth");
var sdk_middleware_http_1 = require("@commercetools/sdk-middleware-http");
var projectKey = 'ecommerce_app_sloths';
var authMiddleware = (0, sdk_middleware_auth_1.createAuthMiddlewareForClientCredentialsFlow)({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
        clientId: 'xwqO1nzfmYl_5H7Fs9zftimW',
        clientSecret: 'rGYBHhNA_Tod_6_liNo1HFko2H3rsLlI',
    },
    scopes: ['create_anonymous_token:ecommerce_app_sloths manage_my_business_units:ecommerce_app_sloths manage_my_quote_requests:ecommerce_app_sloths view_categories:ecommerce_app_sloths manage_my_shopping_lists:ecommerce_app_sloths manage_my_payments:ecommerce_app_sloths manage_my_profile:ecommerce_app_sloths view_published_products:ecommerce_app_sloths manage_my_orders:ecommerce_app_sloths manage_my_quotes:ecommerce_app_sloths'],
});
var httpMiddleware = (0, sdk_middleware_http_1.createHttpMiddleware)({
    host: 'https://api.europe-west1.gcp.commercetools.com',
});
var client = (0, sdk_client_1.createClient)({
    middlewares: [authMiddleware, httpMiddleware],
});
client.execute({
    uri: "/".concat(projectKey, "/categories"),
    method: 'GET',
}).then(function (data) { return console.log(data.body.results); });
