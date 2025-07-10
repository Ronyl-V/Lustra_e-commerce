import Link from 'next/link';
import React from 'react';
import Menu from './Menu';
import Image from 'next/image';
import NavIcons from './NavIcons';
import SearchBar from './SearchBar';

const NavBar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
    <div className='h-26 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* MOBILE + TABLET (screens < 1024px) */}
      <div className='flex items-center justify-between h-full lg:hidden'>
        <Link href='/' className='flex items-center  h-12'>
          <div className="relative w-[25vh] h-[30vh]">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <NavIcons />
          <Menu />
        </div>
      </div>

      {/* DESKTOP (lg and up) */}
      <div className='hidden lg:flex items-center justify-between gap-8 h-full'>
        {/* LEFT */}
        <div className='w-full xl:w-full flex items-center gap-12'>
          <Link href='/' className='flex items-center h-12'>
            <div className="relative mt-10 w-[40vh] h-[40vh]">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <div className='flex ml-10 gap-6 text-sm xl:text-base cursor-pointer'>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/blog">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className='w-2/3 xl:w-1/2 flex items-center justify-end gap-8'>
          <div className="show-after-1024">
  <SearchBar />
</div>

          <NavIcons />
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
