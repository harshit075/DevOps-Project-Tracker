'use client'

import { useState } from 'react'
import { Plus, X, Eye, EyeOff, ShieldAlert, Key, Copy, Check } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { mockCredentials } from '@/lib/mockData'
import { Credential } from '@/types'

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>(mockCredentials)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [confirmReveal, setConfirmReveal] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', type: 'api_key' as Credential['type'],
    description: '', value: ''
  })

  const toggleReveal = (id: string) => {
    if (!revealed.has(id)) {
      setConfirmReveal(id)
      return
    }
    setRevealed(prev => { const n = new Set(prev); n.delete(id); return n })
  }

  const confirmAndReveal = () => {
    if (confirmReveal) {
      setRevealed(prev => { const n = new Set(prev); n.add(confirmReveal); return n })
      setConfirmReveal(null)
    }
  }

  const handleCopy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleAdd = () => {
    if (!form.name.trim() || !form.value.trim()) return
    const newCred: Credential = {
      id: String(Date.now()),
      name: form.name,
      type: form.type,
      createdAt: new Date().toISOString().split('T')[0],
      maskedValue: '••••••••' + form.value.slice(-4),
      fullValue: form.value,
      description: form.description,
    }
    setCredentials(prev => [...prev, newCred])
    setForm({ name: '', type: 'api_key', description: '', value: '' })
    setShowModal(false)
  }

  const typeIcons: Record<string, string> = {
    api_key: '🔑',
    ssh_key: '🗝️',
    cloud_credentials: '☁️',
    docker_token: '🐳',
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Credentials" subtitle="Manage secrets and API credentials" />
      <div className="p-6">

        {/* Warning Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <ShieldAlert size={20} className="text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-400">Encrypted Storage</p>
            <p className="text-xs text-yellow-400/70 mt-0.5">
              All credentials are encrypted at rest using AES-256. Never share credentials in plain text.
              Reveals are logged for audit purposes.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">{credentials.length} credentials stored</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} /> Add Credential
          </button>
        </div>

        {/* Credentials Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Value</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Created</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map(cred => (
                <tr key={cred.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-base">
                        {typeIcons[cred.type]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-200">{cred.name}</p>
                        <p className="text-xs text-gray-500 hidden sm:block truncate max-w-[200px]">{cred.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={cred.type} />
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded font-mono">
                        {revealed.has(cred.id) ? cred.fullValue : cred.maskedValue}
                      </code>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">{cred.createdAt}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleReveal(cred.id)}
                        className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2.5 py-1.5 rounded-lg transition-colors border border-gray-700"
                      >
                        {revealed.has(cred.id) ? <EyeOff size={12} /> : <Eye size={12} />}
                        {revealed.has(cred.id) ? 'Hide' : 'Reveal'}
                      </button>
                      {revealed.has(cred.id) && (
                        <button
                          onClick={() => handleCopy(cred.id, cred.fullValue)}
                          className="flex items-center gap-1.5 text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-2.5 py-1.5 rounded-lg transition-colors border border-blue-600/30"
                        >
                          {copied === cred.id ? <Check size={12} /> : <Copy size={12} />}
                          {copied === cred.id ? 'Copied!' : 'Copy'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Reveal Modal */}
      {confirmReveal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={24} className="text-yellow-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-100 mb-2">Reveal Credential?</h3>
            <p className="text-sm text-gray-400 mb-5">This action will be logged. Make sure you&apos;re in a secure environment.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmReveal(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={confirmAndReveal} className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                Reveal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Credential Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Key size={18} className="text-blue-400" />
                <h2 className="text-base font-semibold text-gray-100">Add Credential</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Name', key: 'name', placeholder: 'e.g. AWS Production Key' },
                { label: 'Description', key: 'description', placeholder: 'What is this credential used for?' },
                { label: 'Value', key: 'value', placeholder: 'Paste credential value here' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.key === 'value' ? 'password' : 'text'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Type</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value as Credential['type'] }))}
                >
                  <option value="api_key">API Key</option>
                  <option value="ssh_key">SSH Key</option>
                  <option value="cloud_credentials">Cloud Credentials</option>
                  <option value="docker_token">Docker Registry Token</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">Add Credential</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
