import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("cart", "routes/cart.tsx"),
    route("checkout", "routes/checkout.tsx"),
    route("products", "routes/products._index.tsx"),
    route("products/:id", "routes/products.$id.tsx"),
    route("offline", "routes/offline.tsx"),
  ]),
  route("api/products", "routes/api.products._index.tsx"),
  route("api/products/:id", "routes/api.products.$id.tsx"),
] satisfies RouteConfig;
