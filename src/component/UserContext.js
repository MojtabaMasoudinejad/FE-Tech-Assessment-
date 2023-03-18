import { createContext, useState } from "react";
import { useEffect } from "react";
import { useSessionStorage } from "../hook/useSessionStorage";
import styled, { keyframes } from "styled-components";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

export const UserContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export const UserProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [cartProducts, setCartProducts] = useSessionStorage("cart", []);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  useEffect(() => {
    fetch(
      "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6"
    )
      .then((res) => res.json())
      .then((data) => {
        setProductData(data.data.products);
      });
  }, []);
  if (!productData) {
    return (
      <div>
        {" "}
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </div>
    );
  }

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  };

  const deleteFromCart = (id) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  };

  console.log(cartProducts);

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      return productData.map((item) => {
        if (item._id === cartItem.id) {
          console.log(cartItem.quantity);
          console.log(item.retailPrice);
          return (totalCost += item.retailPrice * cartItem.quantity);
        }
      });
    });
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  top: 40px;
  left: 180px;
`;
