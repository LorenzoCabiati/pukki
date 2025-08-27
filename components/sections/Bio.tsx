import { FaMusic, FaHeadphones, FaCompactDisc, FaGlobe } from "react-icons/fa";

export default function Bio() {
  return (
    <section
      id="bio"
      className="h-screen w-screen flex flex-col items-center justify-center px-6 md:px-20"
    >
      <div className="max-w-3xl text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-6">Bio</h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          vel risus nec nulla luctus eleifend. Un percorso musicale che nasce
          dall’amore per il suono e cresce con la voglia di sperimentare.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-700"></div>
        <div className="flex flex-col gap-14">
          {[
            {
              year: "2015",
              text: "Inizia a produrre i primi beat.",
              icon: <FaMusic className="text-red-500 text-xl" />,
            },
            {
              year: "2018",
              text: "Collabora con artisti emergenti locali.",
              icon: <FaHeadphones className="text-red-500 text-xl" />,
            },
            {
              year: "2020",
              text: "Pubblica il primo EP autoprodotto.",
              icon: <FaCompactDisc className="text-red-500 text-xl" />,
            },
            {
              year: "2022",
              text: "Lavora a progetti internazionali di mix & master.",
              icon: <FaGlobe className="text-red-500 text-xl" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-6 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="flex-1 text-right">
                {i % 2 === 0 && (
                  <p className="text-gray-500 text-sm">{item.year}</p>
                )}
                <p className="text-lg text-white">{item.text}</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border-2 border-red-500 z-10">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                {i % 2 !== 0 && (
                  <p className="text-gray-500 text-sm">{item.year}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
