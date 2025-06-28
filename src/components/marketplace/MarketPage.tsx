"use client";

import MarketplaceHeader from "./MarketplaceHeader";

export default function MarketPage() {
  return (
    <>
      {/* TODO: Toaster */}
      <div className="max-w-7xl mx-auto py-4">
        {/* TODO: showCepModal ? <CEPModal/> */}
        {/* TODO: sharingProducts && showQrModal ? <QRModal/> */}

        <MarketplaceHeader />

        <div className="space-y-4">
          {/* TODO: <SetLocation/> */}
          {/* TODO: <CategoriesSection/> */}
          {/* TODO: <SortSelector/> */}
          {/* TODO: <ProductGrid/> */}
        </div>

        {/* <CartFooter /> */}

        {/* <CartNotification /> */}
      </div>
    </>
  );
}
