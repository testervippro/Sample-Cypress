pipeline {
    agent any

    tools {
        nodejs "nodejs" // Ensure Node.js is installed and available
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress" // Custom Cypress cache directory
        JUNIT_REPORT_DIR = "${WORKSPACE}/cypress/reports/junit" // Directory for JUnit XML reports
        EMAIL_RECIPIENT = 'cuxuanthoai@gmail.com' // Email recipient for notifications
    }

    stages {
        // Restore Cypress cache from a previous build (if available)
        stage('Restore Cypress Cache') {
            steps {
                script {
                    sh 'mkdir -p .cache/Cypress'
                    sh 'cp -r /path/to/archived/cache/.cache/Cypress/* .cache/Cypress/ || true'
                }
            }
        }

        // Install project dependencies
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Clean install dependencies
            }
        }

        stage('Create Report Directory') {
            steps {
                sh 'mkdir -p ${JUNIT_REPORT_DIR}'
            }
        }

        stage('Run Cypress Tests and Generate Reports') {
            steps {
                sh 'npm run cy:run-junit-report' // Run Cypress with JUnit reporter
            }
        }

        stage('Debug JUnit Reports') {
            steps {
                echo "JUNIT_REPORT_DIR: ${env.JUNIT_REPORT_DIR}"
                sh 'ls -l ${JUNIT_REPORT_DIR}'
            }
        }

        // Publish JUnit XML reports to Jenkins
        stage('Publish Reports') {
            steps {
                script {
                    // Wait for files to be generated (retry if necessary)
                    def filesFound = false
                    retry(3) {
                        filesFound = sh(script: 'ls ${JUNIT_REPORT_DIR}/*.xml', returnStatus: true) == 0
                        if (!filesFound) {
                            sleep(time: 5, unit: 'SECONDS') // Wait 5 seconds before retrying
                        }
                    }
                    if (filesFound) {
                        junit "${env.JUNIT_REPORT_DIR}/*.xml" // Publish JUnit XML reports
                    } else {
                        error "No JUnit XML files found in ${env.JUNIT_REPORT_DIR}"
                    }
                }
            }
        }

        // Archive Cypress cache for future builds
        stage('Archive Cypress Cache') {
            steps {
                archiveArtifacts artifacts: '.cache/Cypress/**', allowEmptyArchive: true
            }
        }
    }

    // Post-build actions (always run, regardless of success or failure)
    post {
        always {
            script {
                // Gather build information
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