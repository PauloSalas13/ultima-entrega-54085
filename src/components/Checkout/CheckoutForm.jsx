import { Link } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";

const CheckoutForm = ({ dataForm, handleChangeInput, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit} className="form-checkout">
      <h2>Ingrese sus datos para terminar con la compra</h2>
      <FaWpforms size={60} />
      
      <div className="inputs-form">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={dataForm.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className="inputs-form">
        <label htmlFor="phone">Telefono:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={dataForm.phone}
          onChange={handleChangeInput}
        />
      </div>

      <div className="inputs-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dataForm.email}
          onChange={handleChangeInput}
        />
      </div>

      <div className="inputs-form">
        <label htmlFor="cemail">Repetir Email:</label>
        <input
          type="email"
          id="cemail"
          name="cemail"
          value={dataForm.cemail}
          onChange={handleChangeInput}
        />
      </div>

      <div className="inputs-form">
        <button className="privacy-policy-link" type="submit">Enviar Orden</button>
        <Link to="/" className="privacy-policy-link">Deseas Seguir Comprando</Link>
      </div>
    </form>
  );
};

export default CheckoutForm;
