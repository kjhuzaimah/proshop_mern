pipeline {
    agent any

    environment {
        CI = 'true'
        VM_IP = "172.19.121.11"
        APP_DIR = "/home/alamgir-tamoori/Projects/proshop_mern"
        // Fingerprint from your successful run
        VM_FINGERPRINT = "ssh-ed25519 255 SHA256:uCVMmb0rIMX902UhRuXp/aPq4u2UidEKilpBqdP6ez0"
    }
 stages {

stage('Validate Commit Message') {
    steps {
        script {
            // 1. Use %%B to escape the percent sign in Windows
            // 2. Use @echo off so the command itself isn't included in the output
            def msg = bat(script: "@echo off\ngit log -1 --pretty=%%B", returnStdout: true).trim()

            echo "Extracted Message: ${msg}"

            if (!(msg.startsWith("build:") ||
                  msg.startsWith("deploy:") ||
                  msg.startsWith("test:"))) {
                error "❌ Invalid commit prefix! Your message was: '${msg}'. Message must start with build:, deploy:, or test:"
            }

            echo "✅ Commit message valid"
        }
    }
}


        //  CLONE CODE
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kjhuzaimah/proshop_mern'
            }
        }


        //  BACKEND INSTALL
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        // BACKEND TEST
        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }
        stage('Frontend install and test ') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm test -- --watchAll=false --passWithNoTests  '
                }
            }
        }


stage('Deploy on VM') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'Test3', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            bat """
            @echo off
            echo ===============================
            echo DEPLOYMENT STARTED
            echo ===============================

            :: All commands inside the double quotes " " are sent to the VM as one single string.
            :: We use && to join them so it stops if one step fails.

 plink -batch -hostkey "%VM_FINGERPRINT%" -pw %PASS% %USER%@%VM_IP% "cd ${APP_DIR} && echo '--- Git Pull ---' && (git pull origin main || git pull origin master) && echo '--- Backend Install ---' && npm install --production && echo '--- Frontend Build ---' && cd frontend && npm install && npm run build && cd .. && echo '--- PM2 Restart ---' && (pm2 reload server || pm2 start backend/server.js --name server) && echo '--- PM2 PROCESS STATUS ---'  && pm2 restart server  "
            echo ===============================
            echo LOCAL PIPELINE DONE
            echo ===============================
                """
            }
        }
    }
}    
post {
        success { echo "PIPELINE SUCCESSFUL" }
        failure { echo "PIPELINE FAILED" }

  }
}
