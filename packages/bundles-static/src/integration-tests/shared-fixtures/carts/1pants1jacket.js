import { pants, jacket } from "../products";
import { defaultCart } from "./defaultCart";

export const cart1pants1jacket = {
  ...defaultCart,
  // key: "cart1pants1jacket",
  lineItems: [
    {
      sku: pants.masterVariant.sku,
      quantity: 1,
    },
    {
      sku: jacket.masterVariant.sku,
      quantity: 1,
    },
  ],
};
export default cart1pants1jacket;
