import {
  Service, Pipeline, Deployment, Environment,
  Credential, Todo, Doc, MetricData
} from '@/types'

export const mockServices: Service[] = [
  { id: '1', name: 'frontend', status: 'healthy', lastDeployment: '2 hours ago', version: 'v2.4.1', environment: 'production', uptime: '99.9%' },
  { id: '2', name: 'backend', status: 'healthy', lastDeployment: '3 hours ago', version: 'v3.1.0', environment: 'production', uptime: '99.7%' },
  { id: '3', name: 'api-gateway', status: 'warning', lastDeployment: '1 day ago', version: 'v1.8.2', environment: 'production', uptime: '97.2%' },
  { id: '4', name: 'database', status: 'healthy', lastDeployment: '5 days ago', version: 'v14.3', environment: 'production', uptime: '100%' },
  { id: '5', name: 'redis', status: 'healthy', lastDeployment: '5 days ago', version: 'v7.2.1', environment: 'production', uptime: '99.99%' },
  { id: '6', name: 'nginx', status: 'down', lastDeployment: '6 hours ago', version: 'v1.24.0', environment: 'staging', uptime: '0%' },
  { id: '7', name: 'worker', status: 'healthy', lastDeployment: '1 hour ago', version: 'v2.0.5', environment: 'staging', uptime: '98.4%' },
  { id: '8', name: 'scheduler', status: 'warning', lastDeployment: '2 days ago', version: 'v1.3.2', environment: 'development', uptime: '94.1%' },
]

export const mockPipelines: Pipeline[] = [
  {
    id: '1', name: 'frontend-ci', status: 'running', commitId: 'a3f9d2c', commitMessage: 'feat: add dark mode toggle',
    duration: '2m 34s', triggeredBy: 'john.doe', timestamp: '5 min ago', branch: 'main',
    logs: [
      '[00:00] Pipeline started',
      '[00:01] Cloning repository...',
      '[00:03] Installing dependencies...',
      '[00:45] Running lint checks...',
      '[01:12] Running unit tests...',
      '[01:58] Building production bundle...',
      '[02:34] Pipeline still running...',
    ]
  },
  {
    id: '2', name: 'backend-deploy', status: 'success', commitId: 'b7e1a4f', commitMessage: 'fix: resolve memory leak in worker',
    duration: '4m 12s', triggeredBy: 'jane.smith', timestamp: '1 hour ago', branch: 'main',
    logs: [
      '[00:00] Pipeline started',
      '[00:02] Pulling Docker image...',
      '[00:30] Running tests...',
      '[01:45] Building image...',
      '[03:00] Pushing to registry...',
      '[04:00] Deploying to production...',
      '[04:12] ✅ Deployment successful',
    ]
  },
  {
    id: '3', name: 'api-gateway-test', status: 'failed', commitId: 'c2d8e5b', commitMessage: 'refactor: update rate limiting',
    duration: '1m 22s', triggeredBy: 'bob.wilson', timestamp: '2 hours ago', branch: 'feature/rate-limit',
    logs: [
      '[00:00] Pipeline started',
      '[00:01] Cloning repository...',
      '[00:10] Installing dependencies...',
      '[00:35] Running tests...',
      '[01:00] FAILED: Test suite "RateLimiter" failed',
      '[01:05] Error: Expected 429, got 200',
      '[01:22] ❌ Pipeline failed',
    ]
  },
  {
    id: '4', name: 'database-migration', status: 'pending', commitId: 'd4f7b1e', commitMessage: 'chore: add new indices',
    duration: '-', triggeredBy: 'alice.jones', timestamp: '10 min ago', branch: 'main',
    logs: ['[00:00] Waiting in queue...']
  },
  {
    id: '5', name: 'redis-config', status: 'success', commitId: 'e9c3a6d', commitMessage: 'config: update maxmemory policy',
    duration: '0m 45s', triggeredBy: 'john.doe', timestamp: '3 hours ago', branch: 'main',
    logs: [
      '[00:00] Pipeline started',
      '[00:05] Applying config changes...',
      '[00:30] Restarting service...',
      '[00:44] Health check passed',
      '[00:45] ✅ Config applied successfully',
    ]
  },
  {
    id: '6', name: 'nginx-ssl-renew', status: 'failed', commitId: 'f1b8d4c', commitMessage: 'fix: renew SSL certificates',
    duration: '0m 33s', triggeredBy: 'automation', timestamp: '6 hours ago', branch: 'main',
    logs: [
      '[00:00] Pipeline started',
      '[00:05] Checking certificate expiry...',
      '[00:10] Requesting new certificate...',
      '[00:20] ERROR: ACME challenge failed',
      '[00:33] ❌ SSL renewal failed',
    ]
  },
]

export const mockDeployments: Deployment[] = [
  { id: '1', service: 'frontend', environment: 'production', commitHash: 'a3f9d2c', timestamp: '2024-01-15 14:32:00', version: 'v2.4.1', status: 'success', deployedBy: 'john.doe', duration: '3m 12s' },
  { id: '2', service: 'backend', environment: 'production', commitHash: 'b7e1a4f', timestamp: '2024-01-15 13:20:00', version: 'v3.1.0', status: 'success', deployedBy: 'jane.smith', duration: '4m 22s' },
  { id: '3', service: 'api-gateway', environment: 'staging', commitHash: 'c2d8e5b', timestamp: '2024-01-15 11:45:00', version: 'v1.8.2', status: 'failed', deployedBy: 'bob.wilson', duration: '1m 55s' },
  { id: '4', service: 'nginx', environment: 'staging', commitHash: 'd4f7b1e', timestamp: '2024-01-15 10:30:00', version: 'v1.24.0', status: 'in_progress', deployedBy: 'alice.jones', duration: '-' },
  { id: '5', service: 'redis', environment: 'production', commitHash: 'e9c3a6d', timestamp: '2024-01-14 16:00:00', version: 'v7.2.1', status: 'success', deployedBy: 'john.doe', duration: '0m 45s' },
  { id: '6', service: 'worker', environment: 'development', commitHash: 'f1b8d4c', timestamp: '2024-01-14 12:15:00', version: 'v2.0.5', status: 'success', deployedBy: 'jane.smith', duration: '2m 10s' },
  { id: '7', service: 'frontend', environment: 'staging', commitHash: 'g5e2f9a', timestamp: '2024-01-13 09:00:00', version: 'v2.4.0', status: 'rolled_back', deployedBy: 'bob.wilson', duration: '5m 00s' },
  { id: '8', service: 'database', environment: 'production', commitHash: 'h8c4b3d', timestamp: '2024-01-10 08:00:00', version: 'v14.3', status: 'success', deployedBy: 'alice.jones', duration: '15m 30s' },
]

export const mockEnvironments: Environment[] = [
  {
    id: '1', name: 'Production', type: 'production', status: 'active', activeServices: 5,
    lastDeployment: '2024-01-15 14:32:00',
    configVars: [
      { key: 'NODE_ENV', value: 'production', masked: false },
      { key: 'DATABASE_URL', value: 'postgresql://user:pass@prod-db:5432/app', masked: true },
      { key: 'REDIS_URL', value: 'redis://prod-redis:6379', masked: true },
      { key: 'API_KEY', value: 'pk_live_abc123xyz789', masked: true },
      { key: 'PORT', value: '8080', masked: false },
    ],
    deploymentHistory: [
      { version: 'v2.4.1', timestamp: '2024-01-15', status: 'success' },
      { version: 'v2.4.0', timestamp: '2024-01-10', status: 'success' },
      { version: 'v2.3.9', timestamp: '2024-01-05', status: 'failed' },
    ]
  },
  {
    id: '2', name: 'Staging', type: 'staging', status: 'degraded', activeServices: 4,
    lastDeployment: '2024-01-15 11:45:00',
    configVars: [
      { key: 'NODE_ENV', value: 'staging', masked: false },
      { key: 'DATABASE_URL', value: 'postgresql://user:pass@staging-db:5432/app', masked: true },
      { key: 'REDIS_URL', value: 'redis://staging-redis:6379', masked: true },
      { key: 'API_KEY', value: 'pk_test_def456uvw012', masked: true },
      { key: 'PORT', value: '8080', masked: false },
    ],
    deploymentHistory: [
      { version: 'v2.4.1', timestamp: '2024-01-15', status: 'failed' },
      { version: 'v2.4.0', timestamp: '2024-01-12', status: 'success' },
      { version: 'v2.3.9', timestamp: '2024-01-08', status: 'success' },
    ]
  },
  {
    id: '3', name: 'Development', type: 'development', status: 'active', activeServices: 3,
    lastDeployment: '2024-01-14 12:15:00',
    configVars: [
      { key: 'NODE_ENV', value: 'development', masked: false },
      { key: 'DATABASE_URL', value: 'postgresql://localhost:5432/dev_app', masked: false },
      { key: 'REDIS_URL', value: 'redis://localhost:6379', masked: false },
      { key: 'DEBUG', value: 'true', masked: false },
      { key: 'PORT', value: '3000', masked: false },
    ],
    deploymentHistory: [
      { version: 'v2.5.0-dev', timestamp: '2024-01-14', status: 'success' },
      { version: 'v2.4.2-dev', timestamp: '2024-01-13', status: 'success' },
      { version: 'v2.4.1-dev', timestamp: '2024-01-12', status: 'failed' },
    ]
  },
]

export const mockCredentials: Credential[] = [
  { id: '1', name: 'AWS Production Access', type: 'cloud_credentials', createdAt: '2024-01-01', maskedValue: '••••••••XKWP', fullValue: 'AKIAIOSFODNN7EXAMPLEXKWP', description: 'AWS IAM access key for production deployments' },
  { id: '2', name: 'GitHub Actions Token', type: 'api_key', createdAt: '2024-01-05', maskedValue: '••••••••ghp_', fullValue: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', description: 'GitHub personal access token for CI/CD' },
  { id: '3', name: 'Deploy SSH Key', type: 'ssh_key', createdAt: '2023-12-15', maskedValue: '••••••••BEGIN', fullValue: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA...', description: 'SSH key for deployment servers' },
  { id: '4', name: 'Docker Hub Token', type: 'docker_token', createdAt: '2024-01-10', maskedValue: '••••••••dckr', fullValue: 'dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxx', description: 'Docker Hub access token for image push/pull' },
  { id: '5', name: 'GCP Service Account', type: 'cloud_credentials', createdAt: '2023-11-20', maskedValue: '••••••••json', fullValue: '{"type":"service_account","project_id":"my-project"...}', description: 'Google Cloud service account credentials' },
  { id: '6', name: 'Datadog API Key', type: 'api_key', createdAt: '2024-01-08', maskedValue: '••••••••dd0c', fullValue: 'dd0cxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', description: 'Datadog monitoring API key' },
]

export const mockTodos: Todo[] = [
  { id: '1', title: 'Set up Kubernetes cluster on EKS', description: 'Configure EKS cluster with auto-scaling node groups and deploy core services', priority: 'critical', status: 'in_progress', createdAt: '2024-01-10', dueDate: '2024-01-20', tags: ['kubernetes', 'aws', 'infrastructure'] },
  { id: '2', title: 'Implement secrets rotation policy', description: 'Set up automated rotation for all production secrets using AWS Secrets Manager', priority: 'high', status: 'pending', createdAt: '2024-01-11', dueDate: '2024-01-25', tags: ['security', 'aws', 'automation'] },
  { id: '3', title: 'Configure Prometheus alerting rules', description: 'Set up alerting rules for CPU >80%, memory >90%, and error rate >1%', priority: 'high', status: 'pending', createdAt: '2024-01-12', tags: ['monitoring', 'prometheus', 'alerting'] },
  { id: '4', title: 'Update Terraform modules to v5', description: 'Migrate all existing Terraform configurations to support Terraform v5 syntax', priority: 'medium', status: 'pending', createdAt: '2024-01-13', tags: ['terraform', 'infrastructure'] },
  { id: '5', title: 'SSL certificate renewal automation', description: 'Fix ACME challenge failure for nginx SSL certificate auto-renewal', priority: 'critical', status: 'pending', createdAt: '2024-01-15', dueDate: '2024-01-16', tags: ['ssl', 'nginx', 'security'] },
  { id: '6', title: 'Docker image vulnerability scan', description: 'Integrate Trivy scanner into CI pipeline for all Docker images', priority: 'high', status: 'in_progress', createdAt: '2024-01-08', tags: ['docker', 'security', 'ci-cd'] },
  { id: '7', title: 'Set up log aggregation with ELK', description: 'Deploy Elasticsearch, Logstash, and Kibana for centralized logging', priority: 'medium', status: 'pending', createdAt: '2024-01-09', tags: ['logging', 'elk', 'monitoring'] },
  { id: '8', title: 'Database backup verification', description: 'Verify automated backups are working and test restore procedure', priority: 'medium', status: 'completed', createdAt: '2024-01-05', tags: ['database', 'backup'] },
  { id: '9', title: 'ArgoCD GitOps setup', description: 'Configure ArgoCD for GitOps-based deployments across all environments', priority: 'medium', status: 'in_progress', createdAt: '2024-01-07', tags: ['argocd', 'gitops', 'kubernetes'] },
  { id: '10', title: 'Document runbooks for incidents', description: 'Write incident response runbooks for top 5 most common failure scenarios', priority: 'low', status: 'pending', createdAt: '2024-01-14', tags: ['documentation', 'incidents'] },
]

export const mockDocs: Doc[] = [
  {
    id: '1', title: 'Kubernetes Cheatsheet', category: 'Kubernetes', lastUpdated: '2024-01-15',
    content: `# Kubernetes Cheatsheet

## Cluster Info
\`\`\`bash
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
\`\`\`

## Pod Management
\`\`\`bash
# List all pods
kubectl get pods --all-namespaces
kubectl get pods -n <namespace>

# Describe pod
kubectl describe pod <pod-name> -n <namespace>

# Get pod logs
kubectl logs <pod-name> -n <namespace>
kubectl logs -f <pod-name> -n <namespace>  # Follow logs

# Execute command in pod
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash

# Delete pod
kubectl delete pod <pod-name> -n <namespace>
\`\`\`

## Deployment Management
\`\`\`bash
# Get deployments
kubectl get deployments -n <namespace>

# Scale deployment
kubectl scale deployment <name> --replicas=3 -n <namespace>

# Update image
kubectl set image deployment/<name> <container>=<image>:<tag> -n <namespace>

# Rollback deployment
kubectl rollout undo deployment/<name> -n <namespace>

# Check rollout status
kubectl rollout status deployment/<name> -n <namespace>
\`\`\`

## Service & Networking
\`\`\`bash
kubectl get services -n <namespace>
kubectl get ingress -n <namespace>
kubectl port-forward pod/<pod-name> 8080:80 -n <namespace>
\`\`\`

## ConfigMaps & Secrets
\`\`\`bash
kubectl get configmaps -n <namespace>
kubectl get secrets -n <namespace>
kubectl describe secret <secret-name> -n <namespace>
\`\`\`
`
  },
  {
    id: '2', title: 'Docker Commands Reference', category: 'Docker', lastUpdated: '2024-01-12',
    content: `# Docker Commands Reference

## Images
\`\`\`bash
# Build image
docker build -t myapp:latest .
docker build -t myapp:v1.0 -f Dockerfile.prod .

# List images
docker images
docker image ls

# Pull/Push images
docker pull nginx:alpine
docker push myregistry/myapp:latest

# Remove images
docker rmi myapp:latest
docker image prune -a  # Remove all unused images
\`\`\`

## Containers
\`\`\`bash
# Run container
docker run -d --name myapp -p 8080:80 myapp:latest
docker run -it --rm ubuntu:22.04 /bin/bash

# List containers
docker ps
docker ps -a  # Include stopped containers

# Stop/Start/Restart
docker stop myapp
docker start myapp
docker restart myapp

# Remove container
docker rm myapp
docker rm -f myapp  # Force remove running container

# Logs
docker logs myapp
docker logs -f myapp  # Follow logs
docker logs --tail=100 myapp
\`\`\`

## Docker Compose
\`\`\`bash
docker compose up -d
docker compose down
docker compose ps
docker compose logs -f
docker compose exec myservice /bin/bash
\`\`\`

## System
\`\`\`bash
docker system df       # Disk usage
docker system prune    # Remove unused data
docker stats           # Live resource usage
\`\`\`
`
  },
  {
    id: '3', title: 'AWS CLI Reference', category: 'AWS', lastUpdated: '2024-01-10',
    content: `# AWS CLI Reference

## EC2
\`\`\`bash
# List instances
aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name,PublicIpAddress]' --output table

# Start/Stop instances
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Create key pair
aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem
\`\`\`

## S3
\`\`\`bash
# List buckets
aws s3 ls

# Copy files
aws s3 cp local-file.txt s3://my-bucket/
aws s3 sync ./local-folder s3://my-bucket/remote-folder

# Remove files
aws s3 rm s3://my-bucket/file.txt
aws s3 rm s3://my-bucket/ --recursive
\`\`\`

## EKS
\`\`\`bash
# Update kubeconfig
aws eks update-kubeconfig --name my-cluster --region us-east-1

# List clusters
aws eks list-clusters

# Describe cluster
aws eks describe-cluster --name my-cluster
\`\`\`

## ECR
\`\`\`bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name my-app
\`\`\`
`
  },
  {
    id: '4', title: 'CI/CD Pipeline Guide', category: 'CI/CD', lastUpdated: '2024-01-14',
    content: `# CI/CD Pipeline Guide

## GitHub Actions Example
\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Build application
        run: npm run build

  docker-build:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t myapp:\${{ github.sha }} .

      - name: Push to registry
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:\${{ github.sha }}

  deploy:
    needs: docker-build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/myapp myapp=myapp:\${{ github.sha }}
\`\`\`

## Pipeline Stages
1. **Code** - Push code to repository
2. **Build** - Compile/bundle application
3. **Test** - Unit, integration, e2e tests
4. **Scan** - Security vulnerability scanning
5. **Package** - Create Docker image
6. **Deploy** - Deploy to target environment
`
  },
  {
    id: '5', title: 'Troubleshooting Runbook', category: 'Troubleshooting', lastUpdated: '2024-01-15',
    content: `# Troubleshooting Runbook

## Pod Stuck in CrashLoopBackOff
\`\`\`bash
# Check pod logs
kubectl logs <pod-name> -n <namespace> --previous

# Describe pod for events
kubectl describe pod <pod-name> -n <namespace>

# Common causes:
# 1. Application error - check logs
# 2. Wrong image tag - check deployment manifest
# 3. Missing ConfigMap/Secret - check volume mounts
# 4. Insufficient resources - check resource limits
\`\`\`

## High Memory Usage
\`\`\`bash
# Check node resource usage
kubectl top nodes

# Check pod resource usage
kubectl top pods -n <namespace>

# Find memory-hungry pods
kubectl top pods --all-namespaces --sort-by=memory

# Check for memory leaks
kubectl exec -it <pod-name> -- cat /proc/meminfo
\`\`\`

## Database Connection Issues
\`\`\`bash
# Test connectivity from pod
kubectl exec -it <app-pod> -- nc -zv <db-host> 5432

# Check database logs
kubectl logs <db-pod> -n <namespace>

# Verify secret exists
kubectl get secret db-credentials -o yaml
\`\`\`

## SSL Certificate Issues
\`\`\`bash
# Check certificate expiry
openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# Force cert-manager renewal
kubectl delete certificate <cert-name> -n <namespace>

# Check cert-manager logs
kubectl logs -n cert-manager deploy/cert-manager
\`\`\`

## Pipeline Failures
1. Check build logs for specific error
2. Verify environment variables and secrets
3. Test Docker build locally
4. Check registry authentication
5. Validate Kubernetes manifests
`
  },
]

export const mockMetrics: MetricData = {
  totalDeployments: 142,
  deploymentTrend: 12,
  runningPipelines: 3,
  servicesHealthy: 5,
  servicesWarning: 2,
  servicesDown: 1,
  systemHealth: 87,
}

export const deploymentFrequencyData = [
  { day: 'Mon', deployments: 4 },
  { day: 'Tue', deployments: 7 },
  { day: 'Wed', deployments: 3 },
  { day: 'Thu', deployments: 9 },
  { day: 'Fri', deployments: 6 },
  { day: 'Sat', deployments: 2 },
  { day: 'Sun', deployments: 5 },
]

export const pipelineSuccessData = [
  { day: 'Mon', rate: 85 },
  { day: 'Tue', rate: 92 },
  { day: 'Wed', rate: 78 },
  { day: 'Thu', rate: 95 },
  { day: 'Fri', rate: 88 },
  { day: 'Sat', rate: 100 },
  { day: 'Sun', rate: 91 },
]
