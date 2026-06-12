import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types";
import styles from "./ProductCard.module.scss";

interface Props {
  product: Product;
}

const ProductCard = ({
  product,
}: Props) => {
  const { addToCart } = useCart();

  const [added, setAdded] =
    useState(false);

  const quickAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
      color: "Black",
      size: "M",
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
        />
      </Link>

      <Link
        to={`/product/${product.id}`}
        className={styles.title}
      >
        {product.title}
      </Link>

      <h3>${product.price}</h3>

      <button
        className={styles.btn}
        onClick={quickAdd}
      >
        {added
          ? "✓ Added"
          : "+ Add To Cart"}
      </button>
    </div>
  );
};

export default ProductCard;