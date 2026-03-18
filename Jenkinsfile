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
                ssh -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "

                # Clone or update repo
                if [ ! -d %APP_DIR% ]; then
                    git clone %REPO_URL% %APP_DIR%;
                else
                    cd %APP_DIR% && git pull;
                fi &&

                cd %APP_DIR% &&

                # Install backend deps
                cd backend &&
                npm install &&

                # Run backend tests
                npm test || exit 1 &&

                # Install frontend deps
                cd ../frontend &&
                npm install &&

                # Run frontend tests
                npm test -- --watchAll=false || exit 1 &&

                # Build frontend
                npm run build &&

                # Start app
                cd .. &&
                pm2 restart server || pm2 start backend/server.js --name server
                "
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
