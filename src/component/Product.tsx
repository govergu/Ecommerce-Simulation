import React from "react";
import { ProductType } from "../type";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleProductView = () => {
    navigate("/overview", { state: { product } });
  };

  return (
    <div
      className="group relative cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
      onClick={handleProductView}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-60 object-cover rounded-md transition duration-300 group-hover:opacity-80"
        />
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-md font-semibol-d text-gray-900">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">⭐ {product.rating} / 5</p>
          <p className="text-xs mt-1 text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
        </div>

        {/* Price Section */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
          {product.discountPercentage > 0 && (
            <p className="text-xs line-through text-gray-500">
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
