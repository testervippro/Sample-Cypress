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

        stage('Ensure Report Directory Exists') {
            steps {
                script {
                    // Define the HTML report directory
                    def htmlReportDir = "${WORKSPACE}/cypress/reports/mochawesome-html-report"

                    // Check if the directory exists
                    if (!fileExists(htmlReportDir)) {
                        echo "HTML report directory does not exist. Creating it now..."
                        sh "mkdir -p ${htmlReportDir}"
                    } else {
                        echo "HTML report directory already exists: ${htmlReportDir}"
                    }
                }
            }
        }
              stage('Fix Permissions') {
            steps {
                sh '''
                    echo "Fixing permissions..."
                    chmod -R 755 ${WORKSPACE}/cypress/reports/
                    chmod 644 ${WORKSPACE}/cypress/reports/mochawesome-html-report/Cypress_HMTL_Report.html
                    echo "Permissions updated."
                    ls -la ${WORKSPACE}/cypress/reports/mochawesome-html-report/
                '''
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
