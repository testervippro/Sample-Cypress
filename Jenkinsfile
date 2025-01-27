pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/mochawesome-report"  // Direct path to report
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm install
                        npm run cy:run-report  # Generates mochawesome-report/output.html
                    '''
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Verify report exists before publishing
                    if (!fileExists("${env.HTML_REPORT_DIR}/output.html")) {
                        error "HTML report not found at ${env.HTML_REPORT_DIR}/output.html"
                    }

                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "${env.HTML_REPORT_DIR}",
                        reportFiles: 'output.html',
                        keepAll: true,
                        allowMissing: false
                    ])
                }
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
