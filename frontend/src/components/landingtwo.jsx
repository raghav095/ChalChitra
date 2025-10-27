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
    <section className="classic-info-section py-16 px-6">
      <style>{`
        .classic-info-section {
          background: linear-gradient(90deg, #1a2233 0%, #283a5b 100%);
          border-top: 2px solid #e7d9b2;
          border-bottom: 2px solid #e7d9b2;
        }
        .classic-title {
          font-family: 'Poppins', 'Cinzel', serif;
          font-size: 2.3rem;
          font-weight: 700;
          text-align: center;
          color: #f8f6f2;
          margin-bottom: 2rem;
          letter-spacing: 0.07em;
        }
        @media (max-width: 640px) {
          .classic-title { font-size: 1.5rem; margin-bottom: 1rem; }
          .classic-feature-card { padding: 1rem; }
          .classic-feature-title { font-size: 1rem; }
          .classic-feature-desc { font-size: 0.9rem; }
        }
        .classic-title span {
          color: #e7d9b2;
        }
        .classic-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .classic-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .classic-features {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .classic-feature-card {
          background: linear-gradient(135deg, #22304a 70%, #283a5b 100%);
          border: 1.5px solid #e7d9b2;
          border-radius: 1rem;
          box-shadow: 0 2px 12px #283a5b44;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .classic-feature-card:hover {
          transform: scale(1.04);
          box-shadow: 0 4px 24px #e7d9b255;
        }
        .classic-icon {
          color: #e7d9b2;
          margin-bottom: 1rem;
        }
        .classic-feature-title {
          font-family: 'Cinzel', 'Poppins', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f8f6f2;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }
        .classic-feature-desc {
          font-family: 'Poppins', 'Cinzel', serif;
          color: #e7d9b2;
          font-size: 0.98rem;
          letter-spacing: 0.03em;
        }
      `}</style>
      <h2 className="classic-title">
        Why Choose <span>ChalChitra?</span>
      </h2>

      <div className="classic-features">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="classic-feature-card"
          >
            <div className="classic-icon">{feature.icon}</div>
            <h3 className="classic-feature-title">{feature.title}</h3>
            <p className="classic-feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Info;
