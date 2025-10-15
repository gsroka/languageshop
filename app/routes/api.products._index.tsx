import type { LoaderFunctionArgs } from "react-router";
import { getProducts } from "~/mocks/data/products";

/**
 * Product List API Route
 * @param request
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const products = await getProducts();
  return products;
}