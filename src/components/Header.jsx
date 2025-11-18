import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Companies Directory</h1>
        <p className="text-sm text-slate-600">Filter • Search • Sort • Paginate</p>
      </div>
    </header>
  )
}
