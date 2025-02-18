import React from "react";
import Product from "./Product";
import { useProductContext } from "../store/contextapi";

const ProductList: React.FC = () => {
  const { sortedProducts, isLoading, error } = useProductContext();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!sortedProducts.length) return <p>No products found.</p>;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
