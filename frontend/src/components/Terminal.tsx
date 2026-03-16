'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react'

interface TerminalProps {
  initialLogs?: string[]
  title?: string
  autoScroll?: boolean
  addLogsInterval?: number
  dynamicLogs?: string[]
  className?: string
}

const defaultDynamicLogs = [
  '$ git push origin main',
  'Counting objects: 12, done.',
  'Delta compression using up to 8 threads.',
  'Compressing objects: 100% (8/8), done.',
  'Writing objects: 100% (12/12), 1.23 KiB | 1.23 MiB/s, done.',
  '✓ Triggering pipeline: frontend-ci',
  '$ docker build -t app:latest .',
  'Step 1/10 : FROM node:20-alpine',
  'Step 2/10 : WORKDIR /app',
  'Step 3/10 : COPY package*.json ./',
  'Step 4/10 : RUN npm ci --only=production',
  'Step 5/10 : COPY . .',
  'Step 6/10 : RUN npm run build',
  '✓ Build completed in 34.2s',
  '$ docker push registry.io/app:latest',
  '✓ Image pushed successfully',
  '$ kubectl set image deployment/app app=registry.io/app:latest',
  'deployment.apps/app image updated',
  '$ kubectl rollout status deployment/app',
  'Waiting for deployment "app" rollout to finish...',
  '✓ Deployment "app" successfully rolled out',
  '$ curl -s https://api.example.com/health | jq .status',
  '"healthy"',
  '✓ Health check passed',
  '🚀 Pipeline completed in 4m 12s',
]

export default function Terminal({
  initialLogs = [],
  title = 'terminal',
  autoScroll = true,
  addLogsInterval = 2500,
  dynamicLogs = defaultDynamicLogs,
  className = '',
}: TerminalProps) {
  const [logs, setLogs] = useState<string[]>(initialLogs)
  const [logIndex, setLogIndex] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dynamicLogs.length === 0) return
    const interval = setInterval(() => {
      setLogIndex(prev => {
        const next = prev < dynamicLogs.length ? prev + 1 : 0
        setLogs(current => {
          const newLog = dynamicLogs[prev % dynamicLogs.length]
          const updated = [...current, newLog]
          return updated.slice(-80)
        })
        return next
      })
    }, addLogsInterval)
    return () => clearInterval(interval)
  }, [dynamicLogs, addLogsInterval])

  useEffect(() => {
    if (autoScroll && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, autoScroll, minimized])

  const getLogColor = (log: string) => {
    if (log.startsWith('✓') || log.startsWith('🚀')) return 'text-green-400'
    if (log.startsWith('✗') || log.includes('ERROR') || log.includes('error')) return 'text-red-400'
    if (log.startsWith('$')) return 'text-blue-400 font-semibold'
    if (log.startsWith('Waiting')) return 'text-yellow-400'
    return 'text-green-300/80'
  }

  return (
    <div className={`bg-gray-950 border border-gray-800 rounded-xl overflow-hidden font-mono ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <TerminalIcon size={14} />
            <span className="text-xs">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(m => !m)}
            className="p-1 text-gray-500 hover:text-gray-300 rounded transition-colors"
          >
            {minimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
        </div>
      </div>
      {!minimized && (
        <div className="h-64 overflow-y-auto p-4 text-xs leading-relaxed">
          {logs.length === 0 && (
            <span className="text-gray-600">Waiting for output...</span>
          )}
          {logs.map((log, i) => (
            <div key={i} className={`${getLogColor(log)} mb-0.5`}>
              {log}
            </div>
          ))}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-blue-400">$</span>
            <span className="w-2 h-4 bg-green-400 animate-blink inline-block ml-1"></span>
          </div>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
