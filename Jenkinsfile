pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report"  // Corrected path
    
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm ci
                        npm run cy:run-report  # Generates mochawesome-report/output.html and ZIP report
                    '''
                }
            }
        }

    

        stage('Publish HTML Report') {
            steps {
                script {
                   
                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "${env.HTML_REPORT_DIR}",
                        reportFiles: 'Cypress_HMTL_Report.html',
                        keepAll: true,
                        allowMissing: false
                    ])
                }
            }
        }

    
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
           archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true  // Corrected path pattern
            deleteDir()  // Clean workspace
        }
        success {
           echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
            // Added step to echo the download link for the zipped report
            echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"

        }
    }
}
