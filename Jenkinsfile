pipeline {
    agent any

    environment {
        // Define Jenkins server URL and email recipient
        JENKINS_SERVER_URL = 'f-116-96-46-98.ngrok-free.app'
        EMAIL_RECIPIENT = '@gmail.com' // Consider using Jenkins credentials for security
        TELEGRAM_TOKEN = '781845500:AAEAJ5GDawMGUC4Ofv9SvD3YBn5UGmVii7Q' // Your Telegram bot token
        TELEGRAM_CHAT_ID = '5321745388' // Your Telegram chat ID
    }

    stages {
        stage('Preparation') {
            steps {
                script {
                    echo "Preparing the environment..."
                    // Git Checkout step
                    echo "Cloning the repository..."
                    git branch: 'main', url: 'https://github.com/testervippro/Sample-Cypress.git'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run Cypress tests and generate both Mochawesome and JUnit reports
                    sh 'npm ci && npm run cy:run-report'
                }
            }
        }

        stage('Zip Mochawesome Report') {
            steps {
                script {
                    // Zip only the mochawesome-html-report directory
                    echo "Zipping mochawesome-html-report..."
                    sh 'zip -r mochawesome_report.zip cypress/reports/mochawesome-html-report/'
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
                
                  // Archive the report and build log
                 archiveArtifacts artifacts: 'mochawesome_report.zip', allowEmptyArchive: true

                // Call function to send email
                sendEmailReport(gitBranch, gitCommit, gitCommitMessage, buildExecutor)
                
                // Call function to send zipped report to Telegram
                sendTelegramReport()
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

// Function to send the email report
def sendEmailReport(gitBranch, gitCommit, gitCommitMessage, buildExecutor) {
    echo "Sending email report..."

    // Construct email subject and body with HTML for hyperlinks
    def emailSubject = "[Jenkins Build] ${env.JOB_NAME} - ${currentBuild.currentResult} - (#${env.BUILD_NUMBER})"
    def emailBody = """
    <html>
    <body>
        <p>Hello,</p>

        <p>The Jenkins build for <strong>${env.JOB_NAME}</strong> (#${env.BUILD_NUMBER}) has completed with the following details:</p>

        <ul>
            <li><strong>Status:</strong> ${currentBuild.currentResult}</li>
            <li><strong>Build Duration:</strong> ${currentBuild.durationString}</li>
            <li><strong>Download Test Reports:</strong> <a href="${env.JENKINS_SERVER_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/artifact/mochawesome_report.zip">Download Report</a></li>
            <li><strong>Build URL:</strong> <a href="${env.JENKINS_SERVER_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}">View Build</a></li>
            <li><strong>Git Branch:</strong> ${gitBranch}</li>
            <li><strong>Git Commit:</strong> ${gitCommit}</li>
            <li><strong>Commit Message:</strong> ${gitCommitMessage}</li>
            <li><strong>Build Executor:</strong> ${buildExecutor}</li>
        </ul>

        <p>Please find the attached build log.</p>

        <p>Best regards,<br/>testervippro</p>
    </body>
    </html>
    """

    // Send email with zipped report and build log as attachments, and HTML formatted body
    emailext(
        to: EMAIL_RECIPIENT,
        subject: emailSubject,
        body: emailBody,
        mimeType: 'text/html',  // This sends the email in HTML format
        attachLog: true,
        attachmentsPattern: '**/build.log'
    )
    echo "Email sent successfully."
}

// Function to send the zipped report to Telegram
def sendTelegramReport() {
    echo "Sending zipped report to Telegram..."
    sh """
        curl -X POST \
        -F chat_id=${env.TELEGRAM_CHAT_ID} \
        -F document=@mochawesome_report.zip \
        -F caption="Mochawesome Test Report for Jenkins Build #${env.BUILD_NUMBER}" \
        https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendDocument
    """
    echo "Zipped report sent to Telegram successfully."
}
