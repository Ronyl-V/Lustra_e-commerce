"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "../Components/ImageUpload";
import ProductDetails from "../Components/ProductDetails";
import CountdownTimer from "../Components/CountdownTimer";

const DealPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [dealDuration, setDealDuration] = useState({ days: 0, hours: 0, minutes: 0 });
  const router = useRouter();

  const [dealStarted, setDealStarted] = useState(false);

  const handleDealExpire = () => {
    alert("Deal expired!");
    setDealStarted(false);
  };

  const handlePublish = async () => {
    if (!productName || !productDescription || images.length === 0) {
      alert("Merci de remplir tous les champs et d’ajouter une image !");
      return;
    }

    // Calcul de la date de fin du deal
    const now = new Date();
    const end = new Date(now);
    end.setDate(now.getDate() + dealDuration.days);
    end.setHours(now.getHours() + dealDuration.hours);
    end.setMinutes(now.getMinutes() + dealDuration.minutes);
    end.setSeconds(59);

    const payload = {
      name: productName,
      description: productDescription,
      images, // **Assure-toi que c’est un tableau de strings URLs ici !**
      endDate: end.toISOString(),
    };

    try {
      const res = await fetch("/api/deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Erreur: " + (error.error || "Erreur inconnue"));
        return;
      }

      alert("Deal publié !");
      router.push("/");
    } catch (e) {
      alert("Erreur réseau ou serveur !");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Create Your Deal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Set up your amazing product deal with images, details, and countdown timer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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

          <div className="space-y-8">
            {!dealStarted ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Set Deal Duration</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <input
                    type="number"
                    min={0}
                    placeholder="Days"
                    value={dealDuration.days}
                    onChange={(e) =>
                      setDealDuration(d => ({ ...d, days: Number(e.target.value) }))
                    }
                    className="w-full rounded border border-gray-300 px-3 py-2 text-center"
                  />
                  <input
                    type="number"
                    min={0}
                    max={23}
                    placeholder="Hours"
                    value={dealDuration.hours}
                    onChange={(e) =>
                      setDealDuration(d => ({ ...d, hours: Number(e.target.value) }))
                    }
                    className="w-full rounded border border-gray-300 px-3 py-2 text-center"
                  />
                  <input
                    type="number"
                    min={0}
                    max={59}
                    placeholder="Minutes"
                    value={dealDuration.minutes}
                    onChange={(e) =>
                      setDealDuration(d => ({ ...d, minutes: Number(e.target.value) }))
                    }
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
            ) : (
              <CountdownTimer
                days={dealDuration.days}
                hours={dealDuration.hours}
                minutes={dealDuration.minutes}
                start={dealStarted}
                onExpire={handleDealExpire}
              />
            )}

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
