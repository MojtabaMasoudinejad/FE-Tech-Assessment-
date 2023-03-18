import styled, { keyframes } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

const Item = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const cart = useContext(UserContext);
  const productQuantity = cart.getProductQuantity(id);
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

  return (
    <div>
      {productData.map((item, index) => {
        if (item._id === id) {
          return (
            <MainDiv key={index}>
              <ImagesDiv>
                {item.imageURLs.map((imgSrc, index) => {
                  return (
                    <img
                      key={index}
                      src={imgSrc}
                      alt="itemPhoto"
                      width="550px"
                      style={{ marginRight: "0px", border: "1px solid black" }}
                    />
                  );
                })}
              </ImagesDiv>
              <InfoDiv>
                <div style={{ fontSize: "45px", margin: "35px 20px" }}>
                  {item.fulhausProductName}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginBottom: "35px" }}>
                    <div style={{ fontWeight: "900", marginBottom: "10px" }}>
                      COLOR:
                    </div>
                    <div>{item.fulhausColorName}</div>
                  </div>
                </div>

                <hr style={{ background: "black", height: "1px" }}></hr>

                <div style={{ margin: "25px 0" }}>
                  BUY{" "}
                  <span style={{ fontWeight: "bold" }}>
                    ${item.retailPrice}
                  </span>
                </div>
                {productQuantity > 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PurchaseButton
                        onClick={() => cart.removeOneFromCart(id)}
                      >
                        -
                      </PurchaseButton>
                      <div style={{ fontWeight: "bolder" }}>
                        In Cart: {productQuantity}
                      </div>
                      <PurchaseButton onClick={() => cart.addOneToCart(id)}>
                        +
                      </PurchaseButton>
                    </div>
                    <button
                      onClick={() => cart.deleteFromCart(id)}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontFamily: "serif",
                      }}
                    >
                      Remove from Cart
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => cart.addOneToCart(id)}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontFamily: "serif",
                    }}
                  >
                    ADD TO CART
                  </button>
                )}

                <hr
                  style={{
                    background: "black",
                    height: "1px",
                    margin: "30px 0 0 0",
                  }}
                ></hr>

                <div style={{ margin: "30px 0 15px 0", fontWeight: "bold" }}>
                  DIMENTIONS:{" "}
                </div>
                <div>
                  <span style={{ marginRight: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Height:</span>{" "}
                    {item.length} in
                  </span>

                  <span style={{ marginRight: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Length:</span>{" "}
                    {item.length} in
                  </span>
                  <span style={{ marginRight: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Width:</span>{" "}
                    {item.width} in
                  </span>
                  <span style={{ marginRight: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>Weight:</span>{" "}
                    {item.weight} lbs
                  </span>
                </div>
                <div style={{ margin: "30px 0 15px 0" }}>
                  <span style={{ fontWeight: "bold" }}>MATERIAL:</span>{" "}
                </div>
                <div>{item.material}</div>
              </InfoDiv>
            </MainDiv>
          );
        }
      })}
    </div>
  );
};

export default Item;

const MainDiv = styled.div`
  display: flex;
`;

const ImagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoDiv = styled.div`
  background-color: #d1d8e0;
  display: flex;
  flex-direction: column;
  height: 750px;
  padding: 30px;
`;

const PurchaseButton = styled.button`
  font-family: serif;
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 5px;

  &:hover {
    background-color: #dfe6e9;
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
  left: 180px;
`;
