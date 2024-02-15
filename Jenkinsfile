pipeline {
    agent { docker { image 'node:latest' } }
    environment {
        HOME = "${WORKSPACE}"
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
    stages {
        stage('Run tests') {
            steps {
                echo 'Running tests...'
                sh 'npm ci --verbose'
                sh 'npm test'
            }
        }
    }
}