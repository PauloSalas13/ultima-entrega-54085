import ItemCount from "../ItemCount/ItemCount";
import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import "./itemDetailContainer.css";

const ItemDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const [clickAdd, setClickAdd] = useState(false)

  const handleAddToCart = (count) => {
    // Este es el producto con la cantidad que vamos a guardar en el carrito
    const productCart = { ...product, quantity: count }
    addToCart(productCart)
    setClickAdd(true)
  }

  const renderDescription = () => {
    if (!product.fullDescription) return null;
    const descriptionWithoutNewlines = product.fullDescription.replace(/\n/g, " ");
    return <p>{descriptionWithoutNewlines}</p>;
  };

  return (
    <div className="item-detail">
      <div className="info-detail" style={{ height: "500px", width: "80%", overflowY: "auto" }}>
        <h1 className="title">{product.name}</h1>
        {renderDescription()}
        <p className="price">Precio: ${product.price}</p>
      </div>
      <div className="info-detail" style={{height: "400px", width: "35%", overflowY: "auto" }}>
      {
          clickAdd ? <Link to="/cart" className="button-go-cart" >Ir al carrito</Link> : <ItemCount handleAddToCart={handleAddToCart} stock={product.stock} />
        }
        <Link to="/" className="privacy-policy-link" style={{ width: "50%", marginTop: "10px" }}>Volver</Link>
      </div>
      <div className="image-detail" style={{ height: "600px", width: "60%", float: "left", padding: "0 10px" }}>
        <img src={product.image} style={{ width: "100%" }} />
      </div>
      <div style={{ clear: "both" }}></div>
      
    </div>
    
  );
};
export default ItemDetail;


