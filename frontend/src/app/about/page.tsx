'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Terminal, Cloud, Code2, Activity } from 'lucide-react'
import Header from '@/components/Header'

const skills = [
  { name: 'Docker', level: 95, color: 'bg-blue-500', icon: '🐳' },
  { name: 'Kubernetes', level: 90, color: 'bg-blue-400', icon: '⚙️' },
  { name: 'Terraform', level: 85, color: 'bg-purple-500', icon: '🏗️' },
  { name: 'Ansible', level: 80, color: 'bg-red-500', icon: '🔧' },
  { name: 'CI/CD', level: 92, color: 'bg-green-500', icon: '🔄' },
  { name: 'Python', level: 88, color: 'bg-yellow-500', icon: '🐍' },
  { name: 'Bash/Shell', level: 94, color: 'bg-gray-400', icon: '💻' },
  { name: 'Prometheus', level: 82, color: 'bg-orange-500', icon: '📊' },
]

const cloudPlatforms = ['AWS', 'GCP', 'Azure', 'DigitalOcean']
const cicdTools = ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'CircleCI']
const monitoringTools = ['Prometheus', 'Grafana', 'Datadog', 'ELK Stack', 'Jaeger']
const devTools = ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Helm', 'Vault']

const badgeColors = [
  'bg-blue-500/10 border-blue-500/30 text-blue-400',
  'bg-green-500/10 border-green-500/30 text-green-400',
  'bg-purple-500/10 border-purple-500/30 text-purple-400',
  'bg-orange-500/10 border-orange-500/30 text-orange-400',
  'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  'bg-red-500/10 border-red-500/30 text-red-400',
]

function Badge({ label, index }: { label: string; index: number }) {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${badgeColors[index % badgeColors.length]}`}>
      {label}
    </span>
  )
}

function SkillBar({ skill, delay }: { skill: typeof skills[0]; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="About" subtitle="Developer profile and tech stack" />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Profile Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center sticky top-20"
              >
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto">
                    <Terminal size={40} className="text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>

                <h2 className="text-xl font-bold text-gray-100 mb-1">DevOps Engineer</h2>
                <p className="text-sm text-blue-400 mb-1">Platform Engineering</p>
                <p className="text-xs text-gray-500 mb-4">📍 Cloud Infrastructure</p>

                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  Passionate about building reliable, scalable infrastructure. Specializing in cloud-native
                  technologies, automation, and GitOps workflows.
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {[
                    { icon: Github, label: 'GitHub', color: 'hover:text-gray-200' },
                    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
                    { icon: Mail, label: 'Email', color: 'hover:text-green-400' },
                  ].map(({ icon: Icon, label, color }) => (
                    <button
                      key={label}
                      title={label}
                      className={`p-2.5 bg-gray-800 rounded-lg text-gray-500 ${color} transition-colors`}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-gray-800 space-y-2 text-left">
                  {[
                    { label: 'Experience', value: '5+ years' },
                    { label: 'Projects', value: '30+' },
                    { label: 'Certifications', value: 'AWS, CKA, CKAD' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-gray-300 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-blue-400" />
                  <h3 className="text-sm font-semibold text-gray-200">Technical Skills</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 0.08} />
                  ))}
                </div>
              </motion.div>

              {/* Cloud Platforms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cloud size={16} className="text-orange-400" />
                  <h3 className="text-sm font-semibold text-gray-200">Cloud Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cloudPlatforms.map((t, i) => <Badge key={t} label={t} index={i} />)}
                </div>
              </motion.div>

              {/* CI/CD Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={16} className="text-green-400" />
                  <h3 className="text-sm font-semibold text-gray-200">CI/CD Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cicdTools.map((t, i) => <Badge key={t} label={t} index={i + 1} />)}
                </div>
              </motion.div>

              {/* DevOps Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={16} className="text-purple-400" />
                  <h3 className="text-sm font-semibold text-gray-200">DevOps Toolchain</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {devTools.map((t, i) => <Badge key={t} label={t} index={i + 2} />)}
                </div>
              </motion.div>

              {/* Monitoring */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} className="text-yellow-400" />
                  <h3 className="text-sm font-semibold text-gray-200">Monitoring & Observability</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {monitoringTools.map((t, i) => <Badge key={t} label={t} index={i + 3} />)}
                </div>
              </motion.div>

              {/* This App's Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-5"
              >
                <h3 className="text-sm font-semibold text-gray-200 mb-3">This Application&apos;s Tech Stack</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Next.js 14', 'TypeScript', 'TailwindCSS',
                    'Three.js', 'Framer Motion', 'Recharts',
                    'React Markdown', 'Lucide React', 'App Router',
                  ].map((tech, i) => (
                    <div key={tech} className={`text-xs px-3 py-2 rounded-lg border text-center font-medium ${badgeColors[i % badgeColors.length]}`}>
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
