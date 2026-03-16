pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/kjhuzaimah/proshop_mern'
            }
        }

        stage('Check Commit Prefix') {
            steps {
                script {
                    def commitMessage = sh(
                        script: "git log -1 --pretty=%B",
                        returnStdout: true
                    ).trim()

                    echo "Commit Message: ${commitMessage}"

                    if (!(commitMessage.startsWith("build:") ||
                          commitMessage.startsWith("deploy:") ||
                          commitMessage.startsWith("test:"))) {
                        error "Alert: Commit prefix not allowed."
                    }
                }
            }
        }

        stage('Install Dependencies (Backend & Frontend)') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Code Deployment') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('PM2 Start Server') {
            steps {
                dir('backend') {
                    sh '''
                        pm2 restart server || pm2 start server.js --name server
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful"
        }
        failure {
            echo "Alert: Pipeline failed"
        }
    }
}
