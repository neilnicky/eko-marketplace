import { mockProducts } from "@/mockData/products";
import { Product } from "@/types/product";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // queryClient.invalidateQueries({ queryKey: ["userProjects"] });
    },
  });
};

// Mock API function

const PAGE_SIZE = 10;

const fetchProducts = async ({
  pageParam = 0,
}): Promise<{ data: Product[]; nextCursor: number | null }> => {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const data = mockProducts.slice(start, end);
  const nextCursor = end < mockProducts.length ? pageParam + 1 : null;

  return { data, nextCursor };
};

const fetchProduct = async (productId: string): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would be a direct database/API call
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createProduct = async (productData): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return productData;
};
