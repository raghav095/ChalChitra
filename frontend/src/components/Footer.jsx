import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
  <footer className="footer-theme py-6">
      {/* Dark black glass with blur */}
      <style>{`
        .footer-theme {
          background: linear-gradient(90deg, #1a2233 0%, #283a5b 100%);
          border-top: 2px solid #e7d9b2;
          color: #f8f6f2;
          font-family: 'Poppins', 'Cinzel', serif;
        }
        .footer-logo {
          font-family: 'Cinzel', 'Poppins', serif;
          font-size: 2rem;
          font-weight: 800;
          color: #e7d9b2;
          letter-spacing: 0.08em;
        }
        .footer-section-title {
          color: #e7d9b2;
          font-weight: 600;
          font-size: 1rem;
        }
        .footer-link {
          color: #f8f6f2;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #e7d9b2;
        }
        .footer-divider {
          border-top: 1px solid #e7d9b2;
          margin: 1.5rem 0;
        }
        .footer-bottom {
          color: #e7d9b2;
        }
        .footer-icon {
          color: #e7d9b2;
          transition: color 0.2s;
        }
        .footer-icon:hover {
          color: #f8f6f2;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand / Logo */}
          <div>
            <h1 className="footer-logo">ChalChitra</h1>
            <p className="mt-1 max-w-xs text-sm" style={{color: '#f8f6f2'}}>
              Bringing you the best entertainment experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <div>
              <h2 className="footer-section-title mb-1">Company</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="footer-link">About Us</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Careers</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="footer-section-title mb-1">Support</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="footer-link">Contact</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Help Center</a>
                </li>
                <li>
                  <a href="#" className="footer-link">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
  <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 footer-bottom text-sm">
          <p>© 2025 ChalChitra. All rights reserved.</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/raghav095"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raghav-rathi-4277831b4"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
