'use client'

import { useState } from 'react'
import { Plus, X, Server, Filter } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { mockServices } from '@/lib/mockData'
import { Service } from '@/types'

type StatusFilter = 'all' | 'healthy' | 'warning' | 'down'

export default function ServicesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [showModal, setShowModal] = useState(false)
  const [services, setServices] = useState<Service[]>(mockServices)
  const [form, setForm] = useState({
    name: '', environment: 'production', version: '', status: 'healthy' as Service['status']
  })

  const filtered = filter === 'all' ? services : services.filter(s => s.status === filter)

  const handleAdd = () => {
    if (!form.name.trim()) return
    const newService: Service = {
      id: String(Date.now()),
      name: form.name,
      status: form.status,
      lastDeployment: 'Just now',
      version: form.version || 'v1.0.0',
      environment: form.environment,
      uptime: '100%',
    }
    setServices(prev => [...prev, newService])
    setForm({ name: '', environment: 'production', version: '', status: 'healthy' })
    setShowModal(false)
  }

  const statusIcon = (status: Service['status']) => {
    if (status === 'healthy') return '🟢'
    if (status === 'warning') return '🟡'
    return '🔴'
  }

  const counts = {
    all: services.length,
    healthy: services.filter(s => s.status === 'healthy').length,
    warning: services.filter(s => s.status === 'warning').length,
    down: services.filter(s => s.status === 'down').length,
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Services" subtitle="Monitor and manage your services" />
      <div className="p-6">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            <Filter size={14} className="text-gray-500 ml-2" />
            {(['all', 'healthy', 'warning', 'down'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  filter === s
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s === 'all' ? `All (${counts.all})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${counts[s]})`}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} /> Add Service
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Service</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Version</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Environment</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Last Deploy</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden xl:table-cell">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((service, i) => (
                <tr key={service.id} className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-950/30'}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center">
                        <Server size={16} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">{service.name}</p>
                        <p className="text-xs text-gray-500 font-mono">svc/{service.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{statusIcon(service.status)}</span>
                      <StatusBadge status={service.status} />
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-mono text-gray-300 bg-gray-800 px-2 py-1 rounded">{service.version}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <StatusBadge status={service.environment} />
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-400">{service.lastDeployment}</span>
                  </td>
                  <td className="px-5 py-4 hidden xl:table-cell">
                    <span className={`text-sm font-medium ${
                      parseFloat(service.uptime) >= 99 ? 'text-green-400' :
                      parseFloat(service.uptime) >= 95 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{service.uptime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Server size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No services match the filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-100">Add New Service</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Service Name</label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  placeholder="my-service"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Version</label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  placeholder="v1.0.0"
                  value={form.version}
                  onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Environment</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.environment}
                  onChange={e => setForm(f => ({ ...f, environment: e.target.value }))}
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Initial Status</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as Service['status'] }))}
                >
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="down">Down</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
