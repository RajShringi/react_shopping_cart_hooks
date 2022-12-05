import { useEffect, useState } from "react";
import data from "../data.json";
import DataContext from "../DataContext";
import Cart from "./Cart";
import Products from "./Products";
import Sizes from "./Sizes";
import { AiOutlineShoppingCart } from "react-icons/ai";

const fetchLocalStorageCart = () => {
  return localStorage.cart ? JSON.parse(localStorage.getItem("cart")) : [];
};

function App() {
  const [userSelctedSizes, setUserSelectedSizes] = useState([]);
  const [cart, setCart] = useState(fetchLocalStorageCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchLocalStorageCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleUserSlectedSize = (selectedSize) => {
    if (userSelctedSizes.includes(selectedSize)) {
      setUserSelectedSizes(
        userSelctedSizes.filter((size) => size !== selectedSize)
      );
      return;
    }
    setUserSelectedSizes([...userSelctedSizes, selectedSize]);
  };

  //   Cart Functions
  const addItemtoCart = (id) => {
    const item = data.products.find((item) => item.id === id);
    // if item does not exist inside cart put that in cart or if it does than increase quantity.
    if (cart.findIndex((item) => item.id === id) === -1) {
      setCart([
        ...cart,
        { quantity: 1, size: item.availableSizes[0], ...item },
      ]);
      setIsCartOpen(true);
      return;
    }

    increaseItemQuantity(id);
    setIsCartOpen(true);
  };

  const removeItemfromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseItemQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          item.quantity++;
        }
        return item;
      })
    );
  };

  const decreaseItemQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          item.quantity--;
        }
        return item;
      })
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <DataContext.Provider
      value={{
        products: data.products,
        handleUserSlectedSize,
        userSelctedSizes,
        cart,
        addItemtoCart,
        removeItemfromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        toggleCart,
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start py-8 text-gray-700 relatvie">
        <div
          onClick={toggleCart}
          className="absolute top-0 right-0 bg-gray-800 p-2 rounded-bl-3xl cursor-pointer hover:bg-gray-900"
        >
          <AiOutlineShoppingCart className="text-4xl text-gray-200" />
          <span className="bg-yellow-500 text-gray-800  text-sm rounded-full w-[20px] h-[20px] text-center inline-block absolute bottom-[-10px] right-1 ">
            {cart.reduce((acc, cur) => {
              acc += cur.quantity;
              return acc;
            }, 0)}
          </span>
        </div>

        <Sizes />
        <Products />
        {isCartOpen ? <Cart /> : ""}
      </div>
    </DataContext.Provider>
  );
}

export default App;
