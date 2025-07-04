"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryFilters } from "@/constants/categoryFilters";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useProductForm } from "@/hooks/useProductForm";
import { useUserProjects } from "@/hooks/useProject";
import { resetProductState } from "@/store/slices/productCreation";
import { Info, Loader2, Mail, Phone, Save, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

export default function AddProductPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // TanStack Query hooks
  const { data: userProjects = [], isLoading: projectsLoading } =
    useUserProjects();
  const productCategories = categoryFilters;

  // Form logic
  const {
    form,
    handleSubmit,
    isSubmitting,
    errors,
    canSubmit,
    watchedCategory,
    isUnlimitedStock,
    agreedToTerms,
    agreedToContact,
    handleUnlimitedStockChange,
    setAgreedToTerms,
    setAgreedToContact,
  } = useProductForm();

  const { register, control, watch } = form;

  // Watch name and description for character count
  const watchedName = watch("name");
  const watchedDescription = watch("description");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetProductState());
    };
  }, [dispatch]);

  if (projectsLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Add a New Product
          </CardTitle>
          <CardDescription>
            Share what your project has to offer to the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Selection */}
            <div>
              <Label htmlFor="project_id">Belongs to Project *</Label>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {userProjects.map((proj) => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project_id && (
                <p className="text-xs text-destructive mt-1">
                  {errors.project_id.message}
                </p>
              )}
            </div>

            {/* Product Name */}
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                {...register("name")}
                maxLength={40}
                className={errors.name ? "border-destructive" : ""}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground ml-auto">
                  {watchedName?.length || 0}/40
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={4}
                maxLength={300}
                className={errors.description ? "border-destructive" : ""}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground ml-auto">
                  {watchedDescription?.length || 0}/300
                </p>
              </div>
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((cat, i) => (
                        <SelectItem key={`${i} ${cat.value}`} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-destructive mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (R$) *</Label>
                <Input
                  id="price"
                  {...register("price")}
                  type="number"
                  step="0.01"
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="measurement_unit">Unit of Measure *</Label>
                <Input
                  id="measurement_unit"
                  {...register("measurement_unit")}
                  placeholder="e.g., kg, unit, box"
                  className={
                    errors.measurement_unit ? "border-destructive" : ""
                  }
                />
                {errors.measurement_unit && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.measurement_unit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock">Stock Quantity *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="stock"
                  {...register("stock")}
                  type="number"
                  disabled={isUnlimitedStock}
                  className={`flex-grow ${
                    errors.stock ? "border-destructive" : ""
                  }`}
                />
                {watchedCategory === "digital" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unlimited-stock"
                      checked={isUnlimitedStock}
                      onCheckedChange={handleUnlimitedStockChange}
                    />
                    <Label htmlFor="unlimited-stock">Unlimited</Label>
                  </div>
                )}
              </div>
              {errors.stock && (
                <p className="text-xs text-destructive mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            {/* Shipping */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Shipping Calculation</AlertTitle>
                  <AlertDescription>
                    Shipping costs are calculated at checkout via our
                    integration with Correios. You can add a base handling fee
                    below if needed.
                  </AlertDescription>
                </Alert>
                <div>
                  <Label htmlFor="shipping_cost">
                    Base Shipping / Handling Fee (R$)
                  </Label>
                  <Input
                    id="shipping_cost"
                    {...register("shipping_cost")}
                    type="number"
                    step="0.01"
                    placeholder="Enter 0 if no extra fees"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <div>
              <Label>Product Images</Label>
              {/* <ImageUploader 
                onUrlsChange={(urls) => setValue('image_urls', urls, { shouldValidate: true })} 
              /> */}
            </div>

            {/* Seller Agreement */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />
                  Seller Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 rounded-md border p-4">
                  <h4 className="font-medium">
                    Contact Information for this product
                  </h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> {user?.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />{" "}
                    {user?.phone || "No phone number on profile"}
                  </p>
                  <p className="text-xs text-muted-foreground pt-2">
                    This information will be used for customer service
                    inquiries. You can update it in your profile settings.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={setAgreedToTerms}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Product Responsibility
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I hereby certify that all information provided is
                      accurate. I assume full responsibility for the quality,
                      safety, and delivery of the product as described, in
                      compliance with all applicable laws and platform policies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="contact-consent"
                    checked={agreedToContact}
                    onCheckedChange={setAgreedToContact}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="contact-consent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Consent to be Contacted
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I agree to be contacted by Ekonavi and potential customers
                      regarding this product using my account&apos;s contact
                      information, as this is necessary for order fulfillment
                      and customer service.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Add Product
              </Button>
            </div>
            {!canSubmit && (
              <p className="text-xs text-destructive text-right">
                You must agree to the terms to add a product.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
