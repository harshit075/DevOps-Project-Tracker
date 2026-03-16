interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
}

const statusConfig: Record<string, { label: string; className: string; dot?: boolean; pulse?: boolean }> = {
  healthy: { label: 'Healthy', className: 'bg-green-500/10 text-green-400 border-green-500/20', dot: true },
  warning: { label: 'Warning', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: true },
  down: { label: 'Down', className: 'bg-red-500/10 text-red-400 border-red-500/20', dot: true },
  running: { label: 'Running', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: true, pulse: true },
  success: { label: 'Success', className: 'bg-green-500/10 text-green-400 border-green-500/20', dot: true },
  failed: { label: 'Failed', className: 'bg-red-500/10 text-red-400 border-red-500/20', dot: true },
  pending: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: true },
  in_progress: { label: 'In Progress', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: true, pulse: true },
  rolled_back: { label: 'Rolled Back', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20', dot: true },
  active: { label: 'Active', className: 'bg-green-500/10 text-green-400 border-green-500/20', dot: true },
  inactive: { label: 'Inactive', className: 'bg-gray-500/10 text-gray-400 border-gray-500/20', dot: true },
  degraded: { label: 'Degraded', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: true },
  critical: { label: 'Critical', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
  high: { label: 'High', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  medium: { label: 'Medium', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  low: { label: 'Low', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  completed: { label: 'Completed', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
  api_key: { label: 'API Key', className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  ssh_key: { label: 'SSH Key', className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  cloud_credentials: { label: 'Cloud Creds', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  docker_token: { label: 'Docker Token', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  production: { label: 'Production', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
  staging: { label: 'Staging', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  development: { label: 'Development', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' }
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.className} ${sizeClass}`}>
      {config.dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          config.pulse ? 'bg-current animate-pulse' : 'bg-current'
        }`}></span>
      )}
      {config.label}
    </span>
  )
}
