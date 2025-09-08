import React from "react";
import { Film, PlayCircle, Gift, Sparkles } from "lucide-react"; // icons

const Info = () => {
  const features = [
    {
      icon: <Film size={40} />,
      title: "All in One Place",
      desc: "Your favourite collection of movies and series at one spot.",
    },
    {
      icon: <PlayCircle size={40} />,
      title: "Unlimited Streaming",
      desc: "Enjoy seamless playback of everything without restrictions.",
    },
    {
      icon: <Gift size={40} />,
      title: "Absolutely Free",
      desc: "No subscriptions, no hidden costs — just pure entertainment.",
    },
    {
      icon: <Sparkles size={40} />,
      title: "New & Upcoming",
      desc: "Stay tuned for exciting new releases and exclusive content.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-16 px-6
">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12 drop-shadow-md">
        Why Choose <span className="text-yellow-300">MoviesMania?</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-yellow-300/30"
          >
            <div className="text-yellow-300 mb-4">{feature.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Info;
