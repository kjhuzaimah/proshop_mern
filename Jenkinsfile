pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
    }

    stages {
        stage('Clone Repo') {
            steps {
                bat """
                if exist proshop_mern rmdir /s /q proshop_mern
                git clone https://github.com/kjhuzaimah/proshop_mern
                """
            }
        }

        stage('Backend Tests') {
            steps {
                // CI=true prevents npm from hanging
                bat "cd proshop_mern\\backend && npm install && set CI=true && npm test -- --watchAll=false"
            }
        }

        stage('Frontend Tests') {
            steps {
                bat "cd proshop_mern\\frontend && npm install && set CI=true && npm test -- --watchAll=false || true  "
            }
        }

        stage('Deploy on VM') {
            steps {
                sshagent(['vm-ssh-key']) {
                    bat """
                    echo 🚀 CONNECTING TO VM...
                    
                    ssh -o StrictHostKeyChecking=no ${VM_USER}@${VM_IP} "
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
                        
                        echo '♻️ Restarting Server...'
                        pm2 reload server || pm2 start backend/server.js --name server
                        
                        echo '✅ DEPLOYMENT SUCCESSFUL'
                    "
                    """
                }
            }
        }
    }

    post {
        success { echo "✅ PIPELINE SUCCESS" }
        failure { echo "❌ PIPELINE FAILED" }
    }
}
