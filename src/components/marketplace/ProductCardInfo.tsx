import { Product } from "@/types/product";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ProductInfoProps {
  product: Product;
}
export default function ProductInfo({ product }: ProductInfoProps) {
  const showLowStockWarning =
    product.stock !== undefined && product.stock <= 10 && product.stock > 0;

  return (
    <div className="flex-1 mb-2">
      <Link
        href={`/product/${product.id}`}
        className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight h-10 mb-1"
      >
        {product.name}
      </Link>
      {showLowStockWarning && (
        <div className="text-xs text-orange-600 mt-1 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          <span>Low stock</span>
        </div>
      )}
    </div>
  );
}
