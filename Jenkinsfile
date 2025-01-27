pipeline {
    agent any

    environment {
        // Define Jenkins server URL as an environment variable
        JENKINS_SERVER_URL = 'https://ed1f-116-96-46-98.ngrok-free.app'
        EMAIL_RECIPIENT = 'cuxuanthoai@gmail.com' // Consider using Jenkins credentials
        ARCHIVE_ZIP_PATH = "${WORKSPACE}/cypress/reports/Mochawesome_Report.zip"
    }

    stages {
        stage('Preparation') {
            steps {
                script {
                    echo "Preparing the environment..."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run Cypress tests and generate reports
                    sh '''
                        npm ci
                        npm run cy:run-report  // Run Cypress tests and generate reports
                    '''
                }
            }
        }

        stage('Archive Reports') {
            steps {
                script {
                    // Archive all reports and generate the ZIP file
                    echo "Archiving reports..."
                    archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
                    sh "zip -r ${ARCHIVE_ZIP_PATH} cypress/reports/*"
                }
            }
        }
    }

    post {
        always {
            script {
                // Get additional environment information
                def gitBranch = env.GIT_BRANCH ?: 'Unknown'
                def gitCommit = env.GIT_COMMIT ?: 'Unknown'
                def gitCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def buildExecutor = env.BUILD_USER ?: 'Unknown'

                // Send email notification with HTML content
                def emailSubject = "[Jenkins Build] ${env.JOB_NAME} - ${currentBuild.currentResult} - (#${env.BUILD_NUMBER})"
                def emailBody = """
                    <html>
                        <body>
                            <p>Hello,</p>
                            <p>The Jenkins build for <strong>${env.JOB_NAME}</strong> (#${env.BUILD_NUMBER}) has completed.</p>
                            <ul>
                                <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
                                <li><strong>Build Duration:</strong> ${currentBuild.durationString}</li>
                                <li><strong>Jenkins Server:</strong> <a href="${JENKINS_SERVER_URL}">Visit Jenkins</a></li>
                                <li><strong>Cypress Test Reports:</strong> <a href="${JENKINS_SERVER_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/artifact/cypress/reports/Mochawesome_20Report.zip">Download Reports</a></li>
                                <li><strong>Build URL:</strong> <a href="${env.BUILD_URL}">Open Build Details</a></li>
                                <li><strong>Git Branch:</strong> ${gitBranch}</li>
                                <li><strong>Git Commit:</strong> ${gitCommit}</li>
                                <li><strong>Git Commit Message:</strong> ${gitCommitMessage}</li>
                                <li><strong>Build Executor:</strong> ${buildExecutor}</li>
                            </ul>
                            <p>Best regards,<br><strong>testervippro</strong></p>
                        </body>
                    </html>
                """

                mail(
                    to: EMAIL_RECIPIENT,
                    subject: emailSubject,
                    body: emailBody,
                    mimeType: 'text/html'
                )
            }
        }

        success {
            echo 'Tests completed successfully!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}
