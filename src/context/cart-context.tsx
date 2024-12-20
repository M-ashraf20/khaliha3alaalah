"use client";

import { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQuantity: (
    id: string,
    size: string | undefined,
    color: string | undefined,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("cartItems");
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          // Validate that all items have valid prices
          return parsedItems.map((item: CartItem) => ({
            ...item,
            price: Number(item.price) || 0, // Ensure price is a number
            quantity: Number(item.quantity) || 1, // Ensure quantity is a number
          }));
        } catch (e) {
          console.error("Error parsing cart items:", e);
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    // Ensure price is a valid number
    const validatedItem = {
      ...newItem,
      price: Number(newItem.price) || 0,
      quantity: Number(newItem.quantity) || 1,
    };

    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.id === validatedItem.id &&
          item.selectedSize === validatedItem.selectedSize &&
          item.selectedColor === validatedItem.selectedColor
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += validatedItem.quantity;
        return updatedItems;
      }

      return [...currentItems, validatedItem];
    });
  };

  const removeItem = (id: string, size?: string, color?: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string | undefined,
    color: string | undefined,
    quantity: number
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: Number(quantity) || 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
