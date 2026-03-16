'use client'

import { Rocket, GitBranch, Server, Activity, Clock, CheckCircle } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import Header from '@/components/Header'
import MetricCard from '@/components/MetricCard'
import StatusBadge from '@/components/StatusBadge'
import { mockMetrics, mockDeployments, mockPipelines, deploymentFrequencyData, pipelineSuccessData } from '@/lib/mockData'

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-blue-400">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const recentDeployments = mockDeployments.slice(0, 5)
  const recentPipelines = mockPipelines.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <Header title="Dashboard" subtitle="System overview and metrics" />
      <div className="p-6 space-y-6">

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Deployments"
            value={mockMetrics.totalDeployments}
            icon={<Rocket size={20} />}
            trend={mockMetrics.deploymentTrend}
            trendLabel="vs last month"
            accentColor="blue"
          />
          <MetricCard
            title="Running Pipelines"
            value={mockMetrics.runningPipelines}
            icon={<GitBranch size={20} />}
            subtitle="Active builds right now"
            accentColor="purple"
          />
          <MetricCard
            title="Service Health"
            value={`${mockMetrics.servicesHealthy}/${mockMetrics.servicesHealthy + mockMetrics.servicesWarning + mockMetrics.servicesDown}`}
            icon={<Server size={20} />}
            subtitle={`${mockMetrics.servicesWarning} warning · ${mockMetrics.servicesDown} down`}
            accentColor="green"
          />
          <MetricCard
            title="System Health"
            value={`${mockMetrics.systemHealth}%`}
            icon={<Activity size={20} />}
            trend={-3}
            trendLabel="vs yesterday"
            accentColor="yellow"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-200 mb-1">Deployment Frequency</h3>
            <p className="text-xs text-gray-500 mb-5">Last 7 days</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deploymentFrequencyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
                <Bar dataKey="deployments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-200 mb-1">Pipeline Success Rate</h3>
            <p className="text-xs text-gray-500 mb-5">Last 7 days (%)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={pipelineSuccessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Deployments */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Rocket size={16} className="text-blue-400" />
              <h3 className="text-sm font-semibold text-gray-200">Recent Deployments</h3>
            </div>
            <div className="space-y-3">
              {recentDeployments.map(d => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Rocket size={14} className="text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">{d.service}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-sm text-xs ${
                          d.environment === 'production' ? 'bg-red-400' :
                          d.environment === 'staging' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></span>
                        {d.environment} · {d.version}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-2 shrink-0">
                    <StatusBadge status={d.status} />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                      <Clock size={10} /> {d.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Pipelines */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch size={16} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-gray-200">Recent Pipeline Runs</h3>
            </div>
            <div className="space-y-3">
              {recentPipelines.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <GitBranch size={14} className="text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{p.commitId} · {p.branch}</p>
                    </div>
                  </div>
                  <div className="text-right ml-2 shrink-0">
                    <StatusBadge status={p.status} />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                      <Clock size={10} /> {p.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Status Grid */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} className="text-green-400" />
            <h3 className="text-sm font-semibold text-gray-200">Environment Summary</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { env: 'Production', color: 'bg-red-400', services: 5, status: 'Healthy', statusColor: 'text-green-400' },
              { env: 'Staging', color: 'bg-yellow-400', services: 4, status: 'Degraded', statusColor: 'text-yellow-400' },
              { env: 'Development', color: 'bg-blue-400', services: 3, status: 'Active', statusColor: 'text-green-400' },
            ].map(item => (
              <div key={item.env} className="bg-gray-800/60 rounded-lg p-4 text-center">
                <div className={`w-2 h-2 rounded-full ${item.color} mx-auto mb-2`}></div>
                <p className="text-sm font-medium text-gray-200">{item.env}</p>
                <p className="text-2xl font-bold text-gray-100 mt-1">{item.services}</p>
                <p className="text-xs text-gray-500">services</p>
                <p className={`text-xs font-medium mt-1 ${item.statusColor}`}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
