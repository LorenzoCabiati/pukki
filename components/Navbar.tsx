import { FaInstagram, FaSpotify, FaSoundcloud } from "react-icons/fa";

type Props = {
  sections: string[];
  activeSection: number;
  goTo: (i: number) => void;
};

export default function Navbar({ sections, activeSection, goTo }: Props) {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-center px-6 md:px-12 py-4 z-50 text text-lg">
      <div className="flex gap-10">
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

      <div className="absolute right-6 flex gap-4 text-xl">
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
