import styled, { keyframes } from "styled-components";
import Button from "react-bootstrap/Button";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { withBaseIcon } from "react-icons-kit";

function CartProduct(props) {
  const [productData, setProductData] = useState(null);
  const cart = useContext(UserContext);
  const id = props.id;
  const quantity = props.quantity;
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
            <div key={index}>
              <div style={{ fontSize: "20px", margin: "15px 0" }}>
                {item.fulhausProductName}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>{quantity} total</p>
                  <p style={{ margin: "10px 0" }}>
                    ${quantity * item.retailPrice}
                  </p>
                  <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
                    Remove
                  </Button>
                </div>
                <div>
                  <img
                    src={item.imageURLs[0]}
                    alt="Cart-Information"
                    style={{ width: "150px", marginRight: "10px" }}
                  />
                </div>
              </div>

              <hr></hr>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CartProduct;

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
