"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setStatus("loading");

    try {
      // Replace this with your own API endpoint
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };
  return (
    <div className="bg-black text-white py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full text-white md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">LUSTRA</div>
          </Link>
          <p>
           Douala Cameroon
          </p>
          <span className="font-semibold">hello@lustra.dev</span>
          <span className="font-semibold">+237 676 12 76 52</span>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">New Arrivals</Link>
              <Link href="">Accessories</Link>
              <Link href="">Men</Link>
              <Link href="">Women</Link>
              <Link href="">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
              <div className="flex h-10 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="p-4 w-3/4 rounded-l-md border border-gray-300 focus:outline-none"
      />
      <button
        onClick={handleSubscribe}
        className="w-1/4 bg-white text-black rounded-r-md border border-gray-300 hover:bg-black hover:text-white transition"
      >
        {status === "loading" ? "..." : "JOIN"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-sm mt-2 ml-2">Subscribed!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2 ml-2">Something went wrong.</p>
      )}
    </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex gap-3">
            <Image src="/orange-logo.png" alt="" width={40} height={20} />
            <Image src="/momo-logo.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2025 Lustra Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">Douala Cameroon | French</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;