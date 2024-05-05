import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
//import Banner from "./components/Examples/Banner/Banner";

import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import ContactForm from "./components/ContactForm/ContactForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <ToastContainer theme="dark" />

        <Routes>
          <Route path="/" element={<ItemListContainer saludo="Te recomendamos" />} />
          <Route path="/category/:idCategory" element={<ItemListContainer saludo="Nuestros productos" />} />
          <Route path="/detail/:idProduct" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/about" element={<AboutUs />} /> {/* Agregar esta línea */}
          <Route path="/contact" element={<ContactForm />} /> {/* Agregar esta línea */}
          <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Agregar esta línea */}

        </Routes>
        <Footer/>


      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
