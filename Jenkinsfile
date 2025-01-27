pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        HTML_REPORT_DIR = "${WORKSPACE}/cypress/reports/mochawesome-html-report/"
    }

    stages {
        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        npm ci
                        npm run cy:run-report-junit  
                    '''
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                script {
                    // Publish the HTML report from the archive
                    publishHTML([
                        reportName: 'Mochawesome Report',
                        reportDir: "cypress/reports",  // Adjusted path to the reports directory
                        reportFiles: 'mochawesome-html-report/Cypress_HMTL_Report.html',  // Adjusted to correct file path
                        keepAll: true,
                        allowMissing: false
                    ])
                }
            }
        }

         stage('Publish JUnit Report') {
            steps {
                script {
                    // Publish the JUnit test results
                    junit '**/cypress/reports/junit/*.xml'  // Adjust the path as needed
                }
            }
        }
    }

    post {
        always {
            echo "Archiving mochawesome report for debugging"
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true  // Corrected path pattern to archive reports
            deleteDir()  // Clean workspace after the build

            // Clean workspace using cleanWs
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
        success {
            echo "View report at: ${env.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/HTML_Report/"
            // Added step to echo the link to view the report in Jenkins
            echo "Download report ZIP: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/Mochawesome_20Report/*zip*/Mochawesome_20Report.zip"
            echo "JUnit Test Results: ${env.JENKINS_URL}job/${env.JOB_NAME}/${env.BUILD_NUMBER}/testReport/"
        }
        }
    }
}
