'use client';

import { Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden z-50">
        <Menu size={28} className="text-black" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center space-y-8 text-xl font-medium">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={32} />
          </button>

          {/* Menu Items */}
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
