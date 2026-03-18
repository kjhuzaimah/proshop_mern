pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
        APP_DIR = "/home/alamgir-tamoori/ali_dir"
    }

    stages {
        stage('Test SSH') {
            steps {
                bat """
                ssh -i C:\\JenkinsKeys\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "mkdir -p %APP_DIR%"
                """
            }
        }
    }
}
