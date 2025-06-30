import MarketplaceHeader from "./MarketplaceHeader";
import ProductGrid from "./ProductGrid";
import SetLocation from "./SetLocation";

export default function MarketPage() {
  return (
    <>
      {/*TODO: <Toaster /> */}
      <div className="max-w-7xl mx-auto p-4">
        
        <MarketplaceHeader />

        <div className="space-y-4">
          <SetLocation />
          {/* TODO: <CategoriesSection/> */}
          {/* TODO: <SortSelector/> */}
          <ProductGrid />
        </div>

        {/* <CartFooter /> */}

        {/* <CartNotification /> */}
      </div>
    </>
  );
}
