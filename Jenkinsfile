pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Corrected path
        ZIP_REPORT_PATH = "cypress/reports/Mochawesome_Report.zip"  // Relative path to the zip report
        CUSTOM_REPORT_PATH = "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports/Mochawesome_Report.zip"  // Custom storage path for ZIP
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

        stage('Download and Unzip Report') {
            steps {
                script {
                    // Check if the ZIP report exists in the workspace
                    if (fileExists("${ZIP_REPORT_PATH}")) {
                        echo "Downloading and Unzipping the report..."

                        // Unzip the report to the custom directory
                        sh "unzip ${ZIP_REPORT_PATH} -d ${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports"
                    } else {
                        error "ZIP report file not found at ${ZIP_REPORT_PATH}"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Verify HTML report exists before publishing
                    def htmlReport = "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports/Cypress_HMTL_Report.html"
                    if (!fileExists(htmlReport)) {
                        error "HTML report not found at ${htmlReport}"
                    }

                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports",
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
            echo "Archiving Mochawesome Report ZIP in custom directory..."
            
            // Archive the zipped report from the custom directory
            archiveArtifacts artifacts: "${WORKSPACE}/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports/Mochawesome_Report.zip", allowEmptyArchive: true

            // Provide the URL for downloading the zipped report from the custom location
            def mochawesomeZipUrl = "${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/artifact/jobs/${env.JOB_NAME}/${env.BUILD_NUMBER}/reports/Mochawesome_Report.zip"
            echo "Download Mochawesome Report ZIP: ${mochawesomeZipUrl}"
            
            // View the HTML report link
            def htmlReportUrl = "${env.CUSTOM_REPORT_PATH}/Cypress_HMTL_Report.html"
            echo "View HTML Report: ${htmlReportUrl}"
        }
    }
}
