pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Corrected path for the HTML report
        ZIP_REPORT_URL = "${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"  // URL to the zipped report
        CUSTOM_ZIP_REPORT_PATH = "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report.zip"  // Custom path for storing the zipped report
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm ci
                        npm run cy:run-report  # Generates mochawesome-report/output.html
                    '''
                }
            }
        }

        stage('Download Report') {
            steps {
                script {
                    // Echoing the download URL for reference
                    echo "Download report ZIP: ${ZIP_REPORT_URL}"
                    
                    // Downloading the ZIP file
                    echo "Downloading the Mochawesome ZIP report..."
                    sh """
                        curl -o ${CUSTOM_ZIP_REPORT_PATH} ${ZIP_REPORT_URL}
                    """
                }
            }
        }

        stage('Unzip Report') {
            steps {
                script {
                    // Check if the zip file exists and unzip it into the custom directory (CUSTOM_ZIP_REPORT_PATH)
                    if (fileExists("${CUSTOM_ZIP_REPORT_PATH}")) {
                        echo "Unzipping the report..."
                      sh "unzip ${CUSTOM_ZIP_REPORT_PATH} -d ${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report"
                    } else {
                        error "ZIP report file not found at ${CUSTOM_ZIP_REPORT_PATH}"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Verify report exists before publishing
                    if (!fileExists("${WORKSPACE}/cypress/reports/mochawesome-html-report/Cypress_HMTL_Report.html")) {
                        error "HTML report not found at ${WORKSPACE}/cypress/reports/mochawesome-html-report/Cypress_HMTL_Report.html"
                    }

                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "${WORKSPACE}/cypress/reports/mochawesome-html-report",
                        reportFiles: 'Cypress_HMTL_Report.html',
                        keepAll: true,
                        allowMissing: false
                    ])
                }
            }
        }
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
            archiveArtifacts artifacts: 'cypress/reports/mochawesome-html-report/**', allowEmptyArchive: true
            deleteDir()  // Clean workspace
        }
        success {
            echo "Archiving zipped report in custom directory..."
            // Archive the zipped report to the custom storage path
            archiveArtifacts artifacts: "${env.CUSTOM_ZIP_REPORT_PATH}", allowEmptyArchive: true

             // Provide the URL for downloading the zipped report from the custom location
        echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"
        
        // Add a link to view the unzipped HTML report
        echo "View HTML Report: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report/Cypress_HMTL_Report.html"
        }
    }
}
