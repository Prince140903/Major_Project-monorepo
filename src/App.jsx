import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components";
import { Home, About, Listing, NotFound, DetailsPage, Cart } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/about" element={<About />} />
        <Route exact={true} path="/product/listing" element={<Listing />} />
        <Route exact={true} path="/Details" element={<DetailsPage />} />
        <Route exact={true} path="/Cart" element={<Cart />} />
        <Route exact={true} path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
