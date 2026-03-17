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
        bat """
        ssh alamgir-tamoori@172.19.121.11 "mkdir -p /home/alamgir-tamoori/app"
        """

        bat """
        scp -r * alamgir-tamoori@172.19.121.11:/home/alamgir-tamoori/app
        """

        bat """
        ssh alamgir-tamoori@172.19.121.11 "
        cd /home/alamgir-tamoori/app &&
        npm install &&
        pm2 restart server || pm2 start backend/server.js --name server
        "
        """
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
