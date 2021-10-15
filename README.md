# Bundles Development Accelerator (Custom Applications)

## Installation

Simply run `yarn` from the repository root to install the application's
dependencies.

It is recommended to use the latest version of node.

### Running the Application

At the root of the repository, run `yarn`. To run an application locally, navigate to the application directory and `yarn run start`.
Be sure to deploy the cloud function 'platform-extension-static-bundles'. Please see the README found under the extension package which covers the "Simple Bundles API Extension".
Run terraform against the terraform folder in 'platform-extension-static-bundles' to setup static bundles type definitions and see the sub folder 'dynamic-bundles-definitions' for 
dynamic bundle's terraform folder and type definitions.

### Troubleshooting

#### `graphql_error.invalid_token` error
Log out of [Merchant Center](https://mc.us-central1.gcp.commercetools.com). Log back in, then return to the custom application and reload.

### Do's and Don'ts

* **Don't** use the application login to authenticate. **Do** make sure you are logged in to Merchant Center before developing or running a custom application.
