type Props = {
  sections: string[];
  activeSection: number;
  goTo: (i: number) => void;
};

export default function SectionIndicators({ sections, activeSection, goTo }: Props) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-5 z-50 hidden md:flex">
      {sections.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          className={`w-3 h-3 rounded-full transition-all ${
            activeSection === i ? "bg-red-500 scale-125" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
