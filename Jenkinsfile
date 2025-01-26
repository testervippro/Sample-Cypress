pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        JUNIT_REPORT_DIR = "${WORKSPACE}/cypress/reports/junit"
        
        EMAIL_RECIPIENT = 'cuxuanthoai@gmail.com'
    }

    stages {
        stage('Restore Cypress Cache') {
            steps {
                script {
                    sh 'mkdir -p .cache/Cypress'
                    sh 'cp -r /path/to/archived/cache/.cache/Cypress/* .cache/Cypress/ || true'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }


        stage('Run Cypress Tests and Generate Reports') {
            steps {
                sh 'npm run cy:run-report-junit'
            }
        }

        stage('Debug Reports') {
            steps {
                sh 'ls -l cypress/reports/junit'
            }
        }

        stage('Publish Reports') {
            steps {
                // Publish JUnit XML reports
                junit "${env.JUNIT_REPORT_DIR}/*.xml"
            }
        }

        stage('Archive Cypress Cache') {
            steps {
                archiveArtifacts artifacts: '.cache/Cypress/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            script {
                def gitBranch = env.GIT_BRANCH ?: 'Unknown'
                def gitCommit = env.GIT_COMMIT ?: 'Unknown'
                def gitCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def buildExecutor = env.BUILD_USER ?: 'Unknown'

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

                mail(
                    to: env.EMAIL_RECIPIENT,
                    subject: emailSubject,
                    body: emailBody,
                    mimeType: 'text/html'
                )
            }
            echo 'Pipeline completed.'
        }

        success {
            echo 'Tests completed successfully!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}
