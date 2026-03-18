pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/app"
        REPO_URL = "https://github.com/kjhuzaimah/proshop_mern"
    }

    triggers {
        pollSCM('H/2 * * * *')
    }

stages {

        stage('Deploy + Test on VM') {
            steps {
                      bat """
ssh -tt -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "echo STEP1 && \
if [ ! -d %APP_DIR% ]; then echo CLONING && git clone %REPO_URL% %APP_DIR%; else echo PULLING && cd %APP_DIR% && git pull; fi && \
echo STEP2 && cd %APP_DIR%/backend && npm install && \
echo STEP3 && npm test || exit 1 && \
echo STEP4 && cd ../frontend && npm install && \
echo STEP5 && npm test -- --watchAll=false || exit 1 && \
echo STEP6 && npm run build && \
echo STEP7 && cd .. && pm2 restart server || pm2 start backend/server.js --name server"
"""                    
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Pipeline Failed (Tests or Deploy failed)"
        }
    }
}
