import React from 'react'
import CompanyCard from './CompanyCard'

export default function CompanyTable({ items, layout }) {
  if (!items.length) {
    return <div className="p-6 text-center text-slate-500">No companies match your filters.</div>
  }

  // layout: 'grid' or 'list'
  return (
    <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
      {items.map(c => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </div>
  )
}
