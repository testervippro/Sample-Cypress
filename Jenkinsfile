pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        JENKINS_URL = 'http://localhost:8080'
        // Path to the mochawesome HTML report
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome"
        REPORT_FILE = "${HTML_REPORT_DIR}/mochawesome.html"
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm install
                        npm run cy:run-report  # Ensure this generates mochawesome.html in the specified directory
                    '''
                    // Archive the mochawesome.html file directly
                    archiveArtifacts artifacts: 'cypress/reports/mochawesome/mochawesome.html', allowEmptyArchive: false
                }
            }
        }

        stage('Check Report Existence') {
            steps {
                script {
                    // Check if the mochawesome.html file exists in the mochawesome directory
                    def reportExists = fileExists("${env.REPORT_FILE}")
                    if (!reportExists) {
                        error "HTML report not found in ${env.HTML_REPORT_DIR}"
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML([
                    reportName: 'Mochawesome Report',
                    reportDir: "${env.HTML_REPORT_DIR}",
                    reportFiles: 'mochawesome.html',
                    keepAll: true,
                    allowMissing: false
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
