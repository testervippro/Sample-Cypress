pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report/Cypress_HMTL_Report.html"  // Corrected path
        ZIP_REPORT_URL = "${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"  // URL for the ZIP report
        FINAL_ZIP_REPORT_PATH = "${WORKSPACE}/cypress/reports/jenkins/Mochawesome_Report.zip"  // Final destination for the ZIP file
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

     

        // stage('Unzip Report') {
        //     steps {
        //         script {
        //             // Check if the ZIP file exists and unzip it
        //             if (fileExists("${FINAL_ZIP_REPORT_PATH}")) {
        //                 echo "Unzipping the report..."
        //                 sh "unzip ${FINAL_ZIP_REPORT_PATH} -d ${env.HTML_REPORT_DIR}"
        //             } else {
        //                 error "ZIP report file not found at ${FINAL_ZIP_REPORT_PATH}"
        //             }
        //         }
        //     }
        // }

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

           stage('Download ZIP Report') {
            steps {
                script {
                    // Download the ZIP report using curl
                    echo "Downloading the ZIP report from: ${ZIP_REPORT_URL}"
                    sh "curl -o ${FINAL_ZIP_REPORT_PATH} ${ZIP_REPORT_URL}"

                    // Check if the ZIP file has been successfully downloaded
                    if (fileExists("${FINAL_ZIP_REPORT_PATH}")) {
                        echo "ZIP report downloaded to: ${FINAL_ZIP_REPORT_PATH}"
                    } else {
                        error "Failed to download ZIP report from: ${ZIP_REPORT_URL}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
            archiveArtifacts artifacts: 'cypress/reports/jenkins/**', allowEmptyArchive: true
            deleteDir()  // Clean workspace
        }
        success {
           echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
            // Added step to echo the download link for the zipped report
            echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"

        }
    }
}
