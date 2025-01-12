pipeline {
    agent any

    tools {
        nodejs "Node" // Ensure Node.js is available
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'npm ci' // Clean install dependencies
            }
        }

        stage('Run Specific Cypress Test File') {
            steps {
                sh 'npx cypress run --spec "cypress/e2e/spec02.cy.ts"' // Run a specific test file
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....' // Deployment step
            }
        }
    }

    post {
        always {
            sh 'npm run cypress:report'  // Generate the Cypress HTML report
            
            // Publish the Cypress HTML report using HTML Publisher plugin
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: false, 
                keepAll: true, 
                reportDir: 'cypress/cypress/reports/html', // Directory containing HTML report
                reportFiles: 'index.html',  // The main report file to publish
                reportName: 'HTML Report', // The name of the report in Jenkins UI
                reportTitles: ''  // Optionally, you can add custom titles here
            ])

            echo 'Pipeline completed.' // Log completion message
        }
    }
}
