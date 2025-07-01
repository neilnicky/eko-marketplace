import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function ProductImages({
  images = [],
  name,
}: {
  images: string[] ;
  name: string ;
}) {
  if (!images.length) {
    return (
      <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Image
        src={images[0]}
        alt={name ?? ""}
        className="w-full h-80 object-cover rounded-lg"
        width={400}
        height={400}
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`${name} ${index + 2}`}
              className="w-full h-20 object-cover rounded"
              width={400}
              height={400}
            />
          ))}
        </div>
      )}
    </div>
  );
}
