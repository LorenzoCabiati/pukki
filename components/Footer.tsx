// components/Footer.tsx
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        {/* Left: Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://lorenzocabiati.github.io/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition font-medium"
          >
            Lorenzo Cabiati
          </a>
          . All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex gap-4 text-lg">
          <a
            href="mailto:lollo.cabiatida04@gmail.com"
            className="hover:text-red-500 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/lorenzo-cabiati/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
