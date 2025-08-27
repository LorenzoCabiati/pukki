import { FaInstagram, FaSpotify, FaSoundcloud } from "react-icons/fa";

type Props = {
  sections: string[];
  activeSection: number;
  goTo: (i: number) => void;
};

export default function Navbar({ sections, activeSection, goTo }: Props) {
  return (
    <nav className="fixed top-0 left-0 w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-4 z-50 text-lg">
      
      {/* Section buttons - hidden on mobile */}
      <div className="hidden md:flex gap-10 mx-auto">
        {sections.slice(1).map((sec, i) => (
          <button
            key={sec}
            onClick={() => goTo(i + 1)}
            className={`uppercase tracking-wide font-medium transition-colors ${
              activeSection === i + 1
                ? "text-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
          >
            {sec.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Social icons - always visible, add margin-top on mobile */}
      <div className="flex gap-4 text-xl mt-4 md:mt-0">
        <a
          href="https://www.instagram.com/el_nicopukki/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-pink-500 transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://open.spotify.com/intl-it/artist/6pwPSVxioPenL7Bw5ibuwx"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-green-500 transition-colors"
        >
          <FaSpotify />
        </a>
        <a
          href="https://soundcloud.com/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-orange-500 transition-colors"
        >
          <FaSoundcloud />
        </a>
      </div>
    </nav>
  );
}
