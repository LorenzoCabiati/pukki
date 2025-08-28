import { FaMusic, FaHeadphones, FaCompactDisc, FaGlobe, FaWaveSquare, FaLaptop } from "react-icons/fa";

export default function Bio() {
  return (
    <section
      id="bio"
      className="h-screen w-full flex flex-col items-center justify-center px-6 md:px-16"
    >
      {/* Intro */}
      <div className="max-w-2xl text-center mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 md:mb-4">
          About Me
        </h2>
        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
          Sono un <span className="text-red-500 font-semibold">music producer</span> e{" "}
          <span className="text-red-500 font-semibold">mix & mastering engineer</span>, 
          con un percorso che unisce passione per il suono, ricerca estetica e sperimentazione.
        </p>
      </div>

      {/* Avatar */}
      <div className="mb-6 md:mb-8 hidden md:flex">
        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-3 md:border-4 border-red-500 shadow-lg">
          <img
            src="/images/profilepukki.jpg"
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Timeline compatta */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
        {[
          {
            year: "2015",
            text: "Primi beat e sperimentazioni urban.",
            icon: <FaMusic className="text-red-500 text-base md:text-lg" />,
          },
          {
            year: "2018",
            text: "Collaborazioni con artisti locali.",
            icon: <FaHeadphones className="text-red-500 text-base md:text-lg" />,
          },
          {
            year: "2020",
            text: "Primo EP autoprodotto.",
            icon: <FaCompactDisc className="text-red-500 text-base md:text-lg" />,
          },
          {
            year: "2022 - oggi",
            text: "Mix & master per progetti internazionali.",
            icon: <FaGlobe className="text-red-500 text-base md:text-lg" />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center bg-neutral-900/50 p-3 md:p-4 rounded-xl border border-neutral-800 hover:border-red-500 transition"
          >
            <div className="mb-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-950 border border-red-500">
              {item.icon}
            </div>
            <p className="text-gray-500 text-xs md:text-sm">{item.year}</p>
            <p className="text-white text-xs md:text-base">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {[
          { label: "Hip-Hop", icon: <FaMusic /> },
          { label: "Electronic", icon: <FaWaveSquare /> },
          { label: "Mixing", icon: <FaHeadphones /> },
          { label: "Mastering", icon: <FaLaptop /> },
          { label: "Lo-Fi / Chill", icon: <FaCompactDisc /> },
        ].map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-1 px-2 md:px-3 py-1 bg-neutral-800 rounded-full border border-neutral-700 text-gray-300 text-xs md:text-sm hover:border-red-500 hover:text-red-500 transition"
          >
            {skill.icon}
            <span>{skill.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
