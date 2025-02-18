import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductType } from "../type";
import { MdKeyboardBackspace } from "react-icons/md";
import { useCartContext } from "../store/cartcontext";

// Updated: Ensure proper typing for the product data passed via state.
const Overview: React.FC = () => {
  const location = useLocation();
  const product: ProductType = location.state?.product;

  const { dispatch } = useCartContext();
  const [notification, setNotification] = useState<string | null>(null);

  // Early return if product is not found.
  if (!product) {
    return (
      <p className="text-center text-gray-500 text-lg">
        No product data available.
      </p>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    setNotification(`${product.title} has been added to your cart!`);

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <MdKeyboardBackspace
        className="h-8 w-8 cursor-pointer text-gray-700"
        onClick={() => window.history.back()}
      />

      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg text-lg">
          <p>{notification}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1">
          <div className="relative mb-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                -{product.discountPercentage}%
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-md hover:opacity-75 transition duration-200"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600">{product.description}</p>

          <div className="flex items-center gap-6">
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            {product.discountPercentage > 0 && (
              <p className="text-sm line-through text-gray-500">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            )}
            <p
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
          </div>

          {/* Shipping and Warranty Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Shipping Information
            </h3>
            <p className="text-sm text-gray-600">
              {product.shippingInformation}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Warranty
            </h3>
            <p className="text-sm text-gray-600">
              {product.warrantyInformation}
            </p>
          </div>

          {/* Weight Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Weight</h3>
            <p className="text-sm text-gray-600">{product.weight} kg</p>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              className="w-full bg-amber-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-amber-500 transition duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
        {product.reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
            <p className="font-bold text-gray-800">{review.reviewerName}</p>
            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
            <p className="text-sm text-yellow-500 mt-2">
              Rating: {review.rating}⭐
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
