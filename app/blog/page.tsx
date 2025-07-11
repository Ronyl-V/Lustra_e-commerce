/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

"use client";
import React from 'react'
import Image from 'next/image'
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { Award, CheckCircle, Shield, Star, Users } from 'lucide-react';
import { useState } from 'react';

const BlogSection = () => {

  const testimonials = [
    {
      image: "/girl.jpg",
      text: "Since I started using Longrich products, my skin has become more radiant and hydrated. The bamboo charcoal soap is simply magical!",
      rating: 4.9,
      name: "Leila Alex",
      role: "Fashion Enthusiast",
    },
    {
      image: "/Homme.jpg",
      text: "Longrich completely transformed my skincare routine. The SOD body cream leaves my skin soft and flawless.",
      rating: 5.0,
      name: "Jean Christophe",
      role: "Beauty Blogger",
    },
    {
      image: "/woman-smiling.jpg",
      text: "I used to have dry skin issues, but Longrich’s moisturizing lotion changed everything. I highly recommend it!",
      rating: 4.8,
      name: "Esther Mboua",
      role: "Makeup Artist",
    },
    {
      image: "/skincare-african-woman.jpg",
      text: "The bamboo charcoal soap and SOD cream helped me get clear skin again. No more pimples, no more dark spots.",
      rating: 5.0,
      name: "Sandra Tchana",
      role: "Skincare Coach",
    },
    {
      image: "/young-woman-clean-skin.jpg",
      text: "I’m impressed by Longrich shampoo – it improved my scalp and made my complexion healthier!",
      rating: 4.7,
      name: "Lucia K.",
      role: "Lifestyle Influencer",
    },
    {
      image: "/black-man.jpg",
      text: "After just one week with Longrich herbal soap, my skin is glowing and balanced. No more redness or irritation.",
      rating: 4.9,
      name: "Patrick Jackson",
      role: "Doctor",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "High Quality Products",
      description: "Premium materials and craftsmanship in every item we create and curate for our customers."
    },
    {
      icon: Shield,
      title: "Top Safe Product Price",
      description: "Competitive pricing with guaranteed authenticity and secure payment processing."
    },
    {
      icon: Users,
      title: "Support Multiple Currency",
      description: "Global accessibility with support for multiple currencies and payment methods worldwide."
    }
  ];
  
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <>
      <NavBar />
      <div className="w-full mt-20 mb-[-12vh]">
        {/* Hero Section */}
        <section className="bg-slate-50 py-30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">About Us</h2>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="text-gray-600">Home</span>
                <span className="text-gray-400">›</span>
                <span className="text-red-500">About</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Images */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/pub-03.jpg" 
                      alt="Tacos" 
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="pub-04.png" 
                      alt="Fried chicken" 
                      className="rounded-lg w-full h-60 object-cover"
                    />
                  </div>
                  <div className="mt-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/pub-01.jpg" 
                      alt="Pancakes" 
                      className="rounded-lg w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-red-500 font-medium italic">About us</p>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Lustra – Your Trusted Longrich Shop in Cameroon
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  Welcome to Lustra, your online store dedicated to the full range of Longrich products. We offer a wide selection of health, beauty,
                  hygiene, and wellness products, all 100% authentic and suitable for the whole family.
                  Whether you're looking for natural supplements, elegant perfumes, skincare, or daily hygiene essentials, 
                  Lustra is here to support your well-being with quality and trust.
                  What we offer:
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-gray-700 w-5 h-5" />
                    <span className="text-gray-700">Original Longrich products at affordable prices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-gray-700 w-5 h-5" />
                    <span className="text-gray-700">Fast delivery across Cameroon</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-gray-700 w-5 h-5" />
                    <span className="text-gray-700">Personalized customer support for all your needs</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-white text-center">
          <h2 className="text-2xl font-bold mb-10">What Our Clients Say</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button onClick={handlePrev} className="bg-red-400 text-white px-4 py-2 rounded">←</button>
            <button onClick={handleNext} className="bg-black text-white px-4 py-2 rounded">→</button>
          </div>

          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center md:items-start transition-all duration-300 ease-in-out">
            <div className="hidden md:flex items-center justify-center flex-shrink-0 w-[250px] h-[250px]" style={{ width: 'min(300px, 12vw)' }}>
              <Image
                src={current.image}
                alt="Testimonial"
                width={250}
                height={250}
                className="rounded-lg object-cover w-[250px] h-[250px]"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-4">{current.text}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                {"⭐".repeat(Math.floor(current.rating))}☆
                <span className="text-gray-500 text-sm">{current.rating.toFixed(1)}</span>
              </div>
              <div className="mt-2 font-semibold">{current.name}</div>
              <div className="text-sm text-gray-500">{current.role}</div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose us</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At Lustra, we’re more than just a store — we’re a trusted partner in your journey to better health and beauty.
                Here’s why our customers choose us
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-red-500" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Fast & Reliable Delivery Across Cameroon</h4>
                <p className="text-gray-600 text-sm">We ensure quick and secure delivery of all your Longrich products, no matter where you are in Cameroon</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-red-500" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Competitive Prices with Great Value</h4>
                <p className="text-gray-600 text-sm">Enjoy unbeatable prices on authentic Longrich products — premium quality that fits your budget.</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-red-500" />
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Secure and Easy Shopping Experience</h4>
                <p className="text-gray-600 text-sm">Shop confidently on Lustra — secure, easy, and hassle-free from start to finish.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogSection;
