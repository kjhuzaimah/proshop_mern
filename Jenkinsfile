pipeline {
    agent any

    environment {
        VM_IP   = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
        REPO    = "https://github.com/kjhuzaimah/proshop_mern"
        HOST_KEY = "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "echo CONNECTED && whoami && pwd"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "rm -rf %APP_DIR%"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "git clone %REPO% %APP_DIR%"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR%/backend && npm install"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR%/backend && npm test || true"
                    """
                }
            }
        }

        stage('Start Backend Server') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR% && pm2 delete server || true && pm2 start backend/server.js --name server"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR%/frontend && npm install"
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR%/frontend && npm test -- --watchAll=false || true  "
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
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR%/frontend && npm run build"
                    """
                }
            }
        }

        stage('Production Install & Restart') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" "cd %APP_DIR% && npm install --production && pm2 restart server"
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
