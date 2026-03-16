export interface Service {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'down'
  lastDeployment: string
  version: string
  environment: string
  uptime: string
}

export interface Pipeline {
  id: string
  name: string
  status: 'running' | 'success' | 'failed' | 'pending'
  commitId: string
  commitMessage: string
  duration: string
  triggeredBy: string
  timestamp: string
  branch: string
  logs: string[]
}

export interface Deployment {
  id: string
  service: string
  environment: 'production' | 'staging' | 'development'
  commitHash: string
  timestamp: string
  version: string
  status: 'success' | 'failed' | 'in_progress' | 'rolled_back'
  deployedBy: string
  duration: string
}

export interface Environment {
  id: string
  name: string
  type: 'production' | 'staging' | 'development'
  status: 'active' | 'inactive' | 'degraded'
  activeServices: number
  lastDeployment: string
  configVars: ConfigVar[]
  deploymentHistory: DeploymentSummary[]
}

export interface ConfigVar {
  key: string
  value: string
  masked: boolean
}

export interface DeploymentSummary {
  version: string
  timestamp: string
  status: 'success' | 'failed'
}

export interface Credential {
  id: string
  name: string
  type: 'api_key' | 'ssh_key' | 'cloud_credentials' | 'docker_token'
  createdAt: string
  maskedValue: string
  fullValue: string
  description: string
}

export interface Todo {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: string
  dueDate?: string
  tags: string[]
}

export interface Doc {
  id: string
  title: string
  category: string
  content: string
  lastUpdated: string
}

export interface MetricData {
  totalDeployments: number
  deploymentTrend: number
  runningPipelines: number
  servicesHealthy: number
  servicesWarning: number
  servicesDown: number
  systemHealth: number
}
