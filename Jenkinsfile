pipeline {
    agent {
        docker { image 'node:latest' }
    }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
    stages {
        stage('Setup') {
            steps {
                echo 'Setting up the work dir...'
                echo "${WORKSPACE}"
            }
        }
        stage('Run tests') {
            steps {
                echo 'Running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build documentation') {
            steps {
                echo 'Building documentation...'
                sh 'git clone https://jsbox.xyz/InvidJS/docs ../docs'
                sh 'npm install'
                sh 'npm run docs:build'
                sh 'cd ../docs'
                sh 'git config user.email ci-bot@jsbox.xyz'
                sh 'git config user.name ci-bot'
                sh 'git add -A'
                sh 'git commit -a -m "CI - Rebuild docs"'
                sh 'git push'
            }
        }
        stage('Publish to NPM') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'cd dist && npm publish --access public'
            }
        }
    }
}