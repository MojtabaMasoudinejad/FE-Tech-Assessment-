import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import GlobalStyles from "./GlobalStyles";
import Item from "./Item";
import Products from "./Products";
import NavbarComponent from "./Navbar";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Container>
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="/:id"
              element={<Item counter={counter} setCounter={setCounter} />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
