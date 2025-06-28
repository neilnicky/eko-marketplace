import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
interface FavoriteItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
}

export const useFavorites = (productId?: string, enabled: boolean = true) => {
  const queryClient = useQueryClient();

  // Query to fetch all favorites
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchUserFavorites,
    enabled,
    staleTime: 5 * 60 * 1000, // 5m
    gcTime: 10 * 60 * 1000, // 10m
  });

  // Mutation to add favorite
  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteToDb,
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites = queryClient.getQueryData<string[]>([
        "favorites",
      ]);

      queryClient.setQueryData<string[]>(["favorites"], (old) =>
        old ? [...old, productId] : [productId]
      );

      return { previousFavorites };
    },
    onError: (error, productId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
      console.error("Failed to add favorite:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Mutation to remove favorite
  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavoriteFromDb,
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites = queryClient.getQueryData<string[]>([
        "favorites",
      ]);

      queryClient.setQueryData<string[]>(["favorites"], (old) =>
        old ? old.filter((id) => id !== productId) : []
      );

      return { previousFavorites };
    },
    onError: (error, productId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
      console.error("Failed to remove favorite:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Get favorite status for specific product
  const isFavorite = productId
    ? favoritesQuery.data?.includes(productId) ?? false
    : false;

  return {
    addFavorite: addFavoriteMutation,
    removeFavorite: removeFavoriteMutation,
    isFavorite,
    favorites: favoritesQuery.data,
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error,
  };
};

// API functions
const fetchUserFavorites = async (): Promise<string[]> => {
  const response = await fetch("/api/favorites");

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const favorites: FavoriteItem[] = await response.json();
  return favorites.map((fav) => fav.productId);
};

const addFavoriteToDb = async (productId: string): Promise<void> => {
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }
};

const removeFavoriteFromDb = async (productId: string): Promise<void> => {
  const response = await fetch(`/api/favorites/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }
};
