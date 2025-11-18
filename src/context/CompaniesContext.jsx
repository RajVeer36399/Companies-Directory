import React, { createContext, useContext, useEffect, useState } from 'react'

const CompaniesContext = createContext()

export function useCompanies() {
  return useContext(CompaniesContext)
}

export function CompaniesProvider({ children }) {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abort = new AbortController()
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('/companies.json', { signal: abort.signal })
        if (!res.ok) throw new Error('Failed to load companies.json')
        const data = await res.json()
        setCompanies(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => abort.abort()
  }, [])

  return (
    <CompaniesContext.Provider value={{ companies, loading, error }}>
      {children}
    </CompaniesContext.Provider>
  )
}
