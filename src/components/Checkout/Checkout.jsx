import { useState, useContext } from "react";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

import CheckoutForm from "./CheckoutForm.jsx";
import db from "../../db/db";
import validateForm from "../../utils/validationYup.js";
import { CartContext } from "../../context/CartContext";

import "./checkout.css";

const Checkout = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    cemail: "",
  });
  const [idOrder, setIdOrder] = useState(null);
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const handleChangeInput = (event) => {
    setDataForm({ ...dataForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    //formateando la orden
    const order = {
      user: { ...dataForm },
      products: [...cart],
      total: totalPrice(),
    };


    try {
      //validar los campos del formulario
      const response = await validateForm(dataForm);
      if (response.status === "success") {
        uploadOrder(order);
      } else {
        toast(response.error);
      }

    } catch (error) {
      console.error("Ocurrió un error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al validar formulario',
        text: 'Hubo un error al validar formulario. Por favor, intenta de nuevo.',
    });
    }

  };

  const uploadOrder = async (order) => {

    try {

      //nueva coleccion si no existe se crea
      const ordersRef = collection(db, "orders");
      const response = await addDoc(ordersRef, order);

      setIdOrder(response.id);
      updateStock();
      clearCart();

    } catch (error) {
      console.error("Error al subir la orden:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al subir la orden',
          text: 'Hubo un error al subir la orden. Por favor, intenta de nuevo.',
      });
    }


  };

  const updateStock = async () => {
    try {
      await Promise.all(cart.map(async (productCart) => {
        //guardamos la cantidad para luego restarla al stock
        const quantity = productCart.quantity;

        //borramos el campo quantity
        delete productCart.quantity;

        const productRef = doc(db, "products", productCart.id);
        await setDoc(productRef, {
          ...productCart,
          stock: productCart.stock - quantity,
        });
      }));
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el stock',
        text: 'Hubo un error al actualizar el stock de los productos. Por favor, intenta de nuevo.',
      });
    }
  };

  return (
    <div className="checkout">
      {idOrder ? (
        <div className="order-generated">
          <h2>Compra Exitosa!!!</h2>
          <p>Su Orden quedo guardada con el id de su compra: <span className="highlight">{idOrder}</span></p>
          <p>Favor Guarde ese código para poder seguir su Pedido</p>
          <Link className="privacy-policy-link" to="/">Volver al inicio</Link>
        </div>
      ) : (
        <>
          <CheckoutForm
            dataForm={dataForm}
            handleChangeInput={handleChangeInput}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};
export default Checkout;
