import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../constant/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveObject, singOut } from "@/utils/commonFunction";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { router } from "expo-router";
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
  const [singleProduct, setSingleProduct] = useState(null);
  const [addProductVisible, setAddProductVisible] = useState(false);
  const [sTUVisible, setSTUVisible] = useState(false);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error retrieving data", error);
      return null;
    }
  };

  const handleAddProduct = (data) => {
    const newProduct = { ...data, date: new Date(), stockQuantity: 0, _id: Math.random().toString(36) };
    setProducts((prev) => [newProduct, ...prev]);
    setAllProducts((prev) => [newProduct, ...prev]);
    setAddProductVisible(false);
    axiosInstance
      .post("/product/product-add", data)
      .then((res) => {
        if (res.data.success) {
          getProducts();
        }
      })
      .catch((err) => {
        console.error("Error adding product:", err.response);
        getProducts();
      });
  };

  const handleStockUpdate = (product) => {
    // console.log("product", JSON.stringify(product, null, 2));
    if (product?.type === "in") {
      setStockIn((prev) => [
        {
          ...product,
          productId: product._id,
          _id: Math.random().toString(36),
          user: {
            fullName: user.fullName || "Shuvo",
          },
        },
        ...prev,
      ]);
    } else {
      setStockOut((prev) => [
        {
          ...product,
          productId: product._id,
          _id: Math.random().toString(36),
          user: {
            fullName: user.fullName || "Shuvo",
          },
        },
        ...prev,
      ]);
    }
    setProducts((prev) =>
      prev.map((item) =>
        item._id === product._id
          ? product.type === "in"
            ? {
                ...item,
                stockQuantity: parseInt(item.stockQuantity) + parseInt(product.stockQuantity),
              }
            : {
                ...item,
                stockQuantity: parseInt(item.stockQuantity) - parseInt(product.stockQuantity),
              }
          : item
      )
    );

    setAllProducts((prev) =>
      prev.map((item) =>
        item._id === product._id
          ? product.type === "in"
            ? {
                ...item,
                stockQuantity: parseInt(item.stockQuantity) + parseInt(product.stockQuantity),
              }
            : {
                ...item,
                stockQuantity: parseInt(item.stockQuantity) - parseInt(product.stockQuantity),
              }
          : item
      )
    );

    axiosInstance
      .patch(`/product/product-update/${product._id}`, {
        ...product,
        date: new Date(),
        userEmail: user.email || "shuvajitmaitra1@gmail.com",
      })
      .then((res) => {
        console.log("update stock", JSON.stringify(res.data, null, 2));
        const { history, product: updatedProduct } = res.data;
        if (res.data.success) {
          getProducts();
          getHistories();
        }
      })
      .catch((err) => {
        console.log("err.response", JSON.stringify(err.response, null, 2));
        getProducts();
        getHistories();
      });
  };
  const handleEditProduct = (product) => {
    if (!product.name.trim()) {
      Alert.alert("Validation Error", "Product name is required");
      return;
    }
    const productIndex = products.findIndex((item) => item._id === product._id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...product };
    }
    axiosInstance
      .patch(`/product/product-edit/${product._id}`, {
        ...product,
      })
      .then((res) => {
        if (res.data.success) {
          // console.log("product edit", JSON.stringify(res.data, null, 2));
          getProducts();
          getHistories();
        }
      })
      .catch((err) => {
        getProducts();
        getHistories();
        console.log("err.response", JSON.stringify(err.response, null, 2));
      });
  };

  const handleDeleteHistory = (stock) => {
    // console.log("stock", JSON.stringify(stock, null, 2));
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
    axiosInstance
      .delete(`/history/history-delete/${stock._id}`)
      .then((res) => {
        if (res.data.success) {
          getHistories();
        }
      })
      .catch((err) => {
        console.error("Error deleting history:", err);
        getHistories();
      });
  };

  const getProducts = () => {
    axiosInstance
      .get("/product/all-products")
      .then((res) => {
        // console.log("res.data", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          setProducts(res.data.products);
          setAllProducts(res.data.products);
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
      .get("/history/all-histories")
      .then((res) => {
        // console.log("histories", JSON.stringify(res.data, null, 2));
        if (res.data.success) {
          setStockIn(res.data.stockIn);
          setStockOut(res.data.stockOut);
        }
      })
      .catch((error) => console.error("Error fetching histories:", error));
  };

  const handleDeleteProduct = (product) => {
    const id = product._id;
    setProducts((prev) => prev.filter((item) => item._id !== id));
    setAllProducts((prev) => prev.filter((item) => item._id !== id));
    axiosInstance
      .delete(`/product/product-delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          getProducts();
        }
      })
      .catch((err) => {
        console.error("Error deleting product:", err.response);
        getProducts();
      });
  };

  const handleLogout = () => {
    singOut();
    setProducts([]);
    setStockIn([]);
    setStockOut([]);
    setAllProducts([]);
    setSingleProduct(null);
    setAddProductVisible(false);
    setSTUVisible(false);
  };

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
      getProducts();
      getHistories();
    });
  }, []);

  const contextValue = {
    handleEditProduct,
    getProducts,
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
    handleAddProduct,
    handleStockUpdate,
    handleDeleteHistory,
    handleDeleteProduct,
    handleSearchProduct,
    singleProduct,
    setSingleProduct,
  };

  return <StockContext.Provider value={contextValue}>{children}</StockContext.Provider>;
};
