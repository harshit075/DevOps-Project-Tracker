'use client'

import { useState } from 'react'
import { Plus, X, Check, Filter } from 'lucide-react'
import Header from '@/components/Header'
import StatusBadge from '@/components/StatusBadge'
import { mockTodos } from '@/lib/mockData'
import { Todo } from '@/types'

type PriorityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low'
type StatusFilter = 'all' | 'pending' | 'in_progress' | 'completed'

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '',
    priority: 'medium' as Todo['priority'],
    dueDate: '', tags: ''
  })

  const filtered = todos.filter(t => {
    const p = priorityFilter === 'all' || t.priority === priorityFilter
    const s = statusFilter === 'all' || t.status === statusFilter
    return p && s
  })

  const markComplete = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' as const } : t))
  }

  const markInProgress = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: 'in_progress' as const } : t))
  }

  const handleAdd = () => {
    if (!form.title.trim()) return
    const todo: Todo = {
      id: String(Date.now()),
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: form.dueDate || undefined,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    setTodos(prev => [todo, ...prev])
    setForm({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' })
    setShowModal(false)
  }

  const priorityColors: Record<string, string> = {
    critical: 'border-l-red-500',
    high: 'border-l-orange-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-blue-500',
  }

  const counts = {
    pending: todos.filter(t => t.status === 'pending').length,
    in_progress: todos.filter(t => t.status === 'in_progress').length,
    completed: todos.filter(t => t.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Todos" subtitle="DevOps task management" />
      <div className="p-6">

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Pending', count: counts.pending, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
            { label: 'In Progress', count: counts.in_progress, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
            { label: 'Completed', count: counts.completed, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Add */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            <Filter size={14} className="text-gray-500 ml-2" />
            {(['all', 'critical', 'high', 'medium', 'low'] as PriorityFilter[]).map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  priorityFilter === p ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
            {(['all', 'pending', 'in_progress', 'completed'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === s ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} /> Add Task
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filtered.map(todo => (
            <div
              key={todo.id}
              className={`bg-gray-900 border border-gray-800 border-l-4 ${priorityColors[todo.priority]} rounded-xl p-4 hover:border-gray-700 transition-all ${
                todo.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => todo.status !== 'completed' && markComplete(todo.id)}
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    todo.status === 'completed'
                      ? 'border-green-400 bg-green-400/20 text-green-400'
                      : 'border-gray-600 hover:border-green-400'
                  }`}
                >
                  {todo.status === 'completed' && <Check size={11} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className={`text-sm font-semibold ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                      {todo.title}
                    </p>
                    <StatusBadge status={todo.priority} />
                    <StatusBadge status={todo.status} />
                  </div>
                  {todo.description && (
                    <p className="text-xs text-gray-500 mb-2">{todo.description}</p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    {todo.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                    {todo.dueDate && (
                      <span className="text-xs text-gray-500">Due: {todo.dueDate}</span>
                    )}
                  </div>
                </div>
                {todo.status === 'pending' && (
                  <button
                    onClick={() => markInProgress(todo.id)}
                    className="text-xs bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-600/30 shrink-0"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
              <Check size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No tasks match the filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-100">Add New Task</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  placeholder="Task title"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600 resize-none"
                  placeholder="Task description..."
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Priority</label>
                  <select
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value as Todo['priority'] }))}
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                    value={form.dueDate}
                    onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Tags (comma separated)</label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                  placeholder="kubernetes, aws, security"
                  value={form.tags}
                  onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium py-2.5 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
