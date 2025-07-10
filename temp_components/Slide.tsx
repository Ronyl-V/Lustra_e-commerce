import React from 'react'
import Image from 'next/image'
import ProductList from './ProductList'
import Link from 'next/link'
import DealOftheDay from './DealOftheDay'

const Slide = () => {
  return (
    <>
    <div className='w-screen max-h-screen flex items-center justify-center mt-26 pt-1 py-12 px-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
     <div className='w-full sm:w-4/5 md:w-2/3 px-4 sm:px-6 flex flex-col items-center md:items-start justify-center text-center md:text-left'>

  <div className='text-2xl font-bold'>
    <span className='text-red-400'>Lustra</span> - Naturally Luminous, Naturally You
  </div>

  <div className='text-sm mt-2'>
    Indulge in beauty that harmonizes nature’s wisdom with the precision of luxury. Our thoughtfully crafted skincare 
    line enhances your complexion with pure, potent ingredients — while honoring our commitment to preserving the Earth.
  </div>

  <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 items-center sm:items-start'>
    <Link href="/products">
      <button className='bg-black text-white rounded-full px-4 py-2 text-[10px] sm:text-sm cursor-pointer'>
        See Products
      </button>
    </Link>
    <Link href="/contact">
      <button className='ring-1 ring-gray-300 rounded-full px-4 py-2 text-[10px] sm:text-sm cursor-pointer'>
        Contact Us
      </button>
    </Link>
  </div>

</div>

      <div className='hidden md:block h-full flex items-center justify-center'
     style={{width: 'min(450px, 50vw)'}}>
          <Image 
          src="/Femme.png" 
          alt="Image" 
          width={600} 
          height={600}
          className="w-full h-full"
           />
      </div>
    </div>

    <ProductList />

    <DealsSection />
  </>
  )
}
  function DealsSection(){
  return (
    <div className="font-sans mt-10">
      {/* Deal Of The Day Section */}
      <DealOftheDay />

      {/* Testimonials Section */}
      <section className="py-16 px-4 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4">What People Say About Us</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Discover how our products have improved lives and provided amazing results.
        </p>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center md:items-start">
  
  {/* Image Section */}
  <div
    className="hidden md:flex items-center justify-center flex-shrink-0"
    style={{ width: 'min(300px, 12vw)' }}
  >
    <Image
      src="/girl.jpg"
      alt="Deal"
      width={400}
      height={400}
      className="rounded-lg object-cover w-full h-auto"
    />
  </div>

  {/* Text Section */}
  <div className="flex-1 text-center md:text-left">
    <p className="text-gray-600 text-base leading-relaxed mb-4">
      Hello there! I just wanted to share my experience with your products. They have truly
      transformed my skincare routine. The quality is exceptional, and I love how natural and
      effective they are. Thank you for creating such amazing products!
    </p>
    
    <div className='flex justify-between items-center'>
    <div className='flex-shrink-0'>
    {/* Rating */}
    <div className="flex justify-center md:justify-start items-center gap-2 text-yellow-500 mb-2 text-lg">
      ⭐⭐⭐⭐⭐ <span className="text-gray-500 text-sm ml-2">5.0</span>
    </div>

    {/* Name and Role */}
    <div className="font-semibold text-lg">Leila Alex</div>
    <div className="text-sm text-gray-500 mb-8">Fashion Enthusiast</div>
      </div>
    <Link href="/blog" className="bg-black text-white rounded-full px-4 py-2 text-[10px] cursor-pointer xs:text-xs sm:text-sm rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ease-in-out hover:scale-105">
  See More
</Link>
</div>
  </div>
</div>

      </section>
    </div>
  );
};
export default Slide
