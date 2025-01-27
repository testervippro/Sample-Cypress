pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Corrected path
        ZIP_REPORT_PATH = "cypress/reports/Mochawesome_Report.zip"  // Relative path to the zip report
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

        stage('Unzip Report') {
            steps {
                script {
                    // Check if the zip file exists and unzip it
                    if (fileExists("${ZIP_REPORT_PATH}")) {
                        echo "Unzipping the report..."
                        sh "unzip ${ZIP_REPORT_PATH} -d ${env.HTML_REPORT_DIR}"
                    } else {
                        error "ZIP report file not found at ${ZIP_REPORT_PATH}"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Verify report exists before publishing
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
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
            archiveArtifacts artifacts: 'cypress/reports/mochawesome-html-report/**', allowEmptyArchive: true
            deleteDir()  // Clean workspace
        }
        success {
            echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
            // Added step to echo the download link for the zipped report
            echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"
            // Add a link to view the unzipped HTML report
            echo "View HTML Report: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/artifact/cypress/reports/mochawesome-html-report/Cypress_HMTL_Report.html"
        }
    }
}
