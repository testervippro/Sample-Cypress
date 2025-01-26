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
                        reportDir: 'cypress/reports/mochawesome-html-report',  // Path to the report folder
                        reportFiles: 'index.html',  // The main file to be displayed
                        keepAll: true,  // Optional: keep all reports from previous runs
                        allowMissing: false  // Optional: whether missing reports should fail the build
                    ])
                }
            }
        }
    }

}
