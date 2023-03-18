import { Button, Navbar, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import CartProduct from "./CartProduct";

const NavbarComponent = () => {
  const cart = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <div>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartProduct
                  key={index}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Total: {cart.getTotalCost()}
              </div>

              <Button variant="success">Purchase items!</Button>
            </div>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
