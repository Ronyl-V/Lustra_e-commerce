"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
};

export type CartProduct = Product & {
  cartQuantity: number;
};

type CartContextType = {
  cartItems: CartProduct[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  cartCount: number;
  isHydrated: boolean;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
      setIsHydrated(true);
    }
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, cartQuantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === productId
        ? { ...item, cartQuantity: item.cartQuantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (productId: number) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === productId
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      )
      .filter((item) => item.cartQuantity > 0)
  );
};

  const cartCount = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  if (!isClient) return null;

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    isHydrated,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
  }}
>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
