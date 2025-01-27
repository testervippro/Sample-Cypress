pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Directory for HTML report
        ZIP_REPORT_URL = "${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"  // URL for the ZIP report
        CUSTOM_ZIP_REPORT_PATH = "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report.zip"  // Local path for the ZIP report
    }

    stages {
        stage('Setup and Run Tests') {
            steps {
                script {
                    // Install dependencies and run tests
                    sh '''
                        npm ci
                        npm run cy:run-report  // Generates mochawesome report
                    '''
                }
            }
        }

        stage('Download ZIP Report') {
            steps {
                script {
                    // Log the download URL and download the ZIP report
                    echo "Downloading ZIP report from: ${ZIP_REPORT_URL}"
                    sh "curl -o ${CUSTOM_ZIP_REPORT_PATH} ${ZIP_REPORT_URL}"
                }
            }
        }

        stage('Unzip Report') {
            steps {
                script {
                    // Unzip the downloaded report if it exists
                    if (fileExists("${CUSTOM_ZIP_REPORT_PATH}")) {
                        echo "Unzipping report to destination..."
                        sh "unzip ${CUSTOM_ZIP_REPORT_PATH} -d ${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report"
                    } else {
                        error "ZIP report not found at ${CUSTOM_ZIP_REPORT_PATH}"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Publish the HTML report if it exists
                    def reportFile = "${HTML_REPORT_DIR}/Cypress_HMTL_Report.html"
                    if (fileExists(reportFile)) {
                        echo "Publishing HTML report: ${reportFile}"
                        publishHTML([
                            reportName: 'Mochawesome Report',
                            reportDir: "${HTML_REPORT_DIR}",
                            reportFiles: 'Cypress_HMTL_Report.html',
                            keepAll: true,
                            allowMissing: false
                        ])
                    } else {
                        error "HTML report not found at ${reportFile}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Archive all HTML reports and clean workspace
            echo "Archiving HTML reports for debugging"
            archiveArtifacts artifacts: 'cypress/reports/mochawesome-html-report/**', allowEmptyArchive: true
            deleteDir()  // Clean workspace
        }

        success {
            // Archive ZIP report and provide links for downloading and viewing reports
            echo "Archiving ZIP report"
            archiveArtifacts artifacts: "${CUSTOM_ZIP_REPORT_PATH}", allowEmptyArchive: true

            echo "Download ZIP Report: ${ZIP_REPORT_URL}"
            echo "View HTML Report: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_Report/Cypress_HMTL_Report.html"
        }

        // Clean after build
        always {
            cleanWs(
                cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [
                    [pattern: '.gitignore', type: 'INCLUDE'],
                    [pattern: '.propsfile', type: 'EXCLUDE']
                ]
            )
        }
    }
}
