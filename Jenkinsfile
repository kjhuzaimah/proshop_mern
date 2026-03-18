pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('SSH Test') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'vm-ssh-key',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    bat """
                    ssh -i %SSH_KEY% -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "mkdir -p ~/ali_dir"
                    """
                }
            }
        }
    }
}
