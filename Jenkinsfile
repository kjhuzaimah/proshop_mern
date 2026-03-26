pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
        // Fingerprint from your successful run
        VM_FINGERPRINT = "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0"
    }
 stages {

        // 1. CLONE CODE
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kjhuzaimah/proshop_mern'
            }
        }


        // 3. BACKEND INSTALL
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install '
                }
            }
        }

        // 4. BACKEND TEST
        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test  '
                }
            }
        }
stage('Deploy on VM') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'Test3', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            bat """
            @echo off
            echo ===============================
            echo DEPLOYMENT STARTED
            echo ===============================

            :: All commands inside the double quotes " " are sent to the VM as one single string.
            :: We use && to join them so it stops if one step fails.

 plink -batch -hostkey "%VM_FINGERPRINT%" -pw %PASS% %USER%@%VM_IP% "cd ${APP_DIR} && echo '--- Git Pull ---' && (git pull origin main || git pull origin master) && echo '--- Backend Install ---' && npm install --production && echo '--- Frontend Build ---' && cd frontend && npm install && npm run build && cd .. && echo '--- PM2 Restart ---' && (pm2 reload server || pm2 start backend/server.js --name server) && echo '--- PM2 PROCESS STATUS ---'  && pm2 restart server  "
            echo ===============================
            echo LOCAL PIPELINE DONE
            echo ===============================
                """
            }
        }
    }
}    
post {
        success { echo "✅ PIPELINE SUCCESSFUL" }
        failure { echo "❌ PIPELINE FAILED" }

  }
}
