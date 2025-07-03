import { mockFavorites } from "@/mockData/products";
import { Product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavorites = () => {
  // const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    enabled: true, //should run only if isAuthenticated 
    queryFn: fetchUserFavorites,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const toggleFavorite = useMutation({
    mutationFn: toggleFavoriteInDb,
    onMutate: async ({ product, action }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });


      const prev = queryClient.getQueryData<Product[]>(["favorites"]);

      queryClient.setQueryData<Product[]>(["favorites"], (old = []) => {
        if (action === "add") {
          return old.find((p) => p.id === product.id) ? old : [...old, product];
        }
        return old.filter((p) => p.id !== product.id);
      });

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["favorites"], ctx.prev);
      }
      console.error("Failed to toggle favorite:", _err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorite = (productId: string): boolean =>
    favoritesQuery.data?.some((p) => p.id === productId) ?? false;

  return {
    isFavorite,
    toggleFavorite,
    favorites: favoritesQuery.data,
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error,
    isToggling: toggleFavorite.isPending,
  };
};

async function fetchUserFavorites(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockFavorites;
}

async function toggleFavoriteInDb({
  product,
  action,
}: {
  product: Product;
  action: "add" | "remove";
}) {
  const url =
    action === "add" ? "/api/favorites" : `/api/favorites/${product.id}`;
  const method = action === "add" ? "POST" : "DELETE";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(action === "add" && {
      body: JSON.stringify({ productId: product.id }),
    }),
  });

  if (!res.ok) throw new Error(`Failed to ${action} favorite`);
}
