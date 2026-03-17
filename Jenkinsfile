pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/app"
    }

    triggers {
        pollSCM('H/2 * * * *')   // check GitHub every 2 minutes
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/kjhuzaimah/proshop_mern'
            }
        }

        stage('Check Commit Prefix') {
            steps {
                script {
                    def commitMessage = bat(
                        script: "git log -1 --pretty=%%B",
                        returnStdout: true
                    ).trim()

                    echo "Commit Message: ${commitMessage}"

                    if (!(commitMessage.startsWith("build:") ||
                          commitMessage.startsWith("deploy:") ||
                          commitMessage.startsWith("test:"))) {
                        error "❌ Invalid commit prefix (allowed: build:, deploy:, test:)"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test || exit 0'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    bat 'npm test -- --watchAll=false || exit 0'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                sshagent(['vm-ssh']) {
                    bat """
                    ssh -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% ^
                    "if [ ! -d ${APP_DIR} ]; then
                        git clone https://github.com/kjhuzaimah/proshop_mern ${APP_DIR};
                     fi &&

                     cd ${APP_DIR} &&
                     git pull &&

                     cd backend &&
                     npm install &&

                     pm2 restart server || pm2 start server.js --name server"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
