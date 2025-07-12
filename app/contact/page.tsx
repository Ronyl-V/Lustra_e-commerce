"use client";
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Image from 'next/image';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.send(
      'service_trcm4l7',
      'template_2vqhnga',
      formData,
      '_Yq-iqC4vDW4Oy6fz'
    ).then(() => {
      alert('Message sent successfully!');
    }, (error) => {
      alert('Failed to send message. Please try again.');
      console.error(error.text);
    });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center mt-20 p-4 sm:p-8 bg-white relative">
        <form
          onSubmit={sendEmail}
          className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 relative"
        >
          {/* FORMULAIRE */}
          <div className="w-full lg:w-5/6 space-y-6 p-4 sm:p-6 lg:p-8 lg:pr-40 border border-gray-200 rounded-lg shadow-lg bg-white">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
              <p className="text-gray-600">
                Feel free to contact us any time. We will get back to you as soon as we can!
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black"
                  placeholder="Your email"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-24 focus:outline-none focus:border-black"
                  placeholder="Your message"
                  required
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8'>
              <button
                type="submit"
                className="w-full sm:w-1/2 cursor-pointer bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition"
              >
                SEND
              </button>
              <p className="hidden sm:block">Or</p>
              <a
                href="https://wa.me/237676127652"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 cursor-pointer flex flex-row gap-2 justify-center items-center bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition"
              >
                Contact Us Here
                <span className="rounded-full bg-white p-1">
                  <Image src="/whatsapp.png" alt="whatsapp" width={30} height={30} />
                </span>
              </a>
            </div>
          </div>

          {/* INFO ENTREPRISE */}
          <div
            className="w-full lg:w-1/3 h-auto bg-black text-white p-6 rounded-lg shadow-xl flex flex-col justify-center
                       lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:max-h-[400px] lg:z-10"
          >
            <h2 className="text-xl font-semibold mb-4">Info</h2>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-gray-400">Phone:</span>
                <span>+237 6 76 12 76 52</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-400">Address:</span>
                <span>Douala Cameroon</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-400">Hours:</span>
                <span>08:00-18:00</span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
