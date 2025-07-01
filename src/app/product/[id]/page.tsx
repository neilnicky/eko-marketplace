"use client";

import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <div>Loading product...</div>;
  }
  if (error) {
    return <div>Error loading product</div>;
  }

  return (
    <div>
      <Image
        alt={product?.name ?? ""}
        src={product?.image_urls[0] ?? "/assets/ekomart_logo.png"}
        width={400}
        height={400}
      />
      <div className="text-4xl">{product?.name}</div>
    </div>
  );
}
