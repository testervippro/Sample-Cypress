pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        JUNIT_REPORT_DIR = "${WORKSPACE}/cypress/reports/junit"
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

        stage('Run Cypress Tests and Generate Reports') {
            steps {
                sh 'npm run cy:run-report-junit'
            }
        }

        stage('Debug Reports') {
            steps {
                sh 'ls -l cypress/reports/junit'
            }
        }

        stage('Publish Reports') {
            steps {
                junit "${env.JUNIT_REPORT_DIR}/*.xml"
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
            echo 'Pipeline completed.'
        }

        success {
            echo 'Tests completed successfully!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}
