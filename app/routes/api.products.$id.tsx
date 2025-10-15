import type { LoaderFunctionArgs } from "react-router";
import { getProductById } from "~/mocks/data/products";

/**
 * Product Detail API Route
 * @param params
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response("Product ID is required", { status: 400 });
  }

  const product = await getProductById(id);
  
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return product;
}