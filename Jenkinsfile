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
        // Using your specific Credential ID 'Test3'
        withCredentials([usernamePassword(credentialsId: 'Test3', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            bat """
            @echo off
            echo ===============================
            echo 🚀 REMOTE DEPLOYMENT STARTED
            echo ===============================

            :: Everything inside the double quotes " " runs on the VM
            :: Everything outside (like plink) runs on Jenkins
            
            plink -batch -hostkey "%VM_FINGERPRINT%" -pw %PASS% %USER%@%VM_IP% ^
            "cd /home/alamgir-tamoori/Projects/proshop_mern && ^
            echo '📥 Updating code from Git...' && ^
            (git pull origin main || git pull origin master) && ^
            
            echo '📦 Installing Backend dependencies...' && ^
            npm install --production && ^
            
            echo '⚛️ Installing Frontend dependencies...' && ^
            cd frontend && ^
            npm install && ^
            
            echo '🏗️ Building Frontend...' && ^
            npm run build && ^
            
            echo '♻️ Restarting Application...' && ^
            cd .. && ^
            (pm2 reload server || pm2 start backend/server.js --name server) && ^
            
            echo '✅ DEPLOYMENT COMPLETED SUCCESSFULLY'"
            
            echo ===============================
            echo 🎉 LOCAL PIPELINE DONE
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
