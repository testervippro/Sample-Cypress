pipeline {
    agent any

    tools {
        nodejs "nodejs"
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

        stage('Publish Reports') {
            steps {
                script {
                    // Archive JUnit test reports
                    junit 'cypress/reports/junit/*.xml' // Adjust the path to match your JUnit report location
                }
                
                script {
                    // Optional: Archive HTML reports (e.g., Cypress HTML results)
                    archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            script {
                // Ensure logs or other artifacts are archived, even if the build fails
                archiveArtifacts artifacts: 'cypress/logs/**/*', allowEmptyArchive: true
            }
        }
    }
}
