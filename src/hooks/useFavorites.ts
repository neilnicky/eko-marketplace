import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
interface FavoriteItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
}

// Hooks
export const useFavorites = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchUserFavorites,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteToDb,
    onMutate: async (productId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<string[]>([
        "favorites",
      ]);

      // Optimistically update
      queryClient.setQueryData<string[]>(["favorites"], (old) =>
        old ? [...old, productId] : [productId]
      );

      return { previousFavorites };
    },
    onError: (error, productId, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
      console.error("Failed to add favorite:", error);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteFromDb,
    onMutate: async (productId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      // Snapshot previous value
      const previousFavorites = queryClient.getQueryData<string[]>([
        "favorites",
      ]);

      // Optimistically update
      queryClient.setQueryData<string[]>(["favorites"], (old) =>
        old ? old.filter((id) => id !== productId) : []
      );

      return { previousFavorites };
    },
    onError: (error, productId, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
      console.error("Failed to remove favorite:", error);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useToggleFavorite = () => {
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  return {
    toggleFavorite: (productId: string, isFavorite: boolean) => {
      if (isFavorite) {
        removeFavorite.mutate(productId);
      } else {
        addFavorite.mutate(productId);
      }
    },
    isLoading: addFavorite.isPending || removeFavorite.isPending,
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
