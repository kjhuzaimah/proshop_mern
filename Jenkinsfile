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

stage('Deploy with Password') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'vm-password-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            bat """
            echo 🚀 CONNECTING WITH PASSWORD...
            :: Plink allows passing a password variable directly
            plink -batch -pw %PASS% %USER%@%VM_IP% "cd ${APP_DIR} && git pull origin main && pm2 reload server"
            """
                 }
            }
        }
   }
}
