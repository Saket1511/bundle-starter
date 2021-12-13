import { integrationTestProduct } from "../product-types";

const name = "belt-tax";

export const beltTax = {
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
          centAmount: 1000,
          currencyCode: "USD",
        },
      },
    ],
    attributes: [
      { name: "class", value: "Belts" },
      { name: "department", value: "mens" },
    ],
  },
  publish: true,
};
export default beltTax;