"use client";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  return (
    <div>
      {favorites?.map((fav) => (
        <>
          <Image
            key={fav.id}
            src={fav.image_urls![0] ?? ""}
            alt={fav.name}
            width={400}
            height={400}
          />
          <div>{fav.name}</div>
        </>
      ))}
    </div>
  );
}
