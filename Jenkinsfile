pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('Test SSH') {
            steps {
                bat """
                ssh -tt -i C:\\Users\\khuzaimah.arshad\\.ssh\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "touch ali1"
                """
            }
        }
    }
}
