pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
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
                // This block gets the Key File AND the Passphrase/Password
                withCredentials([sshUserPrivateKey(credentialsId: 'vm-ssh-key', 
                                 keyFileVariable: 'SSH_KEY', 
                                 passphraseVariable: 'SSH_PASS')]) {
                    bat """
                    echo 🚀 DEPLOYING WITH KEY AND PASSPHRASE...
                    
                    :: Note: Standard Windows OpenSSH does not easily accept passphrases via CLI. 
                    :: If your key has a passphrase, Jenkins decrypts it automatically 
                    :: when using sshUserPrivateKey in most configurations.
                    
                    ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "
                        cd ${APP_DIR} || git clone https://github.com/kjhuzaimah/proshop_mern ${APP_DIR}
                        cd ${APP_DIR}
                        git pull origin main
                        
                        echo '📦 Installing & Building...'
                        npm install --production
                        cd frontend && npm install && npm run build && cd ..
                        
                        echo '♻️ Restarting App...'
                        pm2 reload server || pm2 start backend/server.js --name server
                        
                        echo '✅ DONE'
                    "
                    """
                }
            }
        }
    }
}
