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

        // ✅ 1. CHECK PREFIX
        stage('Check Commit Prefix') {
            steps {
                script {
                    def commitMessage = bat(
                        script: 'git log -1 --pretty=%%B',
                        returnStdout: true
                    ).trim()

                    commitMessage = commitMessage.split("\\r?\\n")[-1]

                    echo "Commit Message: ${commitMessage}"

                    if (!(commitMessage.startsWith("build:") || 
                          commitMessage.startsWith("deploy:") ||
                          commitMessage.startsWith("test:"))) {

                        error "❌ Invalid commit prefix"
                    }
                }
            }
        }

        // ✅ 2. BACKUP OLD PROJECT
        stage('Backup Old Project') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "if [ -d %APP_DIR% ]; then mv %APP_DIR% %APP_DIR%_backup; fi"
                    """
                }
            }
        }

        // ✅ 3. CLONE NEW PROJECT
        stage('Clone Repository') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "git clone %REPO% %APP_DIR%"
                    """
                }
            }
        }

        // ✅ 4. INSTALL BACKEND
        stage('Install Backend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR%/backend && npm install"
                    """
                }
            }
        }

        // ✅ 5. TEST BACKEND
        stage('Test Backend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR%/backend && npm test || true"
                    """
                }
            }
        }

        // ✅ 6. START SERVER
        stage('Start Backend Server') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR% && pm2 delete server || true && pm2 start backend/server.js --name server"
                    """
                }
            }
        }

        // ✅ 7. INSTALL FRONTEND
        stage('Install Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR%/frontend && npm install"
                    """
                }
            }
        }

        // ✅ 8. TEST FRONTEND
        stage('Test Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR%/frontend && npm test -- --watchAll=false || true"
                    """
                }
            }
        }

        // ✅ 9. BUILD FRONTEND
        stage('Build Frontend') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR%/frontend && npm run build"
                    """
                }
            }
        }

        // ✅ 10. FINAL RESTART
        stage('Production Restart') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    bat """
                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                    "cd %APP_DIR% && npm install --production && pm2 restart server"
                    """
                }
            }
        }
    }

    // 🔁 ROLLBACK ON FAILURE
    post {
        failure {
            echo "❌ Pipeline Failed - Rolling Back..."

            withCredentials([usernamePassword(
                credentialsId: 'vm-password',
                usernameVariable: 'USER',
                passwordVariable: 'PASS'
            )]) {
                bat """
                plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "%HOST_KEY%" ^
                "rm -rf %APP_DIR% && mv %APP_DIR%_backup %APP_DIR% && pm2 restart server"
                """
            }
        }

        success {
            echo "✅ Deployment Successful"
        }
    }
}
