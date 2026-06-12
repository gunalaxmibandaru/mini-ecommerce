import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../../api/products";
import { addToCartApi } from "../../api/cart";

import { variants } from "../../data/variants";
import { productMeta } from "../../data/productMeta";

import { useCart } from "../../context/CartContext";

import QuantityPicker from "../../components/QuantityPicker/QuantityPicker";
import VariantSelector from "../../components/VariantSelector/VariantSelector";

import type { Product } from "../../types";

import styles from "./ProductDetail.module.scss";

const ProductDetail = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [adding, setAdding] =
    useState(false);

  const [error, setError] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const queryParams =
    new URLSearchParams(
      window.location.search
    );

  const [selectedColor, setSelectedColor] =
    useState(
      queryParams.get("color") ||
        variants.default.colors[0]
    );

  const [selectedSize, setSelectedSize] =
    useState(
      queryParams.get("size") ||
        variants.default.sizes[0].size
    );

  const [selectedImage, setSelectedImage] =
    useState(
      productMeta.default.images[0]
    );

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          if (!id) return;

          const data =
            await getProductById(id);

          setProduct(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const params =
      new URLSearchParams();

    params.set(
      "color",
      selectedColor
    );

    params.set(
      "size",
      selectedSize
    );

    window.history.replaceState(
      {},
      "",
      `?${params.toString()}`
    );
  }, [
    selectedColor,
    selectedSize,
  ]);

  if (loading) {
    return (
      <h2
        style={{
          padding: "30px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!product) {
    return (
      <h2
        style={{
          padding: "30px",
        }}
      >
        Product not found
      </h2>
    );
  }

  const selectedVariant =
    variants.default.sizes.find(
      (size) =>
        size.size === selectedSize
    );

  const isSoldOut =
    selectedVariant?.stock === 0;

  const originalPrice =
    product.price *
    productMeta.default
      .originalPriceMultiplier;

  const handleAddToCart =
    async () => {
      try {
        setAdding(true);
        setError("");

        await addToCartApi();

        addToCart({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity,
          color: selectedColor,
          size: selectedSize,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setAdding(false);
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <img
          src={selectedImage}
          alt={product.title}
          className={styles.mainImage}
        />

        <div
          className={
            styles.thumbnails
          }
        >
          {productMeta.default.images.map(
            (image) => (
              <img
                key={image}
                src={image}
                alt={product.title}
                onClick={() =>
                  setSelectedImage(
                    image
                  )
                }
              />
            )
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h1>{product.title}</h1>

        <p>
          Brand:
          <strong>
            {" "}
            {
              productMeta.default
                .brand
            }
          </strong>
        </p>

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: "10px",
            margin: "16px 0",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            ₹
            {(
              product.price * 85
            ).toFixed(0)}
          </span>

          <span
            style={{
              textDecoration:
                "line-through",
              color: "#888",
            }}
          >
            ₹
            {(
              originalPrice *
              85
            ).toFixed(0)}
          </span>
        </div>

        <p>
          {product.description}
        </p>

        <VariantSelector
          colors={
            variants.default.colors
          }
          sizes={
            variants.default.sizes
          }
          selectedColor={
            selectedColor
          }
          selectedSize={
            selectedSize
          }
          onColorChange={
            setSelectedColor
          }
          onSizeChange={
            setSelectedSize
          }
        />

        <QuantityPicker
          quantity={quantity}
          setQuantity={
            setQuantity
          }
        />

        <button
          disabled={
            isSoldOut || adding
          }
          className={
            styles.addButton
          }
          onClick={
            handleAddToCart
          }
        >
          {adding
            ? "Adding..."
            : isSoldOut
            ? "Sold Out"
            : "Add To Cart"}
        </button>

        {error && (
          <p
            className={
              styles.error
            }
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;