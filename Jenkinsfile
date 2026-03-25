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
                // This block safely hides your password
                withCredentials([usernamePassword(credentialsId: 'Test3', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    bat """
                    echo 🚀 CONNECTING TO VM...
                    
                    :: We use %PASS% for the password and %USER% for the username
                    plink -batch -hostkey "%VM_FINGERPRINT%" -pw %PASS% %USER%@%VM_IP% "cd ${APP_DIR} && git pull origin main && npm install --production && cd frontend && npm install && npm run build && cd .. && (pm2 reload server || pm2 start backend/server.js --name server)"
                    
                    echo ✅ DEPLOYMENT FINISHED
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
