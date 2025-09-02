import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const STORAGE_KEY = "my-app-cart";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (err) {
        console.error("Failed to parse cart data from localStorage", err);
      }
    }
  }, []);

  // Sync cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
  const quantity = item.quantity || 1;
  setCartItems((prev) => {
    const existing = prev.find((p) => p.id === item.id);
    if (existing) {
      return prev.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
      );
    }
    return [...prev, { ...item, quantity }];
  });
};


  //   const quantity = item.quantity || 1;

  //   setCartItems((prev) => {
  //     const existing = prev.find((p) => p.id === item.id);
  //     if (existing) {
  //       return prev.map((p) =>
  //         p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
  //       );
  //     }
  //     return [...prev, { ...item, quantity }];
  //   });
  // };

  // Remove item by ID
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Get total price
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
