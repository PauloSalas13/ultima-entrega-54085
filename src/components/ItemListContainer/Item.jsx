import { Link } from "react-router-dom";
import "./item.css";

const Item = ({ product }) => {
  return (
    <div key={product.id} className="card">
      <Link to={`/detail/${product.id}`} className="image-link">
        <div className="image-box-card">
          <img className="image-card" src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="info-card">
        <h2 className="title-card">{product.name}</h2>
        <p className="description-card">{product.description}</p>
        <div className="box-button-item">
          <Link to={`/detail/${product.id}`} className="privacy-policy-link">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Item;
