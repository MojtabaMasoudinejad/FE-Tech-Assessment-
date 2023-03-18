import styled, { keyframes } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useMediaQuery } from "react-responsive";

import pic from "../assets/pic.png";

import { SlBasketLoaded } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

const Products = () => {
  const [productData, setProductData] = useState(null);
  const cart = useContext(UserContext);
  const SpinnerIcon = withBaseIcon({ size: 50 });

  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });

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
        <Spinner>
          <SpinnerIcon icon={spinner3} />
        </Spinner>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "Row",
        alignItems: isMobile ? "center" : "",
      }}
    >
      <img
        src={pic}
        alt="le Canape Vert"
        width="300px"
        height="605px"
        style={{ marginRight: "10px" }}
      />
      <DivProducts
        style={{ display: isMobile ? "" : "flex", marginTop: "5px" }}
      >
        {productData.map((item, index) => {
          return (
            <DivItem key={index} style={{ width: "300px", height: "320px" }}>
              <a href={`/${item._id}`}>
                <img
                  src={item.imageURLs[0]}
                  alt="itemPhoto"
                  width="200px"
                  height="200px"
                  style={{ marginRight: "10px" }}
                />
              </a>
              <div>
                <div style={{ marginBottom: "5px" }}>
                  {item.fulhausProductName}
                </div>
                <div style={{ marginBottom: "5px" }}>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => {
                      return <FaStar key={index} color="orange" />;
                    })}
                </div>
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <DivPrice>
                    <BsCurrencyDollar />
                    {item.retailPrice}
                  </DivPrice>
                  <Button>
                    <SlBasketLoaded
                      onClick={() => cart.addOneToCart(item._id)}
                    />
                  </Button>
                </div>
              </div>
            </DivItem>
          );
        })}
      </DivProducts>
    </div>
  );
};

export default Products;

const DivProducts = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const DivItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px 10px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const DivPrice = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;
`;

const Button = styled.button`
  background-color: #f6e58d;
  border: none;
  color: black;
  text-align: center;
  border-radius: 50%;

  &:hover {
    background-color: #fdd6014a;
  }
`;

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
  left: 500px;
`;
