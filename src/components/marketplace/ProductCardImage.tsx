import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface CardImageProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCardImage({ product, onClick }: CardImageProps) {
  return (
    <div className="aspect-[4/3]  relative cursor-pointer overflow-hidden" onClick={onClick}>
      {product.image_urls && product.image_urls[0] ? (
        <Image
          src={product.image_urls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={300}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <ShoppingBag className="h-16 w-16 text-gray-300" />
        </div>
      )}
    </div>
  );
}
