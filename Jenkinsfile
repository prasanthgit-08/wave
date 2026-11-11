
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
                    docker --version
                    docker-compose down
                    docker-compose up -d --build
                '''
            }
        }
    }
}
