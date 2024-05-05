import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import { CartContext } from "../../context/CartContext";
import "./cart.css";

const Cart = () => {
  const { cart, clearCart, deleteProductById, totalPrice } = useContext(CartContext);


  //early return
  if(cart.length === 0){
    return <div className="cart-empty">
      <h2>No se ha elegido ningun producto, Favor Elija un Producto</h2>
      <Link className="privacy-policy-link" to="/">Buscar Productos</Link>
    </div>
  }

  return (
    <div className="cart">
      <h2>Productos en el carrito</h2>
      <div className="products-cart">
        {cart.map((product) => (
          <div key={product.id} className="product-cart">
            <img className="image-product-cart" src={product.image} />
            <p className="info-product-cart">{product.name}</p>
            <p className="info-product-cart">Cantidad: {product.quantity}</p>
            <p className="info-product-cart">Precio c/u: {product.price}</p>
            <p className="info-product-cart">Total: {product.quantity * product.price}</p>

            <button onClick={ () => deleteProductById(product.id)} ><FaTrashAlt size={30} /></button>
          </div>
        ))}
      </div>
      <div className="controls-cart">
        <h2> Precio total: ${totalPrice()}</h2>
        <Link to="/checkout" className="privacy-policy-link">
          Continuar compra
        </Link>
        <button className="privacy-policy-link" style={{ marginLeft: "20px" }} onClick={clearCart}>
          Vaciar carrito
        </button>
        <Link to="/" className="privacy-policy-link" style={{ marginLeft: "20px" }}>Volver</Link>
      </div>
    </div>
  );
};
export default Cart;
