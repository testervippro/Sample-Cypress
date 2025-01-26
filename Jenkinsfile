pipeline {
    agent any

    tools {
        nodejs "nodejs" // Ensure Node.js is available
    }

    environment {
        // Set the Cypress cache folder to a directory within the workspace
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Create the cache directory if it doesn't exist
                sh 'mkdir -p ${CYPRESS_CACHE_FOLDER}'
                // Install dependencies
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests and Generate Report') {
            steps {
                // Run the Cypress tests and generate the report
                sh 'npm run cy:run-report'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'cypress/reports/mochawesome-html-report/', // Ensure this path is correct
                    reportFiles: 'Cypress_HMTL_Report.html', // Ensure this matches the report file name
                    reportName: 'Mochawesome Report',
                    reportTitles: 'Cypress Test Results'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.' // Log completion message
        }
    }
}
