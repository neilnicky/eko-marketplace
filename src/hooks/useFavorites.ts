import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "./reduxHooks";

export const useFavorites = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    enabled: isAuthenticated, 
    queryFn: fetchUserFavorites,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const toggleFavorite = useMutation({
    mutationFn: toggleFavoriteInDb,
    onMutate: async ({
      productId,
      action,
    }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const prev = queryClient.getQueryData<string[]>(["favorites"]);
      queryClient.setQueryData<string[]>(["favorites"], (old = []) => {
        if (action === "add") {
          return old.includes(productId) ? old : [...old, productId];
        }
        return old.filter((id) => id !== productId);
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
    favoritesQuery.data?.includes(productId) ?? false;

  return {
    isFavorite,
    toggleFavorite,
    favorites: favoritesQuery.data,
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error,
    isToggling: toggleFavorite.isPending,
  };
};

async function fetchUserFavorites(): Promise<string[]> {
  const res = await fetch("/api/favorites");
  if (!res.ok) throw new Error("Failed to fetch favorites");
  const data = await res.json();
  return data.map((f: any) => f.productId);
}

async function toggleFavoriteInDb({
  productId,
  action,
}: {
  productId: string;
  action: "add" | "remove";
}) {
  const url =
    action === "add" ? "/api/favorites" : `/api/favorites/${productId}`;
  const method = action === "add" ? "POST" : "DELETE";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(action === "add" && { body: JSON.stringify({ productId }) }),
  });

  if (!res.ok) throw new Error(`Failed to ${action} favorite`);
}
