import { useContext, useState } from "react";
import DataContext from "../DataContext";
import { motion } from "framer-motion";

function Products() {
  const { products, userSelctedSizes, addItemtoCart } = useContext(DataContext);
  const [selectedOrder, setSelectedOrder] = useState("");

  let filterProducts =
    userSelctedSizes.length !== 0
      ? products.filter((item) =>
          item.availableSizes.some((size) => userSelctedSizes.includes(size))
        )
      : products;

  const handleOrderProducts = (selectedOrder, products) => {
    if (selectedOrder === "Highest to lowest") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return [...products].sort((a, b) => a.price - b.price);
  };

  filterProducts = handleOrderProducts(selectedOrder, filterProducts);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: "0" }}
      transition={{ duration: 1 }}
      className="w-full md:basis-[80%] p-4"
    >
      <div className="flex justify-between items-center mb-8">
        <p>{filterProducts.length} Product(s) found</p>
        <select
          onChange={(e) => setSelectedOrder(e.target.value)}
          className="outline-none border p-1 rounded-md"
        >
          <option value="Lowest to highest">Lowest to highest</option>
          <option value="Highest to lowest">Highest to lowest</option>
        </select>
      </div>
      <div className="basis-[100%] grid grid-cols-2 place-content-center md:basis-[80%] md:grid-cols-4 gap-8">
        {filterProducts.map((product) => {
          return (
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="hover:shadow-md cursor-pointer group relative"
              key={product.id}
            >
              <div className="mb-1">
                <img
                  className="w-full"
                  src={`/static/products/${product.sku}_1.jpg`}
                  alt={product.title}
                />
              </div>
              <div className="text-center bg-white">
                <h2 className="h-8">{product.title}</h2>
                <span className="inline-block w-[40px] h-[2px] bg-yellow-300 my-4"></span>
                <p className="mb-6 leading-3">
                  $<span className="font-bold text-2xl">{product.price}</span>{" "}
                  <br />
                  <span className="text-gray-400">
                    or {product.installments} x $
                    {(product.price / product.installments).toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => addItemtoCart(product.id)}
                  className="bg-gray-800 text-slate-200 w-full font-light py-4 transition-all group-hover:bg-yellow-500"
                >
                  Add To Cart
                </button>
              </div>
              <div className="absolute top-0 right-0">
                {product.isFreeShipping && (
                  <span className="inline-block text-[.6rem] bg-gray-800 text-gray-200 p-1">
                    Free Shipping
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
export default Products;
