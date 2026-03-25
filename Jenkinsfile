pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
    }

    stages {
        // 1. CLEAN AND CLONE
        stage('Clone Repo') {
            steps {
                bat """
                echo ====== CLONING REPOSITORY ======
                if exist proshop_mern rmdir /s /q proshop_mern
                git clone https://github.com/kjhuzaimah/proshop_mern
                """
            }
        }

        // 2. BACKEND TESTS (Fixed to prevent hanging)
        stage('Backend Tests') {
            steps {
                bat """
                cd proshop_mern\\backend
                npm install
                set CI=true
                npm test -- --watchAll=false
                """
            }
        }

        // 3. FRONTEND TESTS (Fixed to prevent hanging)
        stage('Frontend Tests') {
            steps {
                bat """
                cd proshop_mern\\frontend
                npm install
                set CI=true
                npm test -- --watchAll=false
                """
            }
        }

        // 4. DEPLOY TO VM (Using your Private Key)
        stage('Deploy on VM') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'vm-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    bat """
                    echo 🚀 STARTING DEPLOYMENT...
                    
                    ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "
                        if [ ! -d ${APP_DIR} ]; then
                            echo '📥 Cloning project...';
                            git clone https://github.com/kjhuzaimah/proshop_mern ${APP_DIR};
                        fi
                        
                        cd ${APP_DIR}
                        echo '🔄 Updating code...'
                        git pull origin main
                        
                        echo '📦 Installing Backend...'
                        npm install --production
                        
                        echo '⚛️ Building Frontend...'
                        cd frontend
                        npm install
                        npm run build
                        cd ..
                        
                        echo '♻️ Restarting Application...'
                        pm2 reload server || pm2 start backend/server.js --name server
                        
                        echo '✅ DEPLOYMENT SUCCESSFUL'
                    "
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ PIPELINE SUCCESS"
        }
        failure {
            echo "❌ PIPELINE FAILED - Check the logs above for errors"
        }
    }
}
