"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../Components/ImageUpload";
import ProductDetails from "../Components/ProductDetails";
import CountdownTimer from "../Components/CountdownTimer";
import { useDeal } from "@/context/DealContext";

const DealPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [dealDuration, setDealDuration] = useState<{ days: number; hours: number; minutes: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const { publishDeal } = useDeal();
  const router = useRouter();

  const [dealStarted, setDealStarted] = useState(false);

  const handleDealExpire = () => {
    alert("Deal expired!");
    setDealStarted(false);
  };

  const handlePublish = () => {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + dealDuration.days);
    endDate.setHours(now.getHours() + dealDuration.hours);
    endDate.setMinutes(now.getMinutes() + dealDuration.minutes);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    publishDeal({
      images,
      name: productName,
      description: productDescription,
      endDate,
    });
    alert("Deal published!");
    router.push("/"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Create Your Deal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Set up your amazing product deal with images, details, and countdown timer
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Product Setup */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <ImageUpload images={images} onImagesChange={setImages} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <ProductDetails
                name={productName}
                description={productDescription}
                onNameChange={setProductName}
                onDescriptionChange={setProductDescription}
              />
            </div>
          </div>

          {/* Right Column - Timer & Publish */}
          <div className="space-y-8">
            {!dealStarted ? (
              <>
                {/* Countdown Timer inputs */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Set Deal Duration</h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <input
                      type="number"
                      min={0}
                      placeholder="Days"
                      value={dealDuration.days}
                      onChange={(e) => setDealDuration(d => ({ ...d, days: Number(e.target.value) }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-center"
                    />
                    <input
                      type="number"
                      min={0}
                      max={23}
                      placeholder="Hours"
                      value={dealDuration.hours}
                      onChange={(e) => setDealDuration(d => ({ ...d, hours: Number(e.target.value) }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-center"
                    />
                    <input
                      type="number"
                      min={0}
                      max={59}
                      placeholder="Minutes"
                      value={dealDuration.minutes}
                      onChange={(e) => setDealDuration(d => ({ ...d, minutes: Number(e.target.value) }))}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-center"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => setDealStarted(true)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Start Deal Countdown
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <CountdownTimer
                  days={dealDuration.days}
                  hours={dealDuration.hours}
                  minutes={dealDuration.minutes}
                  start={dealStarted}
                  onExpire={handleDealExpire}
                />
              </>
            )}

            {/* Publish Button */}
            <div className="text-center">
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Publish Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealPage;
