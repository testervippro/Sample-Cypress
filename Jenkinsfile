pipeline {
    agent any

    tools {
        nodejs "Node" // Ensure Node.js is available
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies
            }
        }

        stage('Run Cypress Tests and Generate Report') {
            steps {
                sh 'npm run cy:run-report' // Run the cy:report script
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
