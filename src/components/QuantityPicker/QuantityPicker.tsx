import styles from "./QuantityPicker.module.scss";

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
}

const QuantityPicker = ({
  quantity,
  setQuantity,
}: Props) => {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={decrease}>-</button>

      <span>{quantity}</span>

      <button onClick={increase}>+</button>
    </div>
  );
};

export default QuantityPicker;