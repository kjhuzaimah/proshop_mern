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

        // 2️⃣ Stage: Deploy to VM
        stage('Deploy on VM') {
            environment {
                // Moving the password here makes it valid
                MY_PASS = "Welcome123@" 
            }
            steps {
                bat """
                echo 🚀 CONNECTING WITH PASSWORD...

                :: 1. 'echo y' handles the "Do you trust this host" prompt
                :: 2. '-pw %MY_PASS%' sends your password
                :: 3. '-batch' ensures it doesn't wait for user input
                
                echo y | plink -batch -pw %MY_PASS% ${VM_USER}@${VM_IP} "
                    cd ${APP_DIR} || (echo 'Directory not found' && exit 1)
                    
                    echo '🔄 Pulling latest code...'
                    git pull origin main
                    
                    echo '📦 Installing Backend...'
                    npm install --production
                    
                    echo '⚛️ Building Frontend...'
                    cd frontend && npm install && npm run build && cd ..
                    
                    echo '♻️ Restarting Application...'
                    pm2 reload server || pm2 start backend/server.js --name server
                    
                    echo '✅ DEPLOYMENT SUCCESSFUL'
                "
                """
            }
        }
    }

    post {
        success {
            echo "✅ PIPELINE FINISHED SUCCESSFULLY"
        }
        failure {
            echo "❌ PIPELINE FAILED"
        }
    }
}
