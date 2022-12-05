import { useContext, useState } from "react";
import DataContext from "../DataContext";
import { motion } from "framer-motion";

const getUniqueSizes = (products) => {
  const allSizes = [];
  products.forEach((item) => {
    item.availableSizes.forEach((size) => {
      if (!allSizes.includes(size)) {
        allSizes.push(size);
      }
    });
  });
  return allSizes;
};

function Sizes() {
  const { products, handleUserSlectedSize, userSelctedSizes } =
    useContext(DataContext);
  const [sizes, setSizes] = useState(getUniqueSizes(products));

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: "0" }}
      transition={{ duration: 1.2 }}
      className="basis-[100%] mx-auto md:basis-[15%] p-4"
    >
      <h4 className="mb-5 font-semibold">Sizes:</h4>
      <div className="grid grid-cols-4  gap-4 text-xs font-light">
        {sizes.map((size) => {
          return (
            <motion.button
              whileHover={{ scale: 1.2 }}
              animate={{
                background: userSelctedSizes.includes(size)
                  ? "rgb(250 204 21)"
                  : "rgb(229 229 229)",
              }}
              key={size}
              className={`h-[35px] w-[35px] p-1 rounded-full bg-neutral-200`}
              onClick={() => handleUserSlectedSize(size)}
            >
              {size}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Sizes;
