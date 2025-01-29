// common.groovy

def commonMethod() {
    echo 'This is a common method called from common.groovy'
}

def callTestMethod() {
    echo 'This method runs Cypress tests or any other custom test logic.'
    sh 'npm run cypress'
}
