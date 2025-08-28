import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        relative
        w-full h-auto px-6 pt-2 pb-20
        md:h-screen md:flex md:flex-col md:justify-center md:items-center
      "
    >
      {/* Contenuto centrale */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
          Contact
        </h2>

        <p className="text-gray-400 text-center text-sm md:text-base">
          Per contattarmi compila questo form oppure scrivimi su{" "}
          <a
            href="https://instagram.com/tuoprofilo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{
              background: "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Instagram
          </a>
          .
        </p>

        <form className="flex flex-col gap-6 mt-4">
          <input
            type="text"
            placeholder="Nome"
            className="px-4 py-3 rounded-md bg-neutral-900 text-gray-200 placeholder-gray-500 border-b border-neutral-700 focus:outline-none focus:border-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-neutral-900 text-gray-200 placeholder-gray-500 border-b border-neutral-700 focus:outline-none focus:border-red-500"
          />
          <textarea
            placeholder="Messaggio"
            rows={4}
            className="px-4 py-3 rounded-md bg-neutral-900 text-gray-200 placeholder-gray-500 border-b border-neutral-700 focus:outline-none focus:border-red-500"
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-500 transition-colors"
          >
            Invia
          </button>
        </form>
      </div>

      {/* Footer incollato in basso SOLO su desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full">
        <Footer />
      </div>

      {/* Footer normale per mobile */}
      <div className="block md:hidden w-full">
        <Footer />
      </div>
    </section>
  );
}
