# Node.js Weather App with GitOps CI/CD Pipeline

[![CI Status](https://img.shields.io/jenkins/build?jobUrl=YOUR_JENKINS_URL)](https://YOUR_JENKINS_URL)
[![Docker Image](https://img.shields.io/docker/v/YOUR_DOCKERHUB/weather-app/latest)](https://hub.docker.com/r/YOUR_DOCKERHUB/weather-app)
[![GitOps Status](https://img.shields.io/badge/ArgoCD-Synced-success)](https://YOUR_ARGO_URL)

Production-grade weather application implementing GitOps methodology with Jenkins CI and ArgoCD.

## Key Features
- **End-to-End Automation**: Jenkins pipeline builds, tests, and publishes Docker images
- **Declarative GitOps**: ArgoCD maintains cluster state from Git repository
- **Immutable Infrastructure**: Versioned container deployments
- **Secure Configuration**: Kubernetes Secrets with RBAC
- **Rollback Ready**: Git history provides atomic deployment control

## Technology Stack
| Component          | Technology          |
|--------------------|---------------------|
| CI System          | Jenkins             |
| Container Registry | Docker Hub          |
| CD System          | ArgoCD              |
| Orchestration      | Kubernetes          |
| Application        | Node.js + Express   |

## Getting Started

### Prerequisites
- Kubernetes cluster (v1.22+)
- Jenkins with Docker and Kubernetes plugins
- ArgoCD v2.4+
- Docker Hub repository

### Deployment
```bash
# Create ArgoCD application
argocd app create weather-app \
  --repo https://github.com/YOUR_REPO/weather-app.git \
  --path k8s/manifests \
  --revision HEAD \
  --dest-namespace weather-prod \
  --sync-policy automated
CI/CD Workflow
Code commit triggers Jenkins pipeline

Docker image built and pushed to registry

Kubernetes manifests updated in Git

ArgoCD automatically synchronizes changes


graph LR
    Commit --> Jenkins
    Jenkins --> DockerHub
    DockerHub --> GitRepo
    GitRepo --> ArgoCD
    ArgoCD --> Kubernetes
Repository Structure

.
├── src/                  # Application source code
├── k8s/                  # Kubernetes resources
│   ├── deployment.yaml   # ReplicaSet configuration
│   ├── service.yaml      # Network exposure
│   └── ingress.yaml      # Routing rules
├── Jenkinsfile           # Pipeline definition
├── Dockerfile            # Container specification
└── helm/                 # Helm chart templates
Security
API credentials in Kubernetes Secrets

Image scanning in CI pipeline

ArgoCD project RBAC

Network policies for pod communication

Monitoring
ArgoCD application health status

Kubernetes pod logs

Prometheus metrics endpoint

Liveness/readiness probes