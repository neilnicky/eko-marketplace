import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useCartQuantityHandler } from "@/hooks/useCartQuantityHandler";
import { toggleFavoriteRedux } from "@/store/slices/favorites";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";
import CartControls from "../cart/CartControls";
import { Card, CardContent } from "../ui/card";
import ProductCardHeaderActions from "./ProductCardHeaderActions";
import ProductCardImage from "./ProductCardImage";
import ProductInfo from "./ProductCardInfo";
import ProductPriceDisplay from "./ProductCardPrice";

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isToggling?: boolean;
}

export default function ProductCard({
  product,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
  isToggling = false,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(
    (state: RootState) => state.cart.items[product.id]?.quantity || 0
  );
  const isReduxFavorite = useAppSelector((state: RootState) =>
    state.favorites.items.includes(product.id)
  );
  const displayFavoriteStatus = isAuthenticated ? isFavorite : isReduxFavorite;

  const {handleQuantityChange} = useCartQuantityHandler(product, cartQuantity);

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      dispatch(toggleFavoriteRedux(product.id));
      return;
    }

    dispatch(toggleFavoriteRedux(product.id));
    onToggleFavorite();
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group relative cursor-pointer pt-0">
      <ProductCardHeaderActions
        product={product}
        isAuthenticated={isAuthenticated}
        isFavorite={displayFavoriteStatus}
        onToggleFavorite={handleToggleFavorite}
        isToggling={isToggling}
      />

      <div className="flex-1 flex flex-col">
        <ProductCardImage product={product} />

        <CardContent className="p-4 flex-grow flex flex-col">
          <ProductInfo product={product} />

          <div className="mt-auto space-y-2">
            <ProductPriceDisplay product={product} />
            <CartControls
              product={product}
              quantity={cartQuantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
