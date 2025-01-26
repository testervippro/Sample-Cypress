pipeline {
    agent any

    stages {
        stage('Setup Display') {
            steps {
                sh 'Xvfb :99 -screen 0 1280x1024x24 -ac +extension GLX +render -noreset &'
                sh 'export DISPLAY=:99'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run cy:run-report-junit'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'pkill Xvfb'  // Clean up display server
            }
        }
    }
}
