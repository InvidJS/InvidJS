pipeline {
    agent { docker { image 'node:latest' } }

    stages {
        stage('Run tests') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}