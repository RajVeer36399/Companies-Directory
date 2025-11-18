import React from 'react'

export default function CompanyCard({ company }) {
  return (
    <article className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{company.name}</h3>
          <p className="text-sm text-slate-600">{company.industry} • {company.location}</p>
        </div>
        <div className="text-sm text-slate-500">{company.size}</div>
      </div>

      <p className="mt-3 text-sm text-slate-700">{company.description}</p>

      <div className="mt-4 text-xs text-slate-500 flex items-center justify-between">
        <span>Founded: {company.founded}</span>
        <span>ID: {company.id}</span>
      </div>
    </article>
  )
}
