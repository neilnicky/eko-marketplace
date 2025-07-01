import { Product } from "@/types/product";

interface PriceDisplayProps {
  product: Product;
}

export default function ProductPriceDisplay({ product }: PriceDisplayProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-bold text-primary">
        <span className="font-normal text-sm">R$</span>{" "}
        {Number(product.price).toFixed(2)}
        {product.measurement_unit && (
          <span className="text-xs text-muted-foreground font-normal">
            {" "}
            / {product.measurement_unit}
          </span>
        )}
      </span>
    </div>
  );
}
