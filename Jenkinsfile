pipeline {
    agent any

    tools {
        nodejs "nodejs" // Ensure Node.js is available
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress" // Custom Cypress cache directory
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report" // Mochawesome report directory
        JUNIT_REPORT_DIR = "${WORKSPACE}/cypress/reports/junit" // JUnit report directory
        EMAIL_RECIPIENT = 'cuxuanthoai@gmail.com' // Replace with the recipient's email address
    }

    stages {
        stage('Restore Cypress Cache') {
            steps {
                script {
                    // Restore the Cypress cache from the previous build
                    sh 'mkdir -p .cache/Cypress'
                    sh 'cp -r /path/to/archived/cache/.cache/Cypress/* .cache/Cypress/ || true'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies
            }
        }

        stage('Run Cypress Tests and Generate Reports') {
            steps {
                sh 'npm run cy:run-report' // Run the cy:run-report script
            }
        }

        stage('Publish Reports') {
            steps {
                // Publish JUnit XML reports
                junit "${env.JUNIT_REPORT_DIR}/*.xml"

                // Publish Mochawesome HTML report
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${env.HTML_REPORT_DIR}",
                    reportFiles: 'index.html', // Ensure this matches the report file name
                    reportName: 'Mochawesome Report',
                    reportTitles: 'Cypress Test Results'
                ])
            }
        }

        stage('Archive Cypress Cache') {
            steps {
                // Archive the Cypress cache for future builds
                archiveArtifacts artifacts: '.cache/Cypress/**', allowEmptyArchive: true
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

                // Define email subject and body
                def emailSubject = "[Jenkins Build] ${env.JOB_NAME} - ${currentBuild.currentResult} - (#${env.BUILD_NUMBER})"
                def emailBody = """
                    <html>
                        <body>
                            <p>Hello,</p>
                            <p>The Jenkins build for <strong>${env.JOB_NAME}</strong> (#${env.BUILD_NUMBER}) has completed.</p>
                            <ul>
                                <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
                                <li><strong>Build Duration:</strong> ${currentBuild.durationString}</li>
                                <li><strong>Jenkins Server:</strong> <a href="https://ed1f-116-96-46-98.ngrok-free.app">Visit Jenkins</a></li>
                                <li><strong>Mochawesome Report:</strong> <a href="${env.BUILD_URL}/HTML_20Report">View Mochawesome Report</a></li>
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

                // Send email notification
                mail(
                    to: env.EMAIL_RECIPIENT,
                    subject: emailSubject,
                    body: emailBody,
                    mimeType: 'text/html'
                )
            }
            echo 'Pipeline completed.' // Log completion message
        }

        success {
            echo 'Tests completed successfully!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}