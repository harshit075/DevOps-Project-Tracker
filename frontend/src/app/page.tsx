'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, GitBranch, CheckCircle, Zap, Shield } from 'lucide-react'
import Terminal from '@/components/Terminal'

const PipelineAnimation3D = dynamic(() => import('@/components/PipelineAnimation3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

const heroLogs = [
  '$ git push origin main',
  'Enumerating objects: 24, done.',
  '✓ Pipeline triggered: frontend-ci #142',
  '$ docker build -t app:a3f9d2c .',
  'Step 1/10 : FROM node:20-alpine',
  '✓ Build completed in 28.4s',
  '$ trivy image app:a3f9d2c',
  '✓ No critical vulnerabilities found',
  '$ kubectl set image deployment/app app=registry/app:a3f9d2c',
  'deployment.apps/app image updated',
  '$ kubectl rollout status deployment/app',
  '✓ Deployment "app" successfully rolled out',
  '🚀 Pipeline #142 completed in 3m 45s',
]

const cicdSteps = [
  { icon: '💻', label: 'Code', color: 'text-blue-400', borderColor: 'border-blue-500/40', bg: 'bg-blue-500/10' },
  { icon: '⚙️', label: 'Build', color: 'text-purple-400', borderColor: 'border-purple-500/40', bg: 'bg-purple-500/10' },
  { icon: '🧪', label: 'Test', color: 'text-yellow-400', borderColor: 'border-yellow-500/40', bg: 'bg-yellow-500/10' },
  { icon: '🔍', label: 'Scan', color: 'text-orange-400', borderColor: 'border-orange-500/40', bg: 'bg-orange-500/10' },
  { icon: '🚀', label: 'Deploy', color: 'text-green-400', borderColor: 'border-green-500/40', bg: 'bg-green-500/10' },
]

const features = [
  { icon: GitBranch, title: 'Pipeline Monitoring', desc: 'Track CI/CD pipelines in real-time with status badges and log viewer', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: CheckCircle, title: 'Health Monitoring', desc: 'Monitor service health across environments with instant alerts', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Zap, title: 'Fast Deployments', desc: 'Manage deployments across production, staging, and development', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: Shield, title: 'Secure Credentials', desc: 'Store and manage secrets, API keys, and SSH keys securely', color: 'text-purple-400', bg: 'bg-purple-500/10' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <PipelineAnimation3D />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0e1a]/50 via-transparent to-[#0a0e1a]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0e1a] via-transparent to-[#0a0e1a]" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-[1] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs text-blue-400 mb-8"
          >
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Unified DevOps Infrastructure Control
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-100 leading-tight max-w-4xl mb-6"
          >
            Control Your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              DevOps Infrastructure
            </span>{' '}
            in One Dashboard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
          >
            Monitor CI/CD pipelines, manage deployments, track service health, and store credentials —
            all from a single, unified DevOps dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] text-base"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-8 py-3.5 rounded-xl border border-gray-700 hover:border-gray-600 transition-all text-base"
            >
              View Docs
            </Link>
          </motion.div>

          {/* CI/CD Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-2 flex-wrap justify-center"
          >
            {cicdSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 ${step.bg} border ${step.borderColor} rounded-lg`}
                >
                  <span>{step.icon}</span>
                  <span className={`text-sm font-medium ${step.color}`}>{step.label}</span>
                </motion.div>
                {i < cicdSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-gray-600"
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Terminal at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 px-6 pb-16 max-w-4xl mx-auto w-full"
        >
          <Terminal
            initialLogs={heroLogs.slice(0, 4)}
            title="pipeline runner — bash"
            dynamicLogs={heroLogs}
            addLogsInterval={2000}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Everything You Need to Manage DevOps
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From pipeline monitoring to secrets management, every tool you need in one place.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="text-base font-semibold text-gray-200 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
