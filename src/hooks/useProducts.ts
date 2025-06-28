import { mockProducts } from "@/mockData/products";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Mock API function
const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockProducts;
};

const fetchProduct = async (productId: string): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const products = await fetchProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
