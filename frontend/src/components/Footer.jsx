import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/70 backdrop-blur-md border-t border-gray-800 text-white py-6">
      {/* Dark black glass with blur */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand / Logo */}
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">MoviesMania</h1>
            <p className="mt-1 text-gray-300 max-w-xs text-sm">
              Bringing you the best entertainment experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <div>
              <h2 className="font-semibold mb-1 text-sm text-white/90">Company</h2>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">Careers</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-1 text-sm text-white/90">Support</h2>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-gray-300 text-sm">
          <p>© 2025 MoviesMania. All rights reserved.</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/raghav095"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raghav-rathi-4277831b4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
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
