import styles from "./VariantSelector.module.scss";

interface Size {
  size: string;
  stock: number;
}

interface Props {
  colors: string[];
  sizes: Size[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

const VariantSelector = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: Props) => {
  return (
    <>
      <div className={styles.section}>
        <h4>Colors</h4>

        <div className={styles.colors}>
          {colors.map((color) => (
            <button
              key={color}
              className={
                selectedColor === color
                  ? styles.active
                  : ""
              }
              onClick={() =>
                onColorChange(color)
              }
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Sizes</h4>

        <div className={styles.sizes}>
          {sizes.map((item) => (
            <button
              key={item.size}
              disabled={item.stock === 0}
              className={`${
                selectedSize === item.size
                  ? styles.active
                  : ""
              } ${
                item.stock === 0
                  ? styles.soldOut
                  : ""
              }`}
              onClick={() =>
                onSizeChange(item.size)
              }
            >
              {item.size}

              {item.stock === 0 &&
                " (Sold Out)"}

              {item.stock > 0 &&
                item.stock <= 3 &&
                " (Low Stock)"}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default VariantSelector;