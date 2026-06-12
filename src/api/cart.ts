export const addToCartApi = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  const shouldFail =
    Math.random() < 0.2;

  if (shouldFail) {
    throw new Error(
      "Failed to add item to cart"
    );
  }

  return {
    success: true,
  };
};