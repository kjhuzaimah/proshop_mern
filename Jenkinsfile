pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "~/Projects/proshop_mern"
    }

    stages {

        stage('Deploy + Test on VM') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'vm-password',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    bat """
                    echo ===============================
                    echo Starting Deployment on VM
                    echo ===============================

                    plink -ssh %USER%@%VM_IP% -pw %PASS% -batch -hostkey "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0" ^
                    "echo '--- CONNECTED TO VM ---' && \
                    rm -rf %APP_DIR% && \
                    git clone https://github.com/kjhuzaimah/proshop_mern %APP_DIR% && \
                    cd %APP_DIR% && \
                    
                    echo '--- INSTALL BACKEND ---' && \
                    cd backend && \
                    npm install && \
                    
                    echo '--- RUN BACKEND TESTS ---' && \
                    npm test || true && \
                    
                    cd .. && \
                    
                    echo '--- INSTALL FRONTEND ---' && \
                    cd frontend && \
                    npm install && \
                    
                    echo '--- RUN FRONTEND TESTS ---' && \
                    npm test -- --watchAll=false || true && \
                    
                    echo '--- BUILD FRONTEND ---' && \
                    npm run build && \
                    
                    cd .. && \
                    
                    echo '--- START SERVER ---' && \
                    npm install --production && \
                    pm2 delete server || true && \
                    pm2 start backend/server.js --name server && \
                    
                    echo DONE"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful on VM"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
