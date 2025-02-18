import { useQuery } from "@tanstack/react-query";
import { getproducts } from "../services/api";
import { ProductType } from "../type";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// Define the context type properly
interface ProductContextType {
  products: ProductType[];
  sortedProducts: ProductType[];
  sortCategory: string;
  setSortCategory: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: Error | null;
}

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isLoading, error } = useQuery<{ products: ProductType[] }>({
    // ✅ Expect an object with `products`
    queryKey: ["products"],
    queryFn: getproducts,
  });

  const products = data?.products || []; // ✅ Extract the actual product array

  const [sortCategory, setSortCategory] = useState<string>("all");
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(
    products || []
  );

  useEffect(() => {
    if (products.length === 0) {
      setSortedProducts([]); // ✅ Reset when no products are available
      return;
    }

    let sorted = products;
    if (sortCategory !== "all") {
      sorted = products.filter((product) => product.category === sortCategory);
    }

    setSortedProducts(sorted);
  }, [products, sortCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        sortedProducts,
        sortCategory,
        setSortCategory,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProductContext = (): ProductContextType => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
