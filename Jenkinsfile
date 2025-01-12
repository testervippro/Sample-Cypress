pipeline {
  agent any

  tools { nodejs "Node" } // Ensure Node.js is available

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
      echo 'Pipeline completed.' // Log completion message
    }
  }
}