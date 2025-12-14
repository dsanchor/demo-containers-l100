# Dev Container Configuration

This development container provides a complete development environment for the Angular Container Demo application with all necessary runtimes and tools.

## Included Features

### Runtimes & Tools
- **Node.js 20**: For Angular development
- **Docker-in-Docker**: Full Docker support for building and running containers
- **Azure CLI**: For Azure cloud operations
- **GitHub CLI**: For GitHub operations

### VS Code Extensions
- **GitHub Copilot**: AI-powered code completion and chat
- **Angular Language Service**: Enhanced Angular development experience
- **Docker**: Container management and visualization
- **Azure Account**: Azure integration
- **ESLint & Prettier**: Code formatting and linting

## Getting Started

### Prerequisites
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Opening the Dev Container

1. Open this repository in VS Code
2. When prompted, click "Reopen in Container" or:
   - Press `F1` or `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (Mac)
   - Type "Dev Containers: Reopen in Container"
   - Press Enter

3. Wait for the container to build (first time may take a few minutes)
4. Dependencies will be automatically installed via `npm install`

### Forwarded Ports

The following ports are automatically forwarded:
- **4200**: Angular development server (`npm start`)
- **8080**: Docker container runtime

## Development Workflow

### Running the Angular App
```bash
cd container-demo
npm start
```
Access at http://localhost:4200

### Building Docker Images
```bash
docker build -t container-demo:latest .
docker run -p 8080:80 container-demo:latest
```
Access at http://localhost:8080

### Using Azure CLI
```bash
az login
az account list
```

### Using Docker Compose
```bash
docker-compose up
```

## Features Configuration

The dev container uses official Microsoft Dev Container Features:
- `docker-in-docker`: Enables running Docker inside the container
- `azure-cli`: Latest Azure command-line tools
- `github-cli`: Latest GitHub command-line tools

## Customization

To modify the dev container configuration, edit `.devcontainer/devcontainer.json` and rebuild the container:
1. Press `F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Type "Dev Containers: Rebuild Container"
3. Press Enter
