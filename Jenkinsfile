pipeline {
    agent any

    tools {
        nodejs "nodejs"  // Ensure Node.js is installed and available
    }

    environment {
        JENKINS_URL = 'http://localhost:8080' // Jenkins server URL
        MOCHA_ZIP_URL = "${JENKINS_URL}/job/Cypress/${env.BUILD_NUMBER}/artifact/Mochawesome_20Report.zip" // URL to the Mochawesome zip report
        LOCAL_ZIP_FILE = "${WORKSPACE}/Mochawesome_Report.zip"  // Local path to save the zip file
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome" // Directory to store the HTML report
    }

    stages {
        // Run tests and generate the Mochawesome report
        stage('Run Tests') {
            steps {
                script {
                    // Install npm dependencies and run the tests
                    sh '''
                        npm install
                        npm run cy:run-report  // Run Cypress tests and generate the Mochawesome report
                    '''
                }
            }
        }

        // Download, unzip, and open the report
        stage('Download, Unzip, and Open Report') {
            steps {
                script {
                    // Step 1: Download the Mochawesome zip file from Jenkins
                    sh "curl -L ${env.MOCHA_ZIP_URL} -o ${env.LOCAL_ZIP_FILE}"

                    // Step 2: Unzip the downloaded file
                    sh "unzip -o ${env.LOCAL_ZIP_FILE} -d ${env.HTML_REPORT_DIR}"

                    // Step 3: Check if the HTML report exists after unzipping
                    def reportExists = fileExists("${env.HTML_REPORT_DIR}/Cypress_HTML_Report.html")
                    if (reportExists) {
                        echo "Report downloaded and unzipped at ${env.HTML_REPORT_DIR}/Cypress_HTML_Report.html"
                    } else {
                        error "HTML report not found in ${env.HTML_REPORT_DIR}"
                    }
                }
            }
        }

        // Publish the HTML report to Jenkins
        stage('Publish HTML Report') {
            steps {
                script {
                    // Check if the HTML report exists before publishing
                    def reportExists = fileExists("${env.HTML_REPORT_DIR}/Cypress_HTML_Report.html")
                    if (reportExists) {
                        publishHTML([
                            reportName: 'Mochawesome Report',
                            reportDir: "${env.HTML_REPORT_DIR}",  // Directory of the HTML report
                            reportFiles: 'Cypress_HTML_Report.html',  // The HTML file to display
                            keepAll: true,  // Keep all previous reports
                            allowMissing: false  // Fail the build if the report is missing
                        ])
                    } else {
                        error "No HTML report found in ${env.HTML_REPORT_DIR}"
                    }
                }
            }
        }
    }

    // Post-build actions (always run, regardless of success or failure)
    post {
        always {
            echo 'Pipeline completed.'  // Log completion message
        }

        success {
            echo 'Tests completed successfully!'  // Log if tests passed
        }

        failure {
            echo 'Tests failed!'  // Log if tests failed
        }
    }
}
