pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    // Install npm libraries and run the tests
                    sh '''
                        npm install
                        npm run cy:run-report
                    '''
                }
            }
        }

    

        stage('Publish HTML Report') {
            steps {
                script {
                    // Publish HTML reports to Jenkins
                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: 'cypress/reports/mochawesome-report',  // Path to the report folder
                        reportFiles: 'Cypress_HMTL_Report.html',  // The main file to be displayed
                        keepAll: true,  // Optional: keep all reports from previous runs
                        allowMissing: false  // Optional: whether missing reports should fail the build
                    ])
                }
            }
        }
    }

    post {
        always {
            // Archive the HTML report as a build artifact (optional)
            archiveArtifacts artifacts: 'cypress/reports/mochawesome-report/index.html', allowEmptyArchive: true
        }
    }
}
