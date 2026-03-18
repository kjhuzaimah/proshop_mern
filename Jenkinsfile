pipeline {
    agent any

    environment {
        VM_IP = "172.19.121.11"
        VM_USER = "alamgir-tamoori"
    }

    stages {
        stage('SSH Test + Create Dir') {
            steps {
                bat """
                echo 🔹 Starting SSH debug...

                ssh -i C:\\JenkinsKeys\\id_rsa -o StrictHostKeyChecking=no %VM_USER%@%VM_IP% "mkdir -p ~/Projects/proshop_mern/ali7 && echo DONE"
                """
            }
        }
    }
}
