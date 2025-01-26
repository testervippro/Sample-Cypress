pipeline {
    agent any

    tools {
        nodejs
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    // Install npm libraries and run the tests
                    sh '''
                        npm install
                        npm run cy:run-report-junit
                    '''
                }
            }
        }
    }
}
