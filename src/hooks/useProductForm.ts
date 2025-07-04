import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { useCreateProduct } from "./useProducts";
import {
  resetProductState,
  setAgreedToContact,
  setAgreedToTerms,
  setUnlimitedStock,
} from "@/store/slices/productCreation";
import { toast } from "sonner";
import { productFormSchema } from "@/schemas/productFormSchema";

const defaultValues = {
  project_id: "",
  name: "",
  description: "",
  category: "",
  price: "",
  measurement_unit: "",
  stock: "",
  shipping_cost: "0",
  image_urls: [],
};

export const useProductForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isUnlimitedStock, agreedToTerms, agreedToContact } = useAppSelector(
    (state) => state.product
  );
  const createProductMutation = useCreateProduct();

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange", // Validate on change for better UX
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const watchedCategory = watch("category");

  // Handle unlimited stock toggle
  const handleUnlimitedStockChange = (checked) => {
    dispatch(setUnlimitedStock(checked));
    if (checked) {
      setValue("stock", "999999", { shouldValidate: true });
    } else {
      setValue("stock", "", { shouldValidate: true });
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!agreedToTerms || !agreedToContact) {
      toast.error("Please agree to the terms to continue");
      return;
    }

    try {
      const submitData = {
        ...data,
        price: parseFloat(data.price),
        stock: isUnlimitedStock ? 999999 : parseInt(data.stock),
        shipping_cost: parseFloat(data.shipping_cost) || 0,
      };

      await createProductMutation.mutateAsync(submitData);

      console.log("Submitted Product data:", data);

      toast.success("Product added successfully!");
      reset();
      dispatch(resetProductState());
      router.push("/market");
    } catch (error) {
      toast.error(error.message || "Failed to add product");

      // Handle server-side validation errors
      if (error.details) {
        Object.entries(error.details).forEach(([field, message]) => {
          form.setError(field, { message });
        });
      }
    }
  };

  // Computed values
  const canSubmit = agreedToTerms && agreedToContact && !isSubmitting;

  return {
    form,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    errors,
    canSubmit,
    watchedCategory,
    isUnlimitedStock,
    agreedToTerms,
    agreedToContact,
    handleUnlimitedStockChange,
    setAgreedToTerms: (checked) => dispatch(setAgreedToTerms(checked)),
    setAgreedToContact: (checked) => dispatch(setAgreedToContact(checked)),
  };
};
