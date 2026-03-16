'use client'

import { useState } from 'react'
import { Globe, Eye, EyeOff, Edit, X, Plus, Trash2 } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { mockEnvironments } from '@/lib/mockData'
import { Environment, ConfigVar } from '@/types'

export default function EnvironmentsPage() {
  const [environments, setEnvironments] = useState<Environment[]>(mockEnvironments)
  const [revealedVars, setRevealedVars] = useState<Set<string>>(new Set())
  const [editingEnv, setEditingEnv] = useState<Environment | null>(null)
  const [newVarKey, setNewVarKey] = useState('')
  const [newVarValue, setNewVarValue] = useState('')

  const toggleReveal = (envId: string, key: string) => {
    const id = `${envId}:${key}`
    setRevealedVars(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isRevealed = (envId: string, key: string) => revealedVars.has(`${envId}:${key}`)

  const addVar = () => {
    if (!newVarKey.trim() || !editingEnv) return
    const newVar: ConfigVar = { key: newVarKey.toUpperCase(), value: newVarValue, masked: newVarValue.length > 6 }
    setEnvironments(prev =>
      prev.map(e => e.id === editingEnv.id
        ? { ...e, configVars: [...e.configVars, newVar] }
        : e
      )
    )
    setEditingEnv(prev => prev ? { ...prev, configVars: [...prev.configVars, newVar] } : null)
    setNewVarKey('')
    setNewVarValue('')
  }

  const removeVar = (envId: string, key: string) => {
    setEnvironments(prev =>
      prev.map(e => e.id === envId
        ? { ...e, configVars: e.configVars.filter(v => v.key !== key) }
        : e
      )
    )
  }

  const envCardColors: Record<string, { bg: string; border: string; badge: string }> = {
    production: { bg: 'bg-red-500/5', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400' },
    staging: { bg: 'bg-yellow-500/5', border: 'border-yellow-500/30', badge: 'bg-yellow-500/20 text-yellow-400' },
    development: { bg: 'bg-blue-500/5', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-400' },
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Environments" subtitle="Manage your deployment environments" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {environments.map(env => {
            const colors = envCardColors[env.type]
            return (
              <div key={env.id} className={`bg-gray-900 border ${colors.border} rounded-2xl overflow-hidden`}>
                {/* Card Header */}
                <div className={`${colors.bg} px-5 py-4 border-b border-gray-800`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-800/80 flex items-center justify-center">
                        <Globe size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-100">{env.name}</p>
                        <p className="text-xs text-gray-500">{env.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={env.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Services</span>
                      <span className="font-semibold text-gray-200 text-base">{env.activeServices}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500">Last Deploy</span>
                      <span className="text-gray-300 text-xs">{env.lastDeployment.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Config Vars */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Config Variables</p>
                    <button
                      onClick={() => setEditingEnv(env)}
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Edit size={12} /> Edit
                    </button>
                  </div>
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {env.configVars.map(v => (
                      <div key={v.key} className="flex items-center justify-between gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-mono text-blue-400 truncate">{v.key}</p>
                          <p className="text-xs font-mono text-gray-400 truncate">
                            {v.masked && !isRevealed(env.id, v.key)
                              ? '•'.repeat(Math.min(v.value.length, 16))
                              : v.value
                            }
                          </p>
                        </div>
                        {v.masked && (
                          <button
                            onClick={() => toggleReveal(env.id, v.key)}
                            className="shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            {isRevealed(env.id, v.key) ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment History */}
                <div className="px-5 py-4 border-t border-gray-800">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Deployment History</p>
                  <div className="space-y-1.5">
                    {env.deploymentHistory.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${d.status === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className="font-mono text-gray-300">{d.version}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <span>{d.timestamp}</span>
                          <span className={d.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                            {d.status === 'success' ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Edit Config Modal */}
      {editingEnv && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h2 className="text-base font-semibold text-gray-100">Edit Config: {editingEnv.name}</h2>
              <button onClick={() => setEditingEnv(null)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-1">
                {editingEnv.configVars.map(v => (
                  <div key={v.key} className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                    <p className="text-xs font-mono text-blue-400 w-1/3 truncate">{v.key}</p>
                    <p className="text-xs font-mono text-gray-300 flex-1 truncate">{v.value}</p>
                    <button
                      onClick={() => removeVar(editingEnv.id, v.key)}
                      className="text-gray-600 hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-xs font-medium text-gray-400 mb-3">Add New Variable</p>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600 uppercase"
                    placeholder="KEY_NAME"
                    value={newVarKey}
                    onChange={e => setNewVarKey(e.target.value.toUpperCase())}
                  />
                  <input
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs font-mono text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                    placeholder="value"
                    value={newVarValue}
                    onChange={e => setNewVarValue(e.target.value)}
                  />
                  <button
                    onClick={addVar}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={() => setEditingEnv(null)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
