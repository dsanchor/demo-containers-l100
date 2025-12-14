# demo-containers-l100

A comprehensive Angular demo application showcasing containerization concepts, featuring information about container benefits and a detailed comparison between Azure Container Apps and Azure Kubernetes Service (AKS).

## Features

- 🐳 **Container Benefits Overview**: Interactive cards showcasing the key benefits of using containers
- ☁️ **Azure Services Comparison**: Detailed comparison table between Azure Container Apps and AKS
- 🎨 **Environment Variable Demo**: Dynamic background color controlled by environment variables
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🚀 **Optimized Build**: Multi-stage Docker build for production-ready containers

## Quick Start

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

Access the application at `http://localhost:8080`

### Environment Variables

- `BACKGROUND_COLOR`: Controls the page background color (default: `#ffffff`)
  - Try colors like: `#e3f2fd` (light blue), `#fff3e0` (light orange), `#f3e5f5` (light purple), `#e8f5e9` (light green)

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
├── .dockerignore          # Docker ignore patterns
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
