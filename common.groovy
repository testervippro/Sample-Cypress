// jenkins/common.groovy

def sendEmail(String messageContent, String buildNumber, String jobName, String gitBranch, String gitCommit, String buildExecutor, String buildStatus, String jenkinsServerUrl, String emailRecipient) {
    echo "Sending email..."

    def emailSubject = "[Jenkins Build] ${jobName} - ${buildStatus} - (#${buildNumber})"
    def emailBody = """
    <html>
    <body>
        <h2>Hello,</h2>
        <p>The Jenkins build for <strong>${jobName}</strong> (#${buildNumber}) has completed with status: ${buildStatus}.</p>
        <h3>Build Details:</h3>
        <ul>
            <li><strong>Status:</strong> ${buildStatus}</li>
            <li><strong>Git Branch:</strong> ${gitBranch}</li>
            <li><strong>Git Commit:</strong> ${gitCommit}</li>
            <li><strong>Commit Message:</strong> ${messageContent}</li>
            <li><strong>Build Executor:</strong> ${buildExecutor}</li>
        </ul>
        <p>Best regards,</p>
        <p>Jenkins CI</p>
    </body>
    </html>
    """

    emailext(
        to: emailRecipient,
        subject: emailSubject,
        body: emailBody,
        mimeType: 'text/html',
        attachLog: true,
        attachmentsPattern: '**/build.log'
    )

    echo "Email sent successfully."
}

def sendTelegramMessage(String messageContent, String telegramToken, String telegramChatId, String buildNumber) {
    echo "Sending message to Telegram..."

    // Use the Telegram API to send the message
    sh """
        curl -X POST \
        -F chat_id=${telegramChatId} \
        -F text="Jenkins Build #${buildNumber}: ${messageContent}" \
        https://api.telegram.org/bot${telegramToken}/sendMessage
    """
    echo "Message sent to Telegram successfully."
}

return this
