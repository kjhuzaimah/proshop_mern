pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
    }

    stages {
        // 1️⃣ Stage: Clone and Run Tests
        stage('Clone & Test') {
            steps {
                bat """
                if exist proshop_mern rmdir /s /q proshop_mern
                git clone https://github.com/kjhuzaimah/proshop_mern
                
                echo ====== BACKEND TEST ======
                cd proshop_mern\\backend && npm install && set CI=true && npm test -- --watchAll=false
                
                echo ====== FRONTEND TEST ======
                cd ..\\frontend && npm install && set CI=true && npm test -- --watchAll=false
                """
            }
        }

stage('Deploy on VM') {
    environment {
        MY_PASS = "Welcome123@" 
    }
    steps {
        bat """
        echo 🚀 CONNECTING TO VM...

        :: 1. -hostkey: Uses the fingerprint from your log so it never asks 'Do you trust this?'
        :: 2. -batch: Non-interactive mode
        :: 3. -pw: Your password
        
        plink -batch -hostkey "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0" -pw %MY_PASS% %VM_USER%@%VM_IP% "cd ${APP_DIR} && git pull origin main && npm install --production && cd frontend && npm install && npm run build && cd .. && pm2 reload server || pm2 start backend/server.js --name server"

        echo ✅ DEPLOYMENT FINISHED
        """




                }
           }
       } 
   }   
