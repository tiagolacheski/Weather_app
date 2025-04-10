
pipeline {
    agent any

    stages {
        stage("Clone Code") {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo "Cloning the code from Git repository"
                    git url: "https://github.com/HassanAmohamed/weather-argocd-jenkins.git", branch: "master"
                    echo "Successfully cloned the code From Your Git-Hub account"
                    def duration = (System.currentTimeMillis() - startTime) / 1000
                    echo "Time taken for Clone Code: ${duration} seconds"
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo "Building the Docker image with BuildKit"
                    bat """
                        set DOCKER_BUILDKIT=1
                        docker build --cache-from %DOCKER_HUB_USERNAME%/weather-app:latest -t weather-app .
                    """
                    echo "Successfully built Docker Image"
                    def duration = (System.currentTimeMillis() - startTime) / 1000
                    echo "Time taken for Build Docker Image: ${duration} seconds"
                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                script {
                    def startTime = System.currentTimeMillis()
                    echo "Pushing the Docker image to Docker Hub"
                    withCredentials([usernamePassword(credentialsId: "dockerHub", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        bat """
                            docker login -u %DOCKER_HUB_USERNAME% -p %DOCKER_HUB_PASSWORD%
                            docker tag weather-app %DOCKER_HUB_USERNAME%/weather-app:latest
                            docker push %DOCKER_HUB_USERNAME%/weather-app:latest
                        """
                    }
                    echo "Successfully pushed to Docker Hub"
                    def duration = (System.currentTimeMillis() - startTime) / 1000
                    echo "Time taken for Push to Docker Hub: ${duration} seconds"
                }
            }
        }

        // stage("Deploy") {
        //     steps {
        //         script {
        //             def startTime = System.currentTimeMillis()
        //             echo "Deploying the container using Docker Compose"
        //             bat "docker-compose down && docker-compose up -d"
        //             echo "Successfully Deployed"
        //             def duration = (System.currentTimeMillis() - startTime) / 1000
        //             echo "Time taken for Deploy: ${duration} seconds"
        //         }
        //     }
        // }
    }

    post {
        always {
            echo "Cleaning up Docker Hub credentials"
            bat "docker logout"
        }
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs for details."
        }
    }
}                                                                                                                                                                                      ✓

