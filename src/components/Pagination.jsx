import React from 'react'

export default function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null

  const prev = () => setPage(p => Math.max(1, p - 1))
  const next = () => setPage(p => Math.min(totalPages, p + 1))

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-4">
      <button onClick={prev} className="px-3 py-1 rounded border bg-white">Prev</button>
      <div className="flex gap-1">
        {pages.map(n => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`px-3 py-1 rounded ${n === page ? 'bg-slate-800 text-white' : 'bg-white border'}`}
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={next} className="px-3 py-1 rounded border bg-white">Next</button>
    </nav>
  )
}
