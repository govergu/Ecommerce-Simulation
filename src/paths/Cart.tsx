import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useCartContext } from "../store/cartcontext";
import { MdKeyboardBackspace } from "react-icons/md";

const Cart: React.FC = () => {
  const { state, dispatch } = useCartContext();

  const totalAmount = state.cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <MdKeyboardBackspace
        className="h-8 w-8 cursor-pointer"
        onClick={() => window.history.back()}
      />
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart</h1>

      {state.cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {state.cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600">
                      ${item.product.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item.product.id,
                    })
                  }
                >
                  <FiTrash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Total: ${totalAmount.toFixed(2)}
            </h2>
            <button
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
