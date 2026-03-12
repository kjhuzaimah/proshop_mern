pipeline {
    agent any

    stages {

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
                        error "Pipeline skipped: Commit message prefix not allowed."
                    }
                }
            }
        }

        stage('Clone Repository') {
            steps {
                git 'https://github.com/kjhuzaimah/proshop_mern'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
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

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
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

        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                dir('backend') {
                    sh '''
                        npm install
                        pm2 restart server || pm2 start server.js
                    '''
                }
            }
        }
    }
}
