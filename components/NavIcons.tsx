"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { cartCount } = useCart();
  const router = useRouter();

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 relative">
      {/* Profile Icon */}
      <Image
        src={user?.imageUrl || "/profile.png"}
        alt="Profile"
        width={22}
        height={22}
        className="cursor-pointer rounded-full"
        onClick={handleProfile}
      />

      {isProfileOpen && isLoaded && (
        <div className="absolute top-12 right-0 w-40 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
          <div className="flex flex-col p-3 text-sm text-gray-700">
            {isSignedIn ? (
              <>
                <span className="px-3 py-1 mb-2 font-semibold text-xs text-gray-500">
                  {user.emailAddresses[0]?.emailAddress}
                </span>

                <SignOutButton>
                  <button className="mt-2 py-2 px-3 text-left rounded-md hover:bg-red-100 text-red-500 transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <>
                <SignInButton>
                  <button className="mt-2 py-2 px-3 text-center rounded-md border hover:bg-gray-100 transition">
                    Sign In
                  </button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🛒 Cart Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/shoppingcart")}
      >
        <Image src="/cart.png" alt="Cart" width={22} height={22} />
        {cartCount > 0 && (
          <div className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {cartCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavIcons;
