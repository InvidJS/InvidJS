pipeline {
    agent any
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