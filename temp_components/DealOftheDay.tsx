"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDeal } from "@/context/DealContext";
const DealOfTheDay = () => {
  const { deal } = useDeal();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, second: 0 });

  useEffect(() => {
    if (!deal || !deal.endDate) return;

    const endDate = deal.endDate instanceof Date ? deal.endDate : new Date(deal.endDate);

    const updateTimer = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 , second: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            second: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [deal]);

  if (!deal) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">No Deal Available</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Check back later for exclusive deals!
        </p>
      </div>
    );
  }

  const endDate = deal.endDate instanceof Date ? deal.endDate : new Date(deal.endDate);
  const now = new Date();
  const distance = endDate.getTime() - now.getTime();

  if (distance <= 0) {
    return (
      <div className="text-center py-16 text-red-600 font-bold">
        Deal Expired! Stay tuned for new offers.
      </div>
    );
  }

  return (
    <div className="w-screen bg-[#f4e8e1] max-h-screen flex items-center justify-center pt-1 px-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-2/3 px-6 flex flex-col items-center justify-center">
        <section className="py-16 px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Deal Of The Day</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">{deal.description}</p>

          <div className="flex justify-center gap-4 mb-8">
            <div className="text-center bg-white p-4 rounded shadow">
              <p className="text-3xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</p>
              <span className="text-sm text-gray-600">Days</span>
            </div>
            <div className="text-center bg-white p-4 rounded shadow">
              <p className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</p>
              <span className="text-sm text-gray-600">Hours</span>
            </div>
            <div className="text-center bg-white p-4 rounded shadow">
              <p className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</p>
              <span className="text-sm text-gray-600">Minutes</span>
            </div>
            <div className="text-center bg-white p-4 rounded shadow">
              <p className="text-3xl font-bold">{timeLeft.second.toString().padStart(2, "0")}</p>
              <span className="text-sm text-gray-600">Seconds</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/products">
              <button className="bg-black cursor-pointer text-white px-6 py-2 rounded-full text-sm">
                SHOP NOW
              </button>
            </Link>
          </div>
        </section>
      </div>
      <div
        className="hidden md:block h-full flex items-center justify-center"
        style={{ width: "min(450px, 50vw)" }}
      >
        {deal.images.length > 0 ? (
          <Image
            src={deal.images[0]}
            alt={deal.name}
            width={300}
            height={400}
            className="rounded"
          />
        ) : (
          <div className="w-72 h-96 bg-gray-200 rounded flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default DealOfTheDay;
