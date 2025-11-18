import React, { useMemo } from 'react'
import { useCompanies } from '../context/CompaniesContext'
import { uniqueValues } from '../utils/helpers'

export default function Filters({
  search,
  setSearch,
  location,
  setLocation,
  industry,
  setIndustry,
  sortBy,
  setSortBy
}) {
  const { companies } = useCompanies()

  const locations = useMemo(() => uniqueValues(companies, 'location'), [companies])
  const industries = useMemo(() => uniqueValues(companies, 'industry'), [companies])

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by company name or description..."
          className="w-full input-style p-2 rounded border"
        />
        <select value={location} onChange={e => setLocation(e.target.value)} className="p-2 rounded border">
          <option value="">All locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select value={industry} onChange={e => setIndustry(e.target.value)} className="p-2 rounded border">
          <option value="">All industries</option>
          {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
        </select>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <label className="mr-1">Sort:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="p-2 rounded border">
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
            <option value="founded_desc">Founded (Newest)</option>
            <option value="founded_asc">Founded (Oldest)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
