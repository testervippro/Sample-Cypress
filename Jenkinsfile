pipeline {
    agent any

    tools {
        nodejs "Node" // Ensure Node.js is available
    }

    environment {
        // Define cache directory
        CACHE_DIR = "${WORKSPACE}/.cache"
        CYPRESS_CACHE_FOLDER = "${CACHE_DIR}/cypress" // Cypress binary cache
        NPM_CACHE_FOLDER = "${CACHE_DIR}/npm" // npm cache
    }

    stages {
        stage('Restore Cache') {
            steps {
                script {
                    // Restore npm cache
                    if (fileExists("${NPM_CACHE_FOLDER}/node_modules.tar.gz")) {
                        echo "Restoring npm cache..."
                        untar tarFile: "${NPM_CACHE_FOLDER}/node_modules.tar.gz", dir: "${WORKSPACE}"
                    } else {
                        echo "No npm cache found. Proceeding without cache."
                    }

                    // Restore Cypress cache
                    if (fileExists("${CYPRESS_CACHE_FOLDER}/cypress.zip")) {
                        echo "Restoring Cypress cache..."
                        unzip zipFile: "${CYPRESS_CACHE_FOLDER}/cypress.zip", dir: "${WORKSPACE}/node_modules/.cache"
                    } else {
                        echo "No Cypress cache found. Proceeding without cache."
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --prefer-offline' // Install dependencies using cached modules
            }
        }

        stage('Run Cypress Tests and Generate Report') {
            steps {
                sh 'npm run cy:report' // Run the cy:report script
            }
        }

        stage('Save Cache') {
            steps {
                script {
                    // Save npm cache
                    echo "Saving npm cache..."
                    sh "mkdir -p ${NPM_CACHE_FOLDER}"
                    sh "tar -czf ${NPM_CACHE_FOLDER}/node_modules.tar.gz node_modules"

                    // Save Cypress cache
                    echo "Saving Cypress cache..."
                    sh "mkdir -p ${CYPRESS_CACHE_FOLDER}"
                    sh "zip -r ${CYPRESS_CACHE_FOLDER}/cypress.zip node_modules/.cache/Cypress"
                }
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
            // Publish the Mochawesome HTML report using HTML Publisher plugin
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'cypress/reports/mochawesome',
                reportFiles: 'report.html',
                reportName: 'Mochawesome Report',
                reportTitles: 'Cypress Test Results'
            ])

            echo 'Pipeline completed.' // Log completion message
        }
    }
}
