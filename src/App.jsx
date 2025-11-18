import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import CompanyTable from './components/CompanyTable'
import Pagination from './components/Pagination'
import { useCompanies } from './context/CompaniesContext'
import { uniqueValues } from './utils/helpers'

export default function App() {
  const { companies, loading, error } = useCompanies()
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('')
  const [sortBy, setSortBy] = useState('name_asc')
  const [page, setPage] = useState(1)
  const [perPage] = useState(6)
  const [layout, setLayout] = useState('grid') // or 'list'

  // Filtering + searching + sorting
  const filtered = useMemo(() => {
    let data = companies.slice()

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      data = data.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      )
    }
    if (location) data = data.filter(c => c.location === location)
    if (industry) data = data.filter(c => c.industry === industry)

    if (sortBy === 'name_asc') data.sort((a,b) => a.name.localeCompare(b.name))
    if (sortBy === 'name_desc') data.sort((a,b) => b.name.localeCompare(a.name))
    if (sortBy === 'founded_asc') data.sort((a,b) => a.founded - b.founded)
    if (sortBy === 'founded_desc') data.sort((a,b) => b.founded - a.founded)

    return data
  }, [companies, search, location, industry, sortBy])

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage)
  const current = filtered.slice((page - 1) * perPage, page * perPage)

  // reset page when filters change
  React.useEffect(() => setPage(1), [search, location, industry, sortBy])

  // small UI
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Filters
            search={search} setSearch={setSearch}
            location={location} setLocation={setLocation}
            industry={industry} setIndustry={setIndustry}
            sortBy={sortBy} setSortBy={setSortBy}
          />
          <div className="w-44">
            <div className="bg-white rounded-lg shadow p-3 flex flex-col gap-3">
              <label className="text-sm text-slate-600">Layout</label>
              <div className="flex gap-2">
                <button onClick={() => setLayout('grid')} className={`p-2 rounded border ${layout==='grid' ? 'bg-slate-800 text-white' : ''}`}>Grid</button>
                <button onClick={() => setLayout('list')} className={`p-2 rounded border ${layout==='list' ? 'bg-slate-800 text-white' : ''}`}>List</button>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                Total: <strong className="text-slate-700">{filtered.length}</strong>
              </div>
            </div>
          </div>
        </div>

        <section>
          {loading && <div className="p-8 text-center">Loading companies…</div>}
          {error && <div className="p-8 text-center text-red-600">Error: {error}</div>}

          {!loading && !error && (
            <>
              <CompanyTable items={current} layout={layout} />
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </>
          )}
        </section>
      </main>
    </div>
  )
}
