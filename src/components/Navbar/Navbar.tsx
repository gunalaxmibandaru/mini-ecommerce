import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav className={styles.navbar}>
        <Link
          to="/"
          className={styles.logo}
        >
          MiniStore
        </Link>

        <button
          className={styles.cartBtn}
          onClick={() =>
            setIsCartOpen(true)
          }
          aria-label="Open Cart"
        >
          🛒

          {totalItems > 0 && (
            <span
              className={styles.badge}
            >
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      <CartDrawer
        open={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
      />
    </>
  );
};

export default Navbar;