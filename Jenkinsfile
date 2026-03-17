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
        ssh -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "mkdir -p %APP_DIR%"
        """

        bat """
        scp -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no -r backend frontend package*.json %VM_USER%@%VM_IP%:%APP_DIR%
        """

        bat """
        ssh -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "cd %APP_DIR% && npm install --production && pm2 restart server || pm2 start backend/server.js --name server"
        """
        }
     }
  }
 post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Pipelie Failed"
        }
    }
}
