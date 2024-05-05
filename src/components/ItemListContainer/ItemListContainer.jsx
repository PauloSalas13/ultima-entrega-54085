import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import Swal from 'sweetalert2';

import ItemList from "./ItemList";
import db from "../../db/db";

import "./itemListContainer.css";

const ItemListContainer = ({ saludo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { idCategory } = useParams();

  const getProducts = async () => {
    try {
      const dataDb = await getDocs(collection(db, "products"));

      const data = dataDb.docs.map((productDb) => {
        return { id: productDb.id, ...productDb.data() };
      });

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      Swal.fire({
          icon: 'error',
          title: 'Error al cargar los productos',
          text: 'Hubo un error al cargar los productos. Por favor, intenta de nuevo.',
      });
  }
  };

  const getProductsByCategory = async () => {
    const q = query(
      collection(db, "products"),
      where("category", "==", idCategory)
    );

    const dataDb = await getDocs(q);

    const data = dataDb.docs.map((productDb) => {
      return { id: productDb.id, ...productDb.data() };
    });

    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (idCategory) {
      getProductsByCategory();
    } else {
      getProducts();
    }
  }, [idCategory]);

  return (
    <div className="item-list-container">
      <h2 className="title-items">{saludo}</h2>
      {loading ? (
        <div className="loading-screen">Cargando Productos...</div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};
export default ItemListContainer;
