'use client'

import { useState } from 'react'
import { BookOpen, Edit, Eye, Save, X, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Header from '@/components/Header'
import { mockDocs } from '@/lib/mockData'
import { Doc } from '@/types'

const categories = ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Troubleshooting']

const categoryColors: Record<string, string> = {
  Kubernetes: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Docker: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  AWS: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'CI/CD': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Troubleshooting: 'text-red-400 bg-red-500/10 border-red-500/20',
}

export default function DocsPage() {
  const [docs, setDocs] = useState<Doc[]>(mockDocs)
  const [selectedDoc, setSelectedDoc] = useState<Doc>(docs[0])
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(true)

  const filteredDocs = selectedCategory
    ? docs.filter(d => d.category === selectedCategory)
    : docs

  const startEdit = () => {
    setEditContent(selectedDoc.content)
    setIsEditing(true)
    setPreviewMode(false)
  }

  const saveEdit = () => {
    const updated = docs.map(d =>
      d.id === selectedDoc.id
        ? { ...d, content: editContent, lastUpdated: new Date().toISOString().split('T')[0] }
        : d
    )
    setDocs(updated)
    setSelectedDoc({ ...selectedDoc, content: editContent })
    setIsEditing(false)
    setPreviewMode(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setPreviewMode(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      <Header title="Documentation" subtitle="Technical docs and runbooks" />
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-gray-800 bg-gray-900/50 overflow-y-auto">
          <div className="p-4">
            {/* Category Filters */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
            <div className="space-y-1 mb-5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === null ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                All Docs
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-xs text-gray-600">
                    {docs.filter(d => d.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Doc List */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Documents</p>
            <div className="space-y-1">
              {filteredDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => { setSelectedDoc(doc); setIsEditing(false); setPreviewMode(true) }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    selectedDoc.id === doc.id
                      ? 'bg-blue-600/20 border border-blue-600/30'
                      : 'hover:bg-gray-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight size={12} className={selectedDoc.id === doc.id ? 'text-blue-400' : 'text-gray-600'} />
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${selectedDoc.id === doc.id ? 'text-blue-400' : 'text-gray-300'}`}>
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${categoryColors[doc.category] ?? 'text-gray-400'}`}>
                          {doc.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Doc Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-blue-400" />
              <div>
                <h2 className="text-base font-semibold text-gray-100">{selectedDoc.title}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded border ${categoryColors[selectedDoc.category] ?? 'text-gray-400'}`}>
                    {selectedDoc.category}
                  </span>
                  <span className="text-xs text-gray-500">Last updated: {selectedDoc.lastUpdated}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center gap-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-lg transition-colors border border-gray-700"
                  >
                    {previewMode ? <Edit size={14} /> : <Eye size={14} />}
                    {previewMode ? 'Edit' : 'Preview'}
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 px-3 py-2 rounded-lg transition-colors">
                    <X size={14} /> Cancel
                  </button>
                  <button onClick={saveEdit} className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors">
                    <Save size={14} /> Save
                  </button>
                </>
              ) : (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-lg transition-colors border border-gray-700"
                >
                  <Edit size={14} /> Edit
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {isEditing && !previewMode ? (
              <textarea
                className="w-full h-full min-h-[500px] bg-gray-900 border border-gray-700 rounded-xl p-4 text-sm text-gray-200 font-mono focus:outline-none focus:border-blue-500 resize-none"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
              />
            ) : (
              <div className="prose prose-invert prose-sm max-w-none
                prose-headings:text-gray-100 prose-headings:font-bold
                prose-p:text-gray-300
                prose-code:text-green-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
                prose-strong:text-gray-200
                prose-li:text-gray-300
                prose-a:text-blue-400">
                <ReactMarkdown>{isEditing ? editContent : selectedDoc.content}</ReactMarkdown>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
