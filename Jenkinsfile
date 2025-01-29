pipeline {
    agent any

    stages {
        stage('Load and Call Groovy Script') {
            steps {
                script {
                    // Load the Groovy script from the repository
                    def myScript = load 'common.groovy'
                    
                    // Call the function defined in the script with a parameter
                    myScript.call('Jenkins User')
                }
            }
        }
    }
}
