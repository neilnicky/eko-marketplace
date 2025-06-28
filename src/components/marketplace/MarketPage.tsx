import MarketplaceHeader from "./MarketplaceHeader";
import ProductGrid from "./ProductGrid";

export default function MarketPage() {
  return (
    <>
      {/*TODO: <Toaster /> */}
      <div className="max-w-7xl mx-auto p-4">
        {/* TODO: showCepModal ? <CEPModal/> */}
        {/* TODO: sharingProducts && showQrModal ? <QRModal/> */}

        <MarketplaceHeader />

        <div className="space-y-4">
          {/* TODO: <SetLocation/> */}
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
