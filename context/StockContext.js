import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../constant/axios";

// Create the context with a default value of `undefined`
const StockContext = createContext(undefined);

// Custom hook for consuming the context
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};

// StockProvider Component
export const StockProvider = ({ children }) => {
  const [stockIn, setStockIn] = useState([]);
  const [stockOut, setStockOut] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [sTUVisible, setSTUVisible] = useState(false);

  // Retrieve the logged-in user from local storage
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const handleUserLogin = (e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    axiosInstance
      .post("/user", { email, password })
      .then((res) => {
        if (res.data.success && res.data.data) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          window.location.href = "/";
        } else {
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        localStorage.clear();
      });
  };

  const handleAddProduct = (data) => {
    axiosInstance
      .post("/product/add", data)
      .then((res) => {
        if (res.data.success && res.data.data) {
          setProducts((prev) => [res.data.data.product, ...prev]);
          setAddProductVisible(false);
        }
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const handleStockUpdate = (product) => {
    axiosInstance
      .patch(`/product/update/${product._id}`, {
        ...product,
        date: new Date(),
        userEmail: user?.email,
      })
      .then((res) => {
        const { history, product: updatedProduct } = res.data.data;
        if (history.type === "in") {
          setStockIn((prev) => [history, ...prev]);
        } else {
          setStockOut((prev) => [history, ...prev]);
        }
        setProducts((prev) => prev.map((item) => (item._id === updatedProduct._id ? updatedProduct : item)));
        setSTUVisible(false);
      })
      .catch((err) => console.error("Error updating stock:", err));
  };

  const handleDeleteHistory = (stock) => {
    axiosInstance
      .delete(`/history/delete/${stock._id}`)
      .then((res) => {
        if (res.data.success) {
          setProducts((prev) => {
            const updatedProducts = [...prev];
            const productIndex = updatedProducts.findIndex((item) => item._id === stock.productId);
            if (productIndex !== -1) {
              updatedProducts[productIndex].stockQuantity += stock.type === "in" ? -stock.stockQuantity : stock.stockQuantity;
            }
            return updatedProducts;
          });
          if (stock.type === "in") {
            setStockIn((prev) => prev.filter((item) => item._id !== stock._id));
          } else {
            setStockOut((prev) => prev.filter((item) => item._id !== stock._id));
          }
        }
      })
      .catch((err) => console.error("Error deleting history:", err));
  };

  const getProducts = () => {
    axiosInstance
      .get("/products")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
          setAllProducts(res.data.data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleSearchProduct = (text) => {
    const result = allProducts.filter((c) => c.name.toLowerCase().includes(text.toLowerCase()));
    setProducts(result);
  };

  const getHistories = () => {
    axiosInstance
      .get("/histories")
      .then((res) => {
        if (res.data.success) {
          setStockIn(res.data.data.stockIn);
          setStockOut(res.data.data.stockOut);
        }
      })
      .catch((error) => console.error("Error fetching histories:", error));
  };

  const handleDeleteProduct = (id) => {
    axiosInstance
      .delete(`/product/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProducts((prev) => prev.filter((item) => item._id !== id));
          setAllProducts((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (user) {
      getProducts();
      getHistories();
    }
  }, [user]);

  const contextValue = {
    user,
    products,
    allProducts,
    stockIn,
    stockOut,
    addProductVisible,
    sTUVisible,
    setAddProductVisible,
    setSTUVisible,
    setAllProducts,
    handleLogout,
    handleUserLogin,
    handleAddProduct,
    handleStockUpdate,
    handleDeleteHistory,
    handleDeleteProduct,
    handleSearchProduct,
  };

  return <StockContext.Provider value={contextValue}>{children}</StockContext.Provider>;
};
