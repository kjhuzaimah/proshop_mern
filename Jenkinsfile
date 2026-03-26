pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
        // Fingerprint from your successful run
        VM_FINGERPRINT = "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0"
    }

    stages {
        stage('Clone & Test') {
            steps {
                bat """
                if exist proshop_mern rmdir /s /q proshop_mern
                git clone https://github.com/kjhuzaimah/proshop_mern
                cd proshop_mern\\backend && npm install && set CI=true && npm test -- --watchAll=false
                cd ..\\frontend && npm install && set CI=true && npm test -- --watchAll=false
                """
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

            plink -batch -hostkey "%VM_FINGERPRINT%" -pw %PASS% %USER%@%VM_IP% "cd /home/alamgir-tamoori/Projects/proshop_mern && echo 'Pulling Code...' && (git pull origin main || git pull origin master) && echo 'Installing Backend...' && npm install --production && cd frontend && echo 'Installing Frontend...' && npm install && echo 'Building Frontend...' && npm run build && cd .. && (pm2 reload server || pm2 start backend || pm2 restart server  /server.js --name server)"

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
