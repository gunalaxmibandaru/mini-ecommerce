import { useCart } from "../../context/CartContext";
import styles from "./CartDrawer.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({
  open,
  onClose,
}: Props) => {
  const {
    cart,
    removeItem,
    updateQuantity,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {open && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      <aside
        className={`${styles.drawer} ${
          open ? styles.open : ""
        }`}
      >
        <div className={styles.header}>
          <h2>Shopping Cart</h2>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              🛒
            </div>

            <h3>Your Cart is Empty</h3>

            <p>
              Looks like you haven't added
              any products yet.
            </p>

            <button
              className={styles.shopBtn}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className={styles.item}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div
                    className={
                      styles.itemInfo
                    }
                  >
                    <h4>{item.title}</h4>

                    <p className={styles.variant}>
                      {item.color} /{" "}
                      {item.size}
                    </p>

                    <p className={styles.price}>
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                    <div
                      className={
                        styles.quantityControls
                      }
                    >
                      <button
                        onClick={() => {
                          if (
                            item.quantity ===
                            1
                          ) {
                            removeItem(
                              item.id,
                              item.color,
                              item.size
                            );
                          } else {
                            updateQuantity(
                              item.id,
                              item.color,
                              item.size,
                              item.quantity -
                                1
                            );
                          }
                        }}
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity +
                              1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={
                        styles.removeBtn
                      }
                      onClick={() =>
                        removeItem(
                          item.id,
                          item.color,
                          item.size
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h3>
                Subtotal: $
                {subtotal.toFixed(2)}
              </h3>

              <h3>
                Total: $
                {subtotal.toFixed(2)}
              </h3>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;