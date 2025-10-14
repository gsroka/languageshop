import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();
  return <div className="p-6">📦 Product { id } - Detail Page</div>;
}