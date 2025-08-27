// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Pagina non trovata</h1>
      <p className="mb-6">Ops! La pagina che stai cercando non esiste.</p>
      <a
        href="/"
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Torna alla Home
      </a>
    </main>
  )
}
