import { FaArrowUp } from "react-icons/fa";

type Props = {
  activeSection: number;
  goTo: (i: number) => void;
};

export default function ScrollToTopButton({ activeSection, goTo }: Props) {
  return (
    <button
      onClick={() => goTo(0)}
      className={`fixed bottom-6 right-6 bg-red-600 hover:bg-red-500 text-white p-3 rounded-full shadow-lg transition-all z-50
        ${activeSection === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <FaArrowUp />
    </button>
  );
}
