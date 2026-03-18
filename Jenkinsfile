pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('Create File on VM') {
            steps {
                bat """
                ssh -tt -i C:\\Users\\Jenkins\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "touch ali1"
                """
            }
        }
    }

    post {
        success {
            echo "✅ File created successfully on VM"
        }
        failure {
            echo "❌ Failed to create file"
        }
    }
}
