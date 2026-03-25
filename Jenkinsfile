pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        VM_PASS = "Welcome123@" // 👈 Write your password here
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
    }

    stages {
        stage('Clone & Test') {
            steps {
                bat """
                echo ====== PREPARING CODE ======
                if exist proshop_mern rmdir /s /q proshop_mern
                git clone https://github.com/kjhuzaimah/proshop_mern
                
                cd proshop_mern\\backend
                npm install
                set CI=true
                npm test -- --watchAll=false
                
                cd ..\\frontend
                npm install
                set CI=true
                npm test -- --watchAll=false
                """
            }
        }

        stage('Deploy on VM') {
            steps {
                bat """
                echo 🚀 DEPLOYING TO VM WITH PASSWORD...
                
                :: 1. 'echo y' automatically accepts the server's security key so it doesn't hang
                :: 2. '-pw %VM_PASS%' sends your password automatically
                :: 3. '-batch' prevents interactive prompts
                
                echo y | plink.exe -batch -pw %VM_PASS% %VM_USER%@%VM_IP% "
                    if [ ! -d ${APP_DIR} ]; then
                        git clone https://github.com/kjhuzaimah/proshop_mern ${APP_DIR}
                    fi
                    
                    cd ${APP_DIR}
                    git pull origin main
                    
                    echo '📦 Installing Backend...'
                    npm install --production
                    
                    echo '⚛️ Building Frontend...'
                    cd frontend
                    npm install
                    npm run build
                    cd ..
                    
                    echo '♻️ Restarting App...'
                    pm2 reload server || pm2 start backend/server.js --name server
                    
                    echo '✅ DEPLOYMENT SUCCESSFUL'
                "
                """
            }
        }
    }

    post {
        success { echo "✅ SUCCESS" }
        failure { echo "❌ FAILED" }
    }
}
