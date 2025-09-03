import { useState, useCallback } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.Id.toString());
      
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.Id.toString()
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price
              }
            : item
        );
      }
      
      return [...prev, {
        productId: product.Id.toString(),
        name: product.name,
        price: product.price,
        quantity: quantity,
        subtotal: product.price * quantity
      }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? {
              ...item,
              quantity: quantity,
              subtotal: quantity * item.price
            }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return {
    cartItems,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    openCart,
    closeCart
  };
}