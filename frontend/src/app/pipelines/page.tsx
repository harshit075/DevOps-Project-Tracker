'use client'

import { useState } from 'react'
import { RefreshCw, X, GitBranch, User, Clock, Filter } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import Terminal from '@/components/Terminal'
import { mockPipelines } from '@/lib/mockData'
import { Pipeline } from '@/types'

type StatusFilter = 'all' | 'running' | 'success' | 'failed' | 'pending'

export default function PipelinesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null)
  const [pipelines, setPipelines] = useState<Pipeline[]>(mockPipelines)

  const filtered = filter === 'all' ? pipelines : pipelines.filter(p => p.status === filter)

  const handleRestart = (pipeline: Pipeline) => {
    setPipelines(prev =>
      prev.map(p => p.id === pipeline.id ? { ...p, status: 'running' as const, duration: '-' } : p)
    )
    setTimeout(() => {
      setPipelines(prev =>
        prev.map(p => p.id === pipeline.id ? { ...p, status: 'success' as const, duration: '2m 00s' } : p)
      )
    }, 5000)
  }

  const counts = {
    all: pipelines.length,
    running: pipelines.filter(p => p.status === 'running').length,
    success: pipelines.filter(p => p.status === 'success').length,
    failed: pipelines.filter(p => p.status === 'failed').length,
    pending: pipelines.filter(p => p.status === 'pending').length,
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Pipelines" subtitle="CI/CD pipeline runs and build status" />
      <div className="p-6">

        {/* Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            <Filter size={14} className="text-gray-500 ml-2" />
            {(['all', 'running', 'success', 'failed', 'pending'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  filter === s ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s === 'all' ? `All (${counts.all})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${counts[s]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline List */}
        <div className="space-y-3">
          {filtered.map(pipeline => (
            <div
              key={pipeline.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    pipeline.status === 'success' ? 'bg-green-500/10' :
                    pipeline.status === 'failed' ? 'bg-red-500/10' :
                    pipeline.status === 'running' ? 'bg-blue-500/10' : 'bg-yellow-500/10'
                  }`}>
                    <GitBranch size={18} className={
                      pipeline.status === 'success' ? 'text-green-400' :
                      pipeline.status === 'failed' ? 'text-red-400' :
                      pipeline.status === 'running' ? 'text-blue-400' : 'text-yellow-400'
                    } />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-200">{pipeline.name}</p>
                      <StatusBadge status={pipeline.status} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <span className="font-mono bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{pipeline.commitId}</span>
                      <span className="text-gray-600">·</span>
                      <span className="truncate max-w-[200px]">{pipeline.commitMessage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 sm:shrink-0">
                  <div className="flex items-center gap-1.5">
                    <User size={12} />
                    <span>{pipeline.triggeredBy}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{pipeline.duration}</span>
                  </div>
                  <div className="hidden md:block">
                    <span>{pipeline.timestamp}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPipeline(pipeline)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors border border-gray-700"
                    >
                      View Logs
                    </button>
                    <button
                      onClick={() => handleRestart(pipeline)}
                      className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-600/30 flex items-center gap-1.5"
                    >
                      <RefreshCw size={11} />
                      Restart
                    </button>
                  </div>
                </div>
              </div>

              {pipeline.status === 'running' && (
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Build in progress...</span>
                    <span>~2 min remaining</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-2/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
              <GitBranch size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No pipelines match the filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Logs Modal */}
      {selectedPipeline && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-100">{selectedPipeline.name}</h2>
                  <StatusBadge status={selectedPipeline.status} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Commit: <span className="font-mono">{selectedPipeline.commitId}</span> · {selectedPipeline.commitMessage}
                </p>
              </div>
              <button onClick={() => setSelectedPipeline(null)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <Terminal
                initialLogs={selectedPipeline.logs}
                title={`${selectedPipeline.name} — logs`}
                dynamicLogs={selectedPipeline.status === 'running' ? selectedPipeline.logs : []}
                addLogsInterval={3000}
              />
            </div>
            <div className="px-5 pb-5">
              <div className="flex gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><User size={11} /> {selectedPipeline.triggeredBy}</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {selectedPipeline.duration}</span>
                <span>Branch: {selectedPipeline.branch}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
