pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('Basic SSH Debug') {
            steps {
                echo "🔹 Starting SSH debug..."

                withCredentials([sshUserPrivateKey(
                    credentialsId: 'vm-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {

                    bat """
                    echo ===============================
                    echo STEP 1: Who am I
                    whoami

                    echo ===============================
                    echo STEP 2: Check key file exists
                    dir "%SSH_KEY%"

                    echo ===============================
                    echo STEP 3: Try SSH (VERBOSE)
                    ssh -v -i "%SSH_KEY%" -o StrictHostKeyChecking=no %VM_USER%@%VM_IP%
                    """
                }
            }
        }
    }
}
