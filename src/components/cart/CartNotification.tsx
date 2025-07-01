import { Check, X } from "lucide-react";
import React, { useEffect } from "react";

export default function CartNotification({ product, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show || !product) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-2">
        <Check className="h-5 w-5" />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm opacity-90">Added to cart!</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-full hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
