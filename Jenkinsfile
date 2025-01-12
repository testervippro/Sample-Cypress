pipeline {
    agent any

    tools {
        nodejs "Node" // Ensure Node.js is available
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies without caching
            }
        }

        stage('Run Cypress Tests and Generate Report') {
            steps {
                sh 'npm run cy:report' // Run the cy:report script
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
            // Publish the Mochawesome HTML report using HTML Publisher plugin
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'reports/mochawesome', // Ensure this path is correct
                reportFiles: 'report.html', // Ensure this matches the report file name
                reportName: 'Mochawesome Report',
                reportTitles: 'Cypress Test Results'
            ])

            echo 'Pipeline completed.' // Log completion message
        }
    }
}