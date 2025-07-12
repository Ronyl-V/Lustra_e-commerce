"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ShoppingCartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleCheckout = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!paymentMethod || !name || !email || !phone) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // 1. Lancer le paiement
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          paymentMethod,
          cartItems,
          totalAmount: Number(totalAmount),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message);

      const referenceId = data.referenceId;
      if (!referenceId) throw new Error("Référence de paiement manquante.");

      // 2. Attendre la confirmation paiement
      setTimeout(async () => {
        try {
          const webhookRes = await fetch("/api/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              referenceId,
              name,
              email,
              phone,
              cartItems,
              totalAmount,
            }),
          });

          const webhookData = await webhookRes.json();
          if (!webhookRes.ok) {
            alert("Paiement non confirmé : " + webhookData.message);
          } else {
            alert("Paiement validé et commande enregistrée !");
            router.push("/orders");
          }
        } catch (err) {
          console.error("Erreur webhook :", err);
          alert("Erreur lors de la confirmation du paiement.");
        }
      }, 12000);
    } catch (err: any) {
      alert("Erreur lors du paiement : " + err.message);
    }
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <>
      <NavBar />
      <div className="flex flex-row flex-wrap w-full min-h-screen bg-white mt-30 justify-center items-start gap-4 px-4">
       {/* LEFT - CART */}
<div className="w-full lg:w-[60%] bg-white flex flex-col items-center">
  <div className="text-2xl font-bold mb-6">Shopping Cart</div>

  {/* Table Header - Visible sur grand écran */}
  <div
    className="hidden lg:grid w-full px-6 py-2 font-semibold text-sm text-gray-600 border-b border-gray-300"
    style={{ gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr" }}
  >
    <div>Product</div>
    <div className="text-center">Price</div>
    <div className="text-center">Quantity</div>
    <div className="text-center">Total</div>
    <div className="text-center">Action</div>
  </div>

  {cartItems.length === 0 ? (
    <div className="text-gray-500 mt-8">Your cart is empty.</div>
  ) : (
    cartItems.map((product) => (
      <div
        key={product.id}
        className="w-full border-b border-gray-200 px-4 py-4"
      >
        {/* Desktop view */}
        <div
          className="hidden lg:grid items-center"
          style={{ gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr" }}
        >
          <div className="flex items-center gap-4">
            <Image
              src={product.image || "/default.jpg"}
              alt={product.name}
              width={70}
              height={70}
              className="rounded"
            />
            <div className="flex flex-col">
              <span className="font-medium">{product.name}</span>
            </div>
          </div>
          <div className="text-center font-semibold text-sm">
            FCFA {product.price}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              −
            </button>
            <span className="px-2">{product.cartQuantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <div className="text-center font-semibold text-sm">
            FCFA {product.price * product.cartQuantity}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 border border-red-400 text-xs px-4 py-1 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Mobile / Tablet card style */}
        <div className="lg:hidden flex flex-col gap-2 rounded-lg bg-gray-50 p-4 shadow-sm">
          <div className="flex gap-3 items-center">
            <Image
              src={product.image || "/default.jpg"}
              alt={product.name}
              width={60}
              height={60}
              className="rounded"
            />
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600">FCFA {product.price}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-700">
              Total:{" "}
              <span className="font-bold">
                FCFA {product.price * product.cartQuantity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span>{product.cartQuantity}</span>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 border border-red-400 text-xs px-4 py-1 rounded-full hover:bg-red-500 hover:text-white transition mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))
  )}

  {/* Footer (Total + lien) */}
  <div className="mt-8 w-full px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
    <Link
      href="/products"
      className="text-black border border-gray-300 text-xs px-6 py-2 font-bold rounded-full hover:bg-black hover:text-white transition"
    >
      Continue Shopping
    </Link>

    <div className="text-lg sm:text-xl font-bold">
      Total: <span className="text-base font-semibold">FCFA {totalAmount}</span>
    </div>
  </div>
</div>


        {/* RIGHT - PAYMENT INFO */}
        <div className="h-full bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Info</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-md mx-auto px-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("orange")}
              className={`flex items-center justify-center gap-2 w-full border ${
                paymentMethod === "orange"
                  ? "border-orange-500 bg-orange-100"
                  : "border-orange-300"
              } rounded-xl px-4 py-3 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <Image src="/orange-logo.png" alt="Orange" width={30} height={30} />
              <span className="text-sm font-medium">Orange Money</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("momo")}
              className={`flex items-center justify-center gap-2 w-full border ${
                paymentMethod === "momo"
                  ? "border-yellow-500 bg-yellow-100"
                  : "border-yellow-300"
              } rounded-xl px-4 py-3 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <Image src="/momo-logo.png" alt="Mobile Money" width={30} height={30} />
              <span className="text-sm font-medium">Mobile Money</span>
            </button>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">E-Mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="block w-full text-center bg-black text-white text-sm font-semibold py-3 rounded-full hover:bg-gray-800 transition"
            >
              Check Out
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCartPage;
