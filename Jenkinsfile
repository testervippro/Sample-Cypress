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

        stage('Check JSON Files') {
            steps {
                script {
                    // Check if the JSON report files are generated and are not empty
                    def jsonFiles = sh(script: "ls cypress/reports/mochawesome-report/*.json", returnStdout: true).trim().split("\n")
                    if (jsonFiles.size() == 0) {
                        error "No JSON report files found in cypress/reports/mochawesome-report"
                    }

                    // Check if any of the files are empty
                    jsonFiles.each { file ->
                        def fileSize = sh(script: "stat --format=%s ${file}", returnStdout: true).trim().toInteger()
                        if (fileSize == 0) {
                            error "JSON file ${file} is empty"
                        }
                    }
                }
            }
        }

        stage('Merge Reports') {
            steps {
                script {
                    // Try to merge the Mochawesome reports
                    try {
                        sh '''
                            npx mochawesome-merge cypress/reports/mochawesome-report/*.json > cypress/reports/mochawesome-report/output.json
                        '''
                    } catch (Exception e) {
                        error "Failed to merge reports: ${e.message}"
                    }

                    // Check if the output.json file is valid
                    def outputJson = readFile('cypress/reports/mochawesome-report/output.json')
                    if (!outputJson?.trim()) {
                        error "Merged output.json is empty or invalid"
                    }
                }
            }
        }

        stage('Generate HTML Report') {
            steps {
                script {
                    // Generate the HTML report using the merged JSON
                    try {
                        sh '''
                            npx mochawesome-report-generator cypress/reports/mochawesome-report/output.json --output cypress/reports/mochawesome-report
                        '''
                    } catch (Exception e) {
                        error "Failed to generate HTML report: ${e.message}"
                    }
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
                        reportFiles: 'index.html',  // The main file to be displayed
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
