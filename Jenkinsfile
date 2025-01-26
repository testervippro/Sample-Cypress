pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        JUNIT_REPORT_DIR = "${WORKSPACE}/cypress/reports/jenkins"
    }

    stages {
        stage('Restore Cypress Cache') {
            steps {
                script {
                    sh """
                        mkdir -p .cache/Cypress
                        cp -r ${WORKSPACE}/cache/Cypress/* .cache/Cypress/ || echo "No cache found"
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests with Jenkins Reporter') {
            steps {
                sh """
                    mkdir -p cypress/reports/jenkins
                    npm run cypress-jenkins
                """
            }
        }

        stage('Verify Reports') {
            steps {
                sh "ls -la ${env.JUNIT_REPORT_DIR}"
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit "${env.JUNIT_REPORT_DIR}/report.xml"
            }
        }

        stage('Archive Cypress Cache') {
            steps {
                archiveArtifacts artifacts: '.cache/Cypress/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed'
            cleanWs()
        }
        success {
            echo 'All stages completed successfully!'
        }
        failure {
            echo 'Pipeline failed - check test results'
            mail to: 'team@example.com', subject: 'Pipeline Failed', body: 'Cypress tests failed in Jenkins'
        }
    }
}
