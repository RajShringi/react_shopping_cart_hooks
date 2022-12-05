import { useContext } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import DataContext from "../DataContext";
import { motion } from "framer-motion";

function Cart() {
  const {
    cart,
    removeItemfromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    toggleCart,
  } = useContext(DataContext);

  const getSubTotal = () => {
    const subtotal = cart.reduce((acc, cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    }, 0);
    return subtotal.toFixed(2);
  };

  const handleCheckout = () => {
    alert(`Checkout: SubTotal: ${getSubTotal()}`);
  };

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 fixed top-0 right-0 w-[90%] bottom-0 text-gray-200 flex justify-between flex-col md:w-[30%]"
    >
      {/* Cart Header */}
      <div className="flex justify-center items-center p-4">
        <div className="relative mr-8">
          <AiOutlineShoppingCart className="text-4xl" />
          <span className="bg-yellow-500 text-gray-800  text-sm rounded-full w-[20px] h-[20px] text-center inline-block absolute bottom-[-8px] right-[-7px] ">
            {cart.reduce((acc, cur) => {
              acc += cur.quantity;
              return acc;
            }, 0)}
          </span>
        </div>
        <h2 className="text-gray-100 font-bold">Cart</h2>
      </div>

      {/* Cart Body */}
      <div className="overflow-y-scroll">
        {cart.length === 0 ? (
          <div className="p-4 text-center">
            <p className="font-light text-lg">Add some products in the cart</p>
            <p className="font-light">{":)"}</p>
          </div>
        ) : (
          <div className="p-4">
            {cart.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-4 border-t border-gray-700"
                >
                  <div className="basis-[20%]">
                    <img
                      src={`static/products/${product.sku}_2.jpg`}
                      alt={product.title}
                    />
                  </div>
                  <div className="basis-[50%]">
                    <p>{product.title}</p>
                    <p className="font-thin text-gray-300">
                      {product.size} | {product.style}
                    </p>
                    <p className="font-thin text-gray-300">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <div className="basis-[20%] text-right">
                    <div className="flex justify-end">
                      <button onClick={() => removeItemfromCart(product.id)}>
                        <AiOutlineClose />
                      </button>
                    </div>
                    <p className="text-yellow-500 my-4">$ {product.price}</p>
                    <div className="flex justify-around items-center">
                      <button
                        onClick={() => decreaseItemQuantity(product.id)}
                        className={`py-1 px-3 ${
                          product.quantity < 2
                            ? "bg-gray-800 hover:bg-gray-800"
                            : "bg-gray-900 hover:bg-gray-700"
                        }`}
                        disabled={product.quantity < 2 ? true : false}
                      >
                        <AiOutlineMinus />
                      </button>
                      <button
                        onClick={() => increaseItemQuantity(product.id)}
                        className="bg-gray-900 py-1 px-3 hover:bg-gray-700"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      <div className="p-4 shadow-[0_-6px_4px_0px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center text-xl">
          <p className="uppercase font-extralight">subtotal</p>
          <p className="text-yellow-500">${getSubTotal()}</p>
        </div>
        <div className="text-center mt-16">
          <button
            onClick={handleCheckout}
            className="uppercase bg-gray-900 py-4 w-full hover:bg-gray-700 transition-all"
          >
            checkout
          </button>
        </div>
      </div>
      <div className="absolute left-[-40px] bg-gray-800 py-2 px-4">
        <button onClick={toggleCart} className="font-bold text-lg">
          <AiOutlineClose />
        </button>
      </div>
    </motion.div>
  );
}
export default Cart;
