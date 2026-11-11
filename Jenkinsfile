
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build') {
            steps {
                bat '''
                    set "CI=false"
                    call npm run build:prod:Wave
                '''
            }
        }

        stage('Docker Compose') {
            steps {
                bat '''
                    docker rm -f wave-frontend-container
                    docker-compose up -d --build
                '''
            }
        }
    }
}
