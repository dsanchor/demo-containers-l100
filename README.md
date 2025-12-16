# demo-containers-l100

A comprehensive Angular demo application showcasing containerization concepts, featuring information about container benefits and a detailed comparison between Azure Container Apps and Azure Kubernetes Service (AKS).

![Container Demo Screenshot](https://github.com/user-attachments/assets/b1a56651-80e9-472f-a700-b88452b6fd7a)

## Features

- 🐳 **Container Benefits Overview**: Interactive cards showcasing the key benefits of using containers
- ☁️ **Azure Services Comparison**: Detailed comparison table between Azure Container Apps and AKS
- 🎨 **Environment Variable Demo**: Dynamic background color controlled by environment variables
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🚀 **Optimized Build**: Multi-stage Docker build for production-ready containers

## Quick Start

### Using Dev Container (Recommended)

This repository includes a complete Dev Container configuration with all necessary tools pre-installed:

1. Prerequisites:

   - [VS Code](https://code.visualstudio.com/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. Open this repository in VS Code and click "Reopen in Container" when prompted

3. The container includes:
   - ✅ Node.js 20 runtime
   - ✅ Docker-in-Docker support
   - ✅ Azure CLI
   - ✅ GitHub Copilot
   - ✅ All dependencies automatically installed

See [.devcontainer/README.md](.devcontainer/README.md) for more details.

### Running Locally

1. Navigate to the Angular application directory:

```bash
cd container-demo
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
cd container-demo
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Docker

### Building the Docker Image

```bash
docker build -t container-demo:latest .
```

### Running the Container

Run with default background color (white):

```bash
docker run -p 8080:80 container-demo:latest
```

Run with custom background color:

```bash
docker run -p 8080:80 -e BACKGROUND_COLOR="#e3f2fd" container-demo:latest
```

Using docker-compose:

```bash
# With default color
docker-compose up

# With custom color
BACKGROUND_COLOR="#fff3e0" docker-compose up
```

Access the application at `http://localhost:8080`

### Environment Variables

- `BACKGROUND_COLOR`: Controls the page background color (default: `#ffffff`)
  - Try colors like: `#e3f2fd` (light blue), `#fff3e0` (light orange), `#f3e5f5` (light purple), `#e8f5e9` (light green)

See `.env.example` for more color examples.

## GitHub Container Registry

The application is automatically built and pushed to GitHub Container Registry when changes are merged to the main branch.

### Pulling from GitHub Container Registry

```bash
docker pull ghcr.io/dsanchor/demo-containers-l100:latest
```

### Running from GitHub Container Registry

```bash
docker run -p 8080:80 -e BACKGROUND_COLOR="#fff3e0" ghcr.io/dsanchor/demo-containers-l100:latest
```

## Deploying to Azure Container Apps

Azure Container Apps provides a simple way to deploy containerized applications without managing infrastructure. Here's how to deploy this application using the Azure CLI.

### Prerequisites

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed
- An active Azure subscription
- Docker image available (either built locally or from GitHub Container Registry)

### Step 1: Initialize Environment Variables

First, set up the required environment variables for your deployment:

```bash
# Set your Azure subscription (replace with your subscription ID)
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# Initialize environment variables
RESOURCE_GROUP="demo-containers-l100-rg"
LOCATION="eastus"
CONTAINER_APP_NAME="container-demo-app"
CONTAINER_ENVIRONMENT="container-demo-env"
CONTAINER_IMAGE="ghcr.io/dsanchor/demo-containers-l100:latest"
```

### Step 2: Create Resource Group

```bash
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

### Step 3: Create Container Apps Environment

[What is an Azure Container Apps Environment?](https://learn.microsoft.com/en-us/azure/container-apps/environment)

```bash
az containerapp env create \
  --name $CONTAINER_ENVIRONMENT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION
```

### Step 4: Deploy the Container App

Deploy the application with a custom background color:

```bash
az containerapp create \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_ENVIRONMENT \
  --image $CONTAINER_IMAGE \
  --target-port 80 \
  --ingress external \
  --env-vars BACKGROUND_COLOR="#e3f2fd" \
  --query properties.configuration.ingress.fqdn \
  --output tsv
```

The command will output the fully qualified domain name (FQDN) where your application is accessible.

### Step 5: Access Your Application

Open the URL returned by the previous command in your browser. The application should be running with the custom background color.

### Updating the Application

To update the application with a different image or environment variable:

```bash
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $CONTAINER_IMAGE \
  --set-env-vars BACKGROUND_COLOR="#fff3e0"
```

### Blue/Green Deployment with Traffic Splitting

You can deploy multiple revisions and split traffic between them. Here's how to set up a 60/40 split with different background colors:

```bash
# Enable multiple revision mode
az containerapp revision set-mode \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --mode multiple

# Create first revision with blue background (60% traffic)
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $CONTAINER_IMAGE \
  --set-env-vars BACKGROUND_COLOR="#e3f2fd" \
  --revision-suffix blue

# Create second revision with soft orange background (40% traffic)
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $CONTAINER_IMAGE \
  --set-env-vars BACKGROUND_COLOR="#fff3e0" \
  --revision-suffix orange

# Split traffic: 60% to blue, 40% to orange
az containerapp ingress traffic set \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --revision-weight ${CONTAINER_APP_NAME}--blue=60 ${CONTAINER_APP_NAME}--orange=40
```

Now when you refresh your application, you'll see the blue background 60% of the time and the soft orange background 40% of the time.

## Deploying to Azure Kubernetes Service (AKS)

NOTE: I will use a hardcoded DNS entry for this demo. In a production scenario, you would typically use a domain you own, linking the DNS zone to your AKS cluster leveraging app routing addon and DNS integration.

### Step 1: Connect to cluster

```bash
AKS="demol100"
az login --use-device-code
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS
```

### Step 2: Create app

We will use `kubectl` to manage kubernetes resources. You can get it and install it running:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl
```

Also, download and install `kubelogin` to manage authentication to the cluster:

```bash
# Download and install kubelogin
curl -LO https://github.com/Azure/kubelogin/releases/latest/download/kubelogin-linux-amd64.zip
unzip kubelogin-linux-amd64.zip
sudo mv bin/linux_amd64/kubelogin /usr/local/bin/
rm -rf kubelogin-linux-amd64.zip bin/
```

Create resources in AKS:

```bash
kubectl create namespace demo-containers-l100
kubectl apply -f k8s/service.yaml -n demo-containers-l100
kubectl apply -f k8s/ingress.yaml -n demo-containers-l100
kubectl apply -f k8s/deployment.yaml -n demo-containers-l100
```

Now, with a deployment that follows the policies of the cluster

```bash
kubectl apply -f k8s/deployment-policycomplaint.yaml -n demo-containers-l100
```

Get host:

```bash
kubectl get ingress -n demo-containers-l100
```

### Clean Up Resources

When you're done, delete the resource group to avoid incurring charges:

```bash
az group delete --name $RESOURCE_GROUP --yes --no-wait
```

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/build-and-push.yml`) that:

- Builds the Docker image on every push to main/master
- Pushes the image to GitHub Container Registry
- Creates multi-platform images (linux/amd64, linux/arm64)
- Tags images appropriately (latest, branch name, commit SHA)

## Project Structure

```
.
├── container-demo/          # Angular application
│   ├── src/
│   │   ├── app/            # Application components
│   │   ├── assets/         # Static assets including env-config.js
│   │   └── index.html      # Main HTML file
│   ├── package.json        # Node.js dependencies
│   └── angular.json        # Angular configuration
├── Dockerfile              # Multi-stage Docker build
├── nginx.conf             # Nginx configuration for production
├── docker-compose.yml     # Docker Compose configuration
├── .dockerignore          # Docker ignore patterns
├── .env.example           # Example environment variables
└── .github/
    └── workflows/
        └── build-and-push.yml  # CI/CD pipeline
```

## Technologies Used

- **Angular 17**: Modern web framework
- **TypeScript**: Type-safe JavaScript
- **Nginx**: Production web server
- **Docker**: Containerization
- **GitHub Actions**: CI/CD automation

## License

MIT
