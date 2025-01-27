pipeline {
    agent any

    tools {
        nodejs "nodejs"  // Ensure Node.js is installed and available in Jenkins
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Corrected path
        ZIP_REPORT_URL = "${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"  // URL for the ZIP report
        FINAL_ZIP_REPORT_PATH = "${WORKSPACE}/cypress/reports/jenkins/Mochawesome_Report.zip"  // Final destination for the ZIP file
        SERVER_PORT = 8080  // Port to serve the HTML report
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm ci
                        npm run cy:run-report  # Generates mochawesome-report/output.html and ZIP report
                    '''
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Verify the HTML report exists before publishing
                    if (!fileExists("${env.HTML_REPORT_DIR}/Cypress_HMTL_Report.html")) {
                        error "HTML report not found at ${env.HTML_REPORT_DIR}/Cypress_HMTL_Report.html"
                    }

                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "${env.HTML_REPORT_DIR}",
                        reportFiles: 'Cypress_HMTL_Report.html',
                        keepAll: true,
                        allowMissing: false
                    ])
                }
            }
        }

        stage('Start Node.js HTTP Server to Serve Report') {
            steps {
                script {
                    // Ensure the HTTP server is installed if not already available
                    sh '''
                        npm install -g http-server
                    '''

                    // Start the HTTP server in the background to serve the HTML report
                    sh """
                        nohup http-server ${env.HTML_REPORT_DIR} -p ${env.SERVER_PORT} &
                    """
                }
            }
        }

        stage('Access Report URL') {
            steps {
                script {
                    // Output the URL to access the report
                    echo "Access the report at: http://localhost:${env.SERVER_PORT}/Cypress_HMTL_Report.html"
                }
            }
        }
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true  // Corrected path pattern
            deleteDir()  // Clean workspace
        }
        success {
            echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
            // Added step to echo the download link for the zipped report
            echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"
        }
    }
}
