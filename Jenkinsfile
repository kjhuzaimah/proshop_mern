pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('SSH Test') {
            steps {
                sshagent(['vm-ssh-key']) {
                    bat """
                    ssh -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "mkdir -p ~/ali_dir"
                    """
                }
            }
        }
    }
}
