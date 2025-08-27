export default function Contact() {
  return (
    <section
      id="contact"
      className="h-screen w-screen flex items-center justify-center px-6 md:px-20"
    >
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center">Contact</h2>
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
    </section>
  );
}
