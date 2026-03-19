pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
        REPO = "https://github.com/kjhuzaimah/proshop_mern"
    }

    stages {

        stage('Connect Test') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "echo CONNECTED && whoami && pwd"
                    """
                }
            }
        }

        stage('Clean Old Project') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "rm -rf %APP_DIR%"
                    """
                }
            }
        }

        stage('Clone Repository') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "git clone %REPO% %APP_DIR%"
                    """
                }
            }
        }

        stage('Install Backend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR%/backend && npm install"
                    """
                }
            }
        }

        stage('Test Backend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR%/backend && npm test || true"
                    """
                }
            }
        }

        stage('Install Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR%/frontend && npm install"
                    """
                }
            }
        }

        stage('Test Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR%/frontend && npm test -- --watchAll=false || true"
                    """
                }
            }
        }

        stage('Build Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR%/frontend && npm run build"
                    """
                }
            }
        }

        stage('Start Server') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch "cd %APP_DIR% && npm install --production && pm2 delete server || true && pm2 start backend/server.js --name server"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful on VM"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
