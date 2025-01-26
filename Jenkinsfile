pipeline {
    agent any

    tools {
        nodejs "nodejs" // Ensure Node.js is available
    }

    environment {
        REPORT_DIR = "${WORKSPACE}/cypress/reports"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies
            }
        }

        stage('Run Cypress Tests and Generate Report') {
            steps {
                sh 'npm run cy:run-junit-report' // Run Cypress tests and generate JUnit report
            }
        }

        stage('Ensure Report Directory Exists') {
            steps {
                script {
                    // Define the JUnit report directory
                    def junitReportDir = "${REPORT_DIR}/junit"

                    // Check if the directory exists
                    if (!fileExists(junitReportDir)) {
                        echo "JUnit report directory does not exist. Creating it now..."
                        sh "mkdir -p ${junitReportDir}"
                    } else {
                        echo "JUnit report directory already exists: ${junitReportDir}"
                    }
                }
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit '**/cypress/reports/junit/results-*.xml' // Publish the JUnit XML report
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....' // Deployment step
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.' // Log completion message
        }
    }
}
