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
        // Replace YOUR_PASSWORD_HERE with your actual password
        environment {
            MY_PASS = "Welcome123@" 
        }
        bat """
        echo 🚀 CONNECTING WITH PASSWORD...
        
        :: The "echo y |" part automatically accepts the host key
        echo y | plink -batch -pw %MY_PASS% alamgir-tamoori@172.19.121.11 "
            cd /home/alamgir-tamoori/Projects/proshop_mern
            git pull origin main
            npm install --production
            cd frontend && npm install && npm run build && cd ..
            pm2 reload server || pm2 start backend/server.js --name server
        "
        """
    }
}

        }
   }
}
