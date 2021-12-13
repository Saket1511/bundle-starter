import { integrationTestProduct } from "../product-types";

const name = "pants-tax";

export const pantsTax = {
  key: name,
  name: {
    en: name,
  },
  productType: { typeId: "product-type", key: integrationTestProduct.key },
  slug: {
    en: name,
  },
  taxCategory: {
    typeId: "tax-category",
    key: "integration-no-tax-usa",
  },
  masterVariant: {
    sku: name,
    prices: [
      {
        value: {
          centAmount: 5500,
          currencyCode: "USD",
        },
      },
    ],
    attributes: [
      { name: "class", value: "Cotton Blend Pants" },
      { name: "department", value: "mens" },
    ],
  },
  publish: true,
};
export default pantsTax;