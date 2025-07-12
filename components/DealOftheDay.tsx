"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Deal {
  name: string;
  description: string;
  images: string[];
  endDate: string;
}

const DealOfTheDay = () => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, second: 0 });

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch("/api/deal");
        const data = await res.json();
        if (data) setDeal(data);
      } catch (error) {
        console.error("Erreur fetch deal:", error);
      }
    };

    fetchDeal();
  }, []);

  useEffect(() => {
    if (!deal) return;

    const endDate = new Date(deal.endDate);
    if (isNaN(endDate.getTime())) {
      console.error("Date invalide:", deal.endDate);
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const distance = endDate.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, second: 0 });
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
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [deal]);

  if (!deal) {
    return <div className="text-center py-16">Aucun deal pour l’instant</div>;
  }

  const endDate = new Date(deal.endDate);
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
            {["days", "hours", "minutes", "second"].map((key) => (
              <div key={key} className="text-center bg-white p-4 rounded shadow">
                <p className="text-3xl font-bold">
                  {timeLeft[key as keyof typeof timeLeft].toString().padStart(2, "0")}
                </p>
                <span className="text-sm text-gray-600">{key}</span>
              </div>
            ))}
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
        {deal.images && deal.images.length > 0 ? (
          <Image src={deal.images[0]} alt={deal.name} width={300} height={400} className="rounded" />
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
