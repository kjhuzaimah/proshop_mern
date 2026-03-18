pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('SSH Fix + Test') {
            steps {
                echo "🔹 Starting SSH stage..."

                withCredentials([sshUserPrivateKey(
                    credentialsId: 'vm-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {

                    bat """
                    echo ===============================
                    echo STEP 1: Checking Jenkins User
                    whoami

                    echo ===============================
                    echo STEP 2: Creating Temp Folder
                    if not exist C:\\Temp mkdir C:\\Temp

                    echo ===============================
                    echo STEP 3: Copying SSH Key
                    copy "%SSH_KEY%" C:\\Temp\\id_rsa

                    echo ===============================
                    echo STEP 4: Fixing Permissions
                    icacls C:\\Temp\\id_rsa /inheritance:r
                    icacls C:\\Temp\\id_rsa /grant:r "NT AUTHORITY\\SYSTEM:F"

                    echo ===============================
                    echo STEP 5: Verifying Permissions
                    icacls C:\\Temp\\id_rsa

                    echo ===============================
                    echo STEP 6: Testing SSH Connection
                    ssh -v -i C:\\Temp\\id_rsa -o StrictHostKeyChecking=no -o IdentitiesOnly=yes %VM_USER%@%VM_IP% "echo SSH SUCCESS"

                    echo ===============================
                    echo STEP 7: Creating Directory
                    ssh -i C:\\Temp\\id_rsa -o StrictHostKeyChecking=no -o IdentitiesOnly=yes %VM_USER%@%VM_IP% "mkdir -p ~/ali_dir"

                    echo ===============================
                    echo STEP 8: Creating File
                    ssh -i C:\\Temp\\id_rsa -o StrictHostKeyChecking=no -o IdentitiesOnly=yes %VM_USER%@%VM_IP% "touch ~/ali_dir/ali1.txt"

                    echo ===============================
                    echo STEP 9: Verifying on VM
                    ssh -i C:\\Temp\\id_rsa -o StrictHostKeyChecking=no -o IdentitiesOnly=yes %VM_USER%@%VM_IP% "ls -la ~/ali_dir"

                    echo ===============================
                    echo ✅ SSH Stage Completed Successfully
                    """
                }
            }
        }
    }
}
