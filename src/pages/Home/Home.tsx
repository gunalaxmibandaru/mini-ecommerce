import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import type { Product } from "../../types";

import styles from "./Home.module.scss";

const Home = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await getProducts();

        setProducts(data);
      } catch {
        setError(
          "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <h2
        style={{
          padding: "30px",
        }}
      >
        Loading...
      </h2>
    );

  if (error)
    return (
      <h2
        style={{
          padding: "30px",
        }}
      >
        {error}
      </h2>
    );

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1>
          Discover Amazing
          Products
        </h1>

        <p>
          Shop the latest
          fashion,
          accessories,
          electronics and
          more.
        </p>
      </section>

      <section
        className={styles.products}
      >
        <h2>
          Featured Products
          <span>
            (
            {
              products.length
            }
            )
          </span>
        </h2>

        <ProductGrid
          products={products}
        />
      </section>
    </main>
  );
};

export default Home;