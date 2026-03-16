'use client'

import { useState } from 'react'
import { Rocket, Filter, Calendar, User, Clock, GitCommit } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { mockDeployments } from '@/lib/mockData'

type EnvFilter = 'all' | 'production' | 'staging' | 'development'
type StatusFilter = 'all' | 'success' | 'failed' | 'in_progress' | 'rolled_back'

export default function DeploymentsPage() {
  const [envFilter, setEnvFilter] = useState<EnvFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filtered = mockDeployments.filter(d => {
    const envMatch = envFilter === 'all' || d.environment === envFilter
    const statusMatch = statusFilter === 'all' || d.status === statusFilter
    return envMatch && statusMatch
  })

  const envColors: Record<string, string> = {
    production: 'border-l-red-500 bg-red-500/5',
    staging: 'border-l-yellow-500 bg-yellow-500/5',
    development: 'border-l-blue-500 bg-blue-500/5',
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Deployments" subtitle="Deployment history across all environments" />
      <div className="p-6">

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: mockDeployments.length, color: 'text-gray-200' },
            { label: 'Successful', value: mockDeployments.filter(d => d.status === 'success').length, color: 'text-green-400' },
            { label: 'Failed', value: mockDeployments.filter(d => d.status === 'failed').length, color: 'text-red-400' },
            { label: 'In Progress', value: mockDeployments.filter(d => d.status === 'in_progress').length, color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            <Filter size={14} className="text-gray-500 ml-2" />
            {(['all', 'production', 'staging', 'development'] as EnvFilter[]).map(e => (
              <button
                key={e}
                onClick={() => setEnvFilter(e)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  envFilter === e ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            {(['all', 'success', 'failed', 'in_progress', 'rolled_back'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  statusFilter === s ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {filtered.map(deployment => (
            <div
              key={deployment.id}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${envColors[deployment.environment]} rounded-xl p-4 hover:border-gray-700 transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    deployment.status === 'success' ? 'bg-green-500/10' :
                    deployment.status === 'failed' ? 'bg-red-500/10' :
                    deployment.status === 'in_progress' ? 'bg-blue-500/10' : 'bg-orange-500/10'
                  }`}>
                    <Rocket size={18} className={
                      deployment.status === 'success' ? 'text-green-400' :
                      deployment.status === 'failed' ? 'text-red-400' :
                      deployment.status === 'in_progress' ? 'text-blue-400' : 'text-orange-400'
                    } />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-200">{deployment.service}</p>
                      <StatusBadge status={deployment.status} />
                      <StatusBadge status={deployment.environment} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <GitCommit size={11} />
                        <span className="font-mono text-gray-400">{deployment.commitHash}</span>
                      </span>
                      <span className="text-gray-600">·</span>
                      <span>{deployment.version}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 sm:shrink-0 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <User size={12} />
                    <span>{deployment.deployedBy}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{deployment.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{deployment.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
              <Rocket size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No deployments match the filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
