# 🌤️ Weather App: Your Real-Time Weather Solution

![Weather App](https://img.shields.io/badge/Weather_App-Node.js-brightgreen)

Welcome to the **Weather App** repository! This project is a Node.js application that provides real-time weather data. It utilizes a robust CI/CD pipeline with Jenkins for builds and ArgoCD for GitOps deployments. The app runs in a Kubernetes environment, with Docker Hub storing the container images. 

## 🚀 Quick Start

To get started, you can download the latest release of the Weather App from the [Releases section](https://github.com/tiagolacheski/Weather_app/releases). Make sure to follow the instructions in the release notes to execute the files correctly.

## 📦 Features

- **Real-Time Weather Data**: Access up-to-date weather information for any location.
- **CI/CD Pipeline**: Automated builds with Jenkins and deployments with ArgoCD.
- **Containerization**: Use Docker to run the application smoothly across different environments.
- **Kubernetes Management**: Deploy and manage the application in a production-grade Kubernetes cluster.
- **Helm Charts**: Simplify the deployment process with Helm.
- **Secure Secrets Management**: Keep your sensitive information safe.

## 🛠️ Technologies Used

- **Node.js**: The core technology for building the application.
- **Jenkins**: For continuous integration and automated builds.
- **ArgoCD**: For GitOps-style continuous deployment.
- **Docker**: For containerization of the application.
- **Kubernetes**: For orchestrating the deployment.
- **Helm**: For managing Kubernetes applications.
- **Weather API**: To fetch real-time weather data.

## 📂 Repository Structure

Here's a brief overview of the files and directories in this repository:

```
Weather_app/
│
├── Dockerfile          # Docker configuration for the app
├── Jenkinsfile         # Jenkins pipeline configuration
├── helm/              # Helm charts for deployment
│   └── <chart-files>
├── k8s/               # Kubernetes manifests
│   └── <k8s-manifests>
├── src/               # Source code for the application
│   └── <app-files>
└── README.md          # Project documentation
```

## 🔧 Installation

To run the Weather App locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tiagolacheski/Weather_app.git
   cd Weather_app
   ```

2. **Build the Docker image**:
   ```bash
   docker build -t weather-app .
   ```

3. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 weather-app
   ```

4. **Access the app**: Open your browser and go to `http://localhost:3000`.

## 🌍 Usage

Once the app is running, you can enter any city name to get the current weather data. The app provides temperature, humidity, wind speed, and a brief description of the weather conditions.

## 🔄 CI/CD Pipeline

This repository features a fully automated CI/CD pipeline:

1. **Jenkins**: Automatically builds the application when changes are pushed to the repository.
2. **ArgoCD**: Deploys the new version to the Kubernetes cluster without manual intervention.

## 📦 Docker Hub

The container images for the Weather App are stored on Docker Hub. You can pull the latest image using:

```bash
docker pull your-dockerhub-username/weather-app
```

Replace `your-dockerhub-username` with your actual Docker Hub username.

## 🛡️ Secrets Management

For secure management of sensitive data, the application uses environment variables. Make sure to set these variables in your Kubernetes deployment files or Docker run command.

## 📊 Monitoring and Logging

To monitor the application, you can integrate tools like Prometheus and Grafana for performance metrics and logging. This will help you keep track of the app's health and usage.

## 📈 Future Improvements

Here are some ideas for future enhancements:

- **User Authentication**: Add user accounts to save favorite locations.
- **Mobile Responsiveness**: Improve the UI for mobile devices.
- **Historical Weather Data**: Provide access to past weather data.
- **Push Notifications**: Notify users of severe weather alerts.

## 🤝 Contributing

We welcome contributions! If you want to help improve the Weather App, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🗣️ Contact

For any questions or feedback, feel free to open an issue or contact me directly. You can also check the [Releases section](https://github.com/tiagolacheski/Weather_app/releases) for the latest updates.

Thank you for checking out the Weather App! We hope you find it useful.