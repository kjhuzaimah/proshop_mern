pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        KEY_PATH = "C:\\Temp\\id_rsa"
    }

    stages {
        stage('Fix SSH and Connect') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'vm-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {

                    bat """
                    echo ===============================
                    echo STEP 1: Create Temp Directory
                    mkdir C:\\Temp 2>nul

                    echo ===============================
                    echo STEP 2: Copy Key
                    copy "%SSH_KEY%" "%KEY_PATH%"

                    echo ===============================
                    echo STEP 3: Fix Permissions
                    icacls "%KEY_PATH%" /inheritance:r
                    icacls "%KEY_PATH%" /grant:r "SYSTEM:F"

                    echo ===============================
                    echo STEP 4: Verify Permissions
                    icacls "%KEY_PATH%"

                    echo ===============================
                    echo STEP 5: SSH TEST
                    ssh -v -i "%KEY_PATH%" -o StrictHostKeyChecking=no -o IdentitiesOnly=yes %VM_USER%@%VM_IP% "echo SSH SUCCESS"
                    """
                }
            }
        }
    }
}
