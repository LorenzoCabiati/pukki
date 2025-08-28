export default function Home() {
  return (
    <section
      id="home"
      className="
        w-screen h-auto md:h-screen flex flex-col justify-start md:justify-center items-start
        px-6 sm:px-10 md:px-20 pt-48 sm:pt-40 md:py-0 relative overflow-visible
        bg-no-repeat
        md:bg-[url('/images/pukki_tagliato_red.png')]
        md:bg-[length:auto_90%] md:bg-[position:80%_bottom]
      "
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 relative z-10">
        Pukki
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 max-w-xl leading-relaxed relative z-10">
        Music Producer & Mix/Master Engineer
      </p>
      <p className="text-md text-gray-500 mb-8 relative z-10">
        Subtitle.
      </p>
      <button
        onClick={() => window.open("#", "_blank")}
        className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-500 transition-colors relative z-10"
      >
        Beat su misura
      </button>
    </section>
  );
}
