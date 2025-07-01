import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";

export default function ProductProjectInfo({ product }: { product: any }) {
  if (!product?.project_id) return null;

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">From Project</h3>
      {product ? (
        <Link
          href={`ProjectProfile?id=${product.id}`}
          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            {product.profile_picture_url ? (
              <Image
                src={product.profile_picture_url}
                alt={product.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-green-600 font-bold">
                {product.name?.[0]}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">
              {product.location?.city}, {product.location?.state_province}
            </p>
          </div>
        </Link>
      ) : (
        <div className="p-3 border rounded-lg bg-gray-50 text-gray-600 flex items-center gap-2">
          <Info className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">
            Project information is currently unavailable.
          </p>
        </div>
      )}
    </div>
  );
}
