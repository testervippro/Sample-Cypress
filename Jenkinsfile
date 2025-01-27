pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        JENKINS_URL = 'http://localhost:8080'
        // Dynamically generate URL with BUILD_NUMBER and correct artifact name
        MOCHA_ZIP_URL = "${JENKINS_URL}/job/Cypress/${env.BUILD_NUMBER}/artifact/Mochawesome_20Report.zip"
        LOCAL_ZIP_FILE = "${WORKSPACE}/Mochawesome_Report.zip"  // Local filename with underscore
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-report"  // Target directory
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm install
                        npm run cy:run-report  # Generates mochawesome-report/output.html
                    '''
                    // Archive the ZIP file (ensure your tests generate this)
                    archiveArtifacts artifacts: 'mochawesome-report.zip', allowEmptyArchive: false
                }
            }
        }

        stage('Download and Extract Report') {
            steps {
                script {
                    // Download artifact using dynamically generated URL
                    sh "curl -L -o '${env.LOCAL_ZIP_FILE}' '${env.MOCHA_ZIP_URL}'"
                    
                    // Unzip to target directory (creates mochawesome-report/output.html)
                    sh "unzip -o '${env.LOCAL_ZIP_FILE}' -d '${env.HTML_REPORT_DIR}'"
                    
                    // Verify extraction
                    if (!fileExists("${env.HTML_REPORT_DIR}/output.html")) {
                        error "Report extraction failed - output.html not found"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML([
                    reportName: 'Mochawesome Report',
                    reportDir: "${env.HTML_REPORT_DIR}",
                    reportFiles: 'output.html',  // Target the correct file
                    keepAll: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo "Build ${env.BUILD_NUMBER} completed"
            deleteDir()  // Clean workspace
        }
        success {
            echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
        }
    }
}
