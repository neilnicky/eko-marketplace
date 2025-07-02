import { useMutation } from "@tanstack/react-query";
import { request } from "graphql-request";

const endpoint = "/api/graphql";

export const useUpdateCartItem = () =>
  useMutation({
    mutationFn: async ({
      productId,
      quantity,
      price,
    }: {
      productId: string;
      quantity: number;
      price: number;
    }) => {
      const mutation = `
          mutation UpdateCartItem($productId: ID!, $quantity: Int!, $price: Float!) {
            updateCartItem(productId: $productId, quantity: $quantity, price: $price) {
              success
            }
          }
        `;
        console.log("added to db cart")
      return request(endpoint, mutation, { productId, quantity, price });
    },
  });

export const useRemoveCartItem = () =>
  useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const mutation = `
          mutation RemoveCartItem($productId: ID!) {
            removeCartItem(productId: $productId) {
              success
            }
          }
        `;
      return request(endpoint, mutation, { productId });
    },
  });
